-- TQA 看课打分台 · V1.9：维度打分原因、逐条记录的问题、问题同步
-- 在 schema.sql 之后、review_tasks.sql 之前运行（review_tasks.sql 里的函数会引用 issues 表），可重复运行。

-- ============ 字段 ============
alter table public.scores  add column if not exists reasons text[];          -- 8 个维度的打分原因，顺序同维度
alter table public.scores  add column if not exists rubric  text;            -- 评分标准版本，如 V1.9
alter table public.members add column if not exists can_sync boolean not null default false;  -- 问题同步人

-- ============ 问题（每节课可记多条） ============
create table if not exists public.issues (
  id          uuid primary key default gen_random_uuid(),
  score_id    uuid not null references public.scores(id) on delete cascade,
  user_id     uuid references auth.users(id) on delete set null default auth.uid(),
  pos         smallint not null default 0,
  time        text,
  description text not null check (char_length(description) between 1 and 500),
  root        text not null check (root in ('课程','级别','识别','教学','产品','待查')),
  priority    text not null default 'P2' check (priority in ('P0','P1','P2','P3')),
  status      text not null default 'new' check (status in ('new','synced','ignored')),
  synced_at   timestamptz,
  synced_by   uuid,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists issues_score_idx  on public.issues(score_id);
create index if not exists issues_status_idx on public.issues(status);
create index if not exists issues_user_idx   on public.issues(user_id);

-- 已同步到问题反馈池的问题组（同一 Lesson + 同一根因）
create table if not exists public.issue_groups (
  key             text primary key,
  lesson          text,
  root            text,
  description     text,
  first_synced_at timestamptz not null default now(),
  last_synced_at  timestamptz not null default now(),
  sync_count      int not null default 1,
  reappear_count  int not null default 0
);

create or replace function public.is_syncer() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from members where user_id = auth.uid() and active and (is_admin or can_sync))
$$;

-- 打分人改不了同步状态：只有同步函数（会设置 tqa.sync = on）能改
create or replace function public.issues_guard() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  if coalesce(current_setting('tqa.sync', true), '') <> 'on' then
    new.status := old.status; new.synced_at := old.synced_at; new.synced_by := old.synced_by;
  end if;
  return new;
end $$;
drop trigger if exists issues_guard on public.issues;
create trigger issues_guard before update on public.issues for each row execute function public.issues_guard();

-- ============ 行级权限 ============
alter table public.issues       enable row level security;
alter table public.issue_groups enable row level security;
revoke all on public.issues, public.issue_groups from anon;

drop policy if exists i_select on public.issues;
drop policy if exists i_insert on public.issues;
drop policy if exists i_update on public.issues;
drop policy if exists i_delete on public.issues;
create policy i_select on public.issues for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
create policy i_insert on public.issues for insert to authenticated
  with check (user_id = (select auth.uid()) and public.is_member() and status = 'new'
              and exists(select 1 from public.scores s where s.id = score_id and s.user_id = (select auth.uid())));
create policy i_update on public.issues for update to authenticated
  using (user_id = (select auth.uid()) and public.is_member()) with check (user_id = (select auth.uid()));
create policy i_delete on public.issues for delete to authenticated using (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists g_select on public.issue_groups;
create policy g_select on public.issue_groups for select to authenticated using (public.is_syncer());

-- ============ 问题同步 ============
-- 待同步的问题（不含任何分数）
create or replace function public.sync_pending() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.is_syncer() then raise exception '只有问题同步人或管理员可以查看'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', i.id, 'time', i.time, 'description', i.description, 'root', i.root, 'priority', i.priority,
      'lesson', s.lesson, 'class_id', s.class_id, 'date', s.date, 'type', s.type, 'level', s.level, 'url', s.url,
      'who', coalesce(nullif(m.name,''), case when m.is_owner then '管理员' else split_part(m.email,'@',1) end, '已移除的成员'),
      'created_at', i.created_at,
      'key', coalesce(s.lesson,'') || '|' || i.root,
      'g_description', g.description, 'g_reappear', g.reappear_count, 'g_last', g.last_synced_at
    ) order by s.lesson, i.root, i.created_at), '[]'::jsonb) into r
  from issues i join scores s on s.id = i.score_id
  left join members m on m.user_id = i.user_id
  left join issue_groups g on g.key = coalesce(s.lesson,'') || '|' || i.root
  where i.status = 'new';
  return r;
end $$;

-- 标记已同步 / 忽略
-- p_groups: [{"key":"732|识别","lesson":"732","root":"识别","description":"…","ids":["uuid",…]}]
create or replace function public.sync_apply(p_groups jsonb, p_ignore uuid[] default '{}') returns jsonb
language plpgsql security definer set search_path = public as $$
declare g jsonb; n_sync int := 0; n_ign int := 0; k int;
begin
  if not public.is_syncer() then raise exception '只有问题同步人或管理员可以同步'; end if;
  perform set_config('tqa.sync', 'on', true);
  for g in select * from jsonb_array_elements(coalesce(p_groups, '[]'::jsonb)) loop
    update issues set status = 'synced', synced_at = now(), synced_by = auth.uid()
      where status = 'new' and id in (select (x #>> '{}')::uuid from jsonb_array_elements(g->'ids') x);
    get diagnostics k = row_count; n_sync := n_sync + k;
    if k > 0 then
      insert into issue_groups(key, lesson, root, description)
        values (g->>'key', g->>'lesson', g->>'root', g->>'description')
      on conflict (key) do update set last_synced_at = now(), sync_count = issue_groups.sync_count + 1,
        reappear_count = issue_groups.reappear_count + 1;
    end if;
  end loop;
  update issues set status = 'ignored', synced_at = now(), synced_by = auth.uid()
    where status = 'new' and id = any(coalesce(p_ignore, '{}'));
  get diagnostics n_ign = row_count;
  return jsonb_build_object('synced', n_sync, 'ignored', n_ign);
end $$;

revoke all on function public.is_syncer() from public, anon;
revoke all on function public.sync_pending() from public, anon;
revoke all on function public.sync_apply(jsonb, uuid[]) from public, anon;
grant execute on function public.is_syncer() to authenticated;
grant execute on function public.sync_pending() to authenticated;
grant execute on function public.sync_apply(jsonb, uuid[]) to authenticated;
