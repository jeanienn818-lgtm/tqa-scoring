-- TQA V2.1: additive migration. Shared auth and members; all scores,
-- settings, reviews and issue data are in V2.1-only objects.
-- Run once in the existing Supabase project's SQL Editor. Safe to rerun.
begin;

create table if not exists public.scores_v21 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null default auth.uid(),
  import_role text check (import_role in ('regular','expert')),
  source text not null default 'web',
  date date not null,
  type text, level text, lesson text,
  class_id text not null,
  teacher text, country text, done text, camera text, url text,
  s smallint[] check (s is null or array_length(s,1) = 8),
  total numeric(5,1),
  hl text, issues text, sugg text,
  reasons text[],
  rubric text not null default 'V2.1' check (rubric = 'V2.1'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists scores_v21_one_per_user_class on public.scores_v21(user_id,class_id) where user_id is not null;
create index if not exists scores_v21_date_idx on public.scores_v21(date);
create index if not exists scores_v21_user_idx on public.scores_v21(user_id);
drop trigger if exists scores_v21_touch on public.scores_v21;
create trigger scores_v21_touch before update on public.scores_v21
  for each row execute function public.touch_updated_at();

create table if not exists public.app_config_v21 (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.app_config_v21(id,data) values (1,'{}'::jsonb) on conflict (id) do nothing;

alter table public.scores_v21 enable row level security;
alter table public.app_config_v21 enable row level security;
revoke all on public.scores_v21, public.app_config_v21 from anon;
grant select,insert,update,delete on public.scores_v21 to authenticated;
grant select,update on public.app_config_v21 to authenticated;

drop policy if exists s21_select on public.scores_v21;
drop policy if exists s21_insert on public.scores_v21;
drop policy if exists s21_update on public.scores_v21;
drop policy if exists s21_delete on public.scores_v21;
create policy s21_select on public.scores_v21 for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
create policy s21_insert on public.scores_v21 for insert to authenticated
  with check (user_id = (select auth.uid()) and public.is_member() and import_role is null and source = 'web' and rubric = 'V2.1');
create policy s21_update on public.scores_v21 for update to authenticated
  using (user_id = (select auth.uid()) and public.is_member())
  with check (user_id = (select auth.uid()) and import_role is null and source in ('web','历史导入','首批导入') and rubric = 'V2.1');
create policy s21_delete on public.scores_v21 for delete to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
drop policy if exists c21_select on public.app_config_v21;
drop policy if exists c21_update on public.app_config_v21;
create policy c21_select on public.app_config_v21 for select to authenticated using (public.is_member());
create policy c21_update on public.app_config_v21 for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Existing accounts use the same membership. This entry point does not run
-- V1.9's first-import score reassignment when a V2.1 user logs in.
create or replace function public.claim_membership_v21() returns setof public.members
language plpgsql security definer set search_path = public as $$
declare e text := lower(coalesce(auth.jwt() ->> 'email', ''));
begin
  if auth.uid() is null then return; end if;
  update members set user_id = auth.uid() where email = e and user_id is null;
  return query select * from members where user_id = auth.uid() and active;
end $$;
revoke all on function public.claim_membership_v21() from public, anon;
grant execute on function public.claim_membership_v21() to authenticated;

-- ============ 问题（每节课可记多条） ============
create table if not exists public.issues_v21 (
  id          uuid primary key default gen_random_uuid(),
  score_id    uuid not null references public.scores_v21(id) on delete cascade,
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
create index if not exists issues_score_idx_v21  on public.issues_v21(score_id);
create index if not exists issues_status_idx_v21 on public.issues_v21(status);
create index if not exists issues_user_idx_v21   on public.issues_v21(user_id);

-- 已同步到问题反馈池的问题组（同一 Lesson + 同一根因）
create table if not exists public.issue_groups_v21 (
  key             text primary key,
  lesson          text,
  root            text,
  description     text,
  first_synced_at timestamptz not null default now(),
  last_synced_at  timestamptz not null default now(),
  sync_count      int not null default 1,
  reappear_count  int not null default 0
);

create or replace function public.is_syncer_v21() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from members where user_id = auth.uid() and active and (is_admin or can_sync))
$$;

-- 打分人改不了同步状态：只有同步函数（会设置 tqa.sync = on）能改
create or replace function public.issues_guard_v21() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  if coalesce(current_setting('tqa.sync_v21', true), '') <> 'on' then
    new.status := old.status; new.synced_at := old.synced_at; new.synced_by := old.synced_by;
  end if;
  return new;
end $$;
drop trigger if exists issues_guard_v21 on public.issues_v21;
create trigger issues_guard_v21 before update on public.issues_v21 for each row execute function public.issues_guard_v21();

-- ============ 行级权限 ============
alter table public.issues_v21       enable row level security;
alter table public.issue_groups_v21 enable row level security;
revoke all on public.issues_v21, public.issue_groups_v21 from anon;
grant select,insert,update,delete on public.issues_v21 to authenticated;
grant select on public.issue_groups_v21 to authenticated;

drop policy if exists i_select_v21 on public.issues_v21;
drop policy if exists i_insert_v21 on public.issues_v21;
drop policy if exists i_update_v21 on public.issues_v21;
drop policy if exists i_delete_v21 on public.issues_v21;
create policy i_select_v21 on public.issues_v21 for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
create policy i_insert_v21 on public.issues_v21 for insert to authenticated
  with check (user_id = (select auth.uid()) and public.is_member() and status = 'new'
              and exists(select 1 from public.scores_v21 s where s.id = score_id and s.user_id = (select auth.uid())));
create policy i_update_v21 on public.issues_v21 for update to authenticated
  using (user_id = (select auth.uid()) and public.is_member()) with check (user_id = (select auth.uid()));
create policy i_delete_v21 on public.issues_v21 for delete to authenticated using (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists g_select_v21 on public.issue_groups_v21;
create policy g_select_v21 on public.issue_groups_v21 for select to authenticated using (public.is_syncer_v21());

-- ============ 问题同步 ============
-- 待同步的问题（不含任何分数）
create or replace function public.sync_pending_v21() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.is_syncer_v21() then raise exception '只有问题同步人或管理员可以查看'; end if;
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', i.id, 'time', i.time, 'description', i.description, 'root', i.root, 'priority', i.priority,
      'lesson', s.lesson, 'class_id', s.class_id, 'date', s.date, 'type', s.type, 'level', s.level, 'url', s.url,
      'who', coalesce(nullif(m.name,''), case when m.is_owner then '管理员' else split_part(m.email,'@',1) end, '已移除的成员'),
      'created_at', i.created_at,
      'key', coalesce(s.lesson,'') || '|' || i.root,
      'g_description', g.description, 'g_reappear', g.reappear_count, 'g_last', g.last_synced_at
    ) order by s.lesson, i.root, i.created_at), '[]'::jsonb) into r
  from issues_v21 i join scores_v21 s on s.id = i.score_id
  left join members m on m.user_id = i.user_id
  left join issue_groups_v21 g on g.key = coalesce(s.lesson,'') || '|' || i.root
  where i.status = 'new';
  return r;
end $$;

-- 标记已同步 / 忽略
-- p_groups: [{"key":"732|识别","lesson":"732","root":"识别","description":"…","ids":["uuid",…]}]
create or replace function public.sync_apply_v21(p_groups jsonb, p_ignore uuid[] default '{}') returns jsonb
language plpgsql security definer set search_path = public as $$
declare g jsonb; n_sync int := 0; n_ign int := 0; k int;
begin
  if not public.is_syncer_v21() then raise exception '只有问题同步人或管理员可以同步'; end if;
  perform set_config('tqa.sync_v21', 'on', true);
  for g in select * from jsonb_array_elements(coalesce(p_groups, '[]'::jsonb)) loop
    update issues_v21 set status = 'synced', synced_at = now(), synced_by = auth.uid()
      where status = 'new' and id in (select (x #>> '{}')::uuid from jsonb_array_elements(g->'ids') x);
    get diagnostics k = row_count; n_sync := n_sync + k;
    if k > 0 then
      insert into issue_groups_v21(key, lesson, root, description)
        values (g->>'key', g->>'lesson', g->>'root', g->>'description')
      on conflict (key) do update set last_synced_at = now(), sync_count = issue_groups_v21.sync_count + 1,
        reappear_count = issue_groups_v21.reappear_count + 1;
    end if;
  end loop;
  update issues_v21 set status = 'ignored', synced_at = now(), synced_by = auth.uid()
    where status = 'new' and id = any(coalesce(p_ignore, '{}'));
  get diagnostics n_ign = row_count;
  return jsonb_build_object('synced', n_sync, 'ignored', n_ign);
end $$;

revoke all on function public.is_syncer_v21() from public, anon;
revoke all on function public.sync_pending_v21() from public, anon;
revoke all on function public.sync_apply_v21(jsonb, uuid[]) from public, anon;
grant execute on function public.is_syncer_v21() to authenticated;
grant execute on function public.sync_pending_v21() to authenticated;
grant execute on function public.sync_apply_v21(jsonb, uuid[]) to authenticated;

-- ============ 表 ============
create table if not exists public.review_tasks_v21 (
  id          uuid primary key default gen_random_uuid(),
  task_date   date not null,                 -- 分配日（北京时间）
  week_start  date not null,                 -- 分配日所在周的周一
  score_id    uuid references public.scores_v21(id) on delete set null,  -- 被抽中的常规打分记录
  scorer_id   uuid references auth.users(id) on delete set null,     -- 常规打分者
  class_id    text not null,
  date date, type text, level text, lesson text, teacher text, country text, url text,  -- 课程信息副本（不含分数）
  reason      text,
  status      text not null default 'open' check (status in ('open','done','cancelled')),
  assigned_to uuid references auth.users(id) on delete set null,     -- 专家（只有一位专家时自动填）
  created_by  text not null default 'auto' check (created_by in ('auto','admin')),
  created_at  timestamptz not null default now(),
  done_at     timestamptz,
  cancelled_at timestamptz
);
create unique index if not exists review_tasks_one_active_v21 on public.review_tasks_v21(class_id) where status <> 'cancelled';
create index if not exists review_tasks_week_idx_v21 on public.review_tasks_v21(week_start);
create index if not exists review_tasks_day_idx_v21 on public.review_tasks_v21(task_date);
create index if not exists scores_class_idx_v21 on public.scores_v21(class_id);

alter table public.review_tasks_v21 enable row level security;
revoke all on public.review_tasks_v21 from anon;
grant select on public.review_tasks_v21 to authenticated;
drop policy if exists rt_select_v21 on public.review_tasks_v21;
create policy rt_select_v21 on public.review_tasks_v21 for select to authenticated using (public.is_admin());
-- 写入只通过下面的函数完成；专家通过 my_review_tasks_v21() 读取（看不到是谁打的、打了多少分）

-- ============ 辅助 ============
create or replace function public.is_expert_v21() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from members where user_id = auth.uid() and active and compare_role = 'expert')
$$;

create or replace function public.review_cfg_v21() returns jsonb
language sql stable security definer set search_path = public as $$
  select '{"enabled":true,"days":[2,3,4,5],"daily_min":2,"daily_max":5,"weekly_min":10,"weekly_max":20,
           "per_scorer_min":2,"levels":["Lv1","Lv2","Lv3","Lv4"],"pool_days":14}'::jsonb
         || coalesce((select data->'review' from app_config_v21 where id = 1), '{}'::jsonb)
$$;

create or replace function public.bj_today_v21() returns date
language sql stable as $$ select (now() at time zone 'Asia/Shanghai')::date $$;

-- 专家给某节课打分后，任务自动完成；专家记录被删则重新打开
create or replace function public.review_sync_v21(p_class text) returns void
language plpgsql security definer set search_path = public as $$
declare t timestamptz;
begin
  if p_class is null then return; end if;
  select min(s.created_at) into t from scores_v21 s join members m on m.user_id = s.user_id
   where s.class_id = p_class and m.compare_role = 'expert';
  if t is not null then
    update review_tasks_v21 set status = 'done', done_at = t where class_id = p_class and status = 'open';
  else
    update review_tasks_v21 set status = 'open', done_at = null where class_id = p_class and status = 'done';
  end if;
end $$;

create or replace function public.scores_review_trg_v21() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op in ('UPDATE','DELETE') then perform review_sync_v21(old.class_id); end if;
  if tg_op in ('INSERT','UPDATE') then perform review_sync_v21(new.class_id); end if;
  return null;
end $$;
drop trigger if exists scores_review_v21 on public.scores_v21;
create trigger scores_review_v21 after insert or delete or update of class_id, user_id on public.scores_v21
  for each row execute function public.scores_review_trg_v21();

-- ============ 生成任务 ============
-- 每次调用把"今天"的任务补足到当天目标数，重复调用不会重复生成。
-- p_manual = true：管理员手动补足，忽略"今天是否复评日 / 是否开启自动"。
create or replace function public.generate_review_tasks_v21(p_day date default null, p_manual boolean default false)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare
  d  date := coalesce(p_day, bj_today_v21());
  ws date;
  c  jsonb := review_cfg_v21();
  days int[];
  lv text[];
  dmin int := (c->>'daily_min')::int;  dmax int := (c->>'daily_max')::int;
  wmin int := (c->>'weekly_min')::int; wmax int := (c->>'weekly_max')::int;
  per int := (c->>'per_scorer_min')::int; pool int := (c->>'pool_days')::int;
  before_n int; today_n int; days_left int; need_total int; lv_need int; target int; to_create int;
  exp uuid; pick record; why text[]; made int := 0;
begin
  if auth.uid() is not null and not public.is_admin() then raise exception '只有管理员可以生成复评任务'; end if;
  ws := d - (extract(isodow from d)::int - 1);
  days := array(select jsonb_array_elements_text(c->'days')::int);
  lv := array(select jsonb_array_elements_text(c->'levels'));
  if not p_manual and (not coalesce((c->>'enabled')::boolean, true) or not (extract(isodow from d)::int = any(days))) then
    return jsonb_build_object('created', 0, 'skipped', '今天不是复评日或自动生成已关闭');
  end if;
  perform pg_advisory_xact_lock(hashtext('tqa_review_gen_v21'));

  select count(*) filter (where task_date < d), count(*) filter (where task_date = d)
    into before_n, today_n from review_tasks_v21 where week_start = ws and status <> 'cancelled';
  select count(*) into days_left from generate_series(d, ws + 6, interval '1 day') g where extract(isodow from g)::int = any(days);
  if not (extract(isodow from d)::int = any(days)) then days_left := days_left + 1; end if;
  days_left := greatest(days_left, 1);

  -- 候选：常规打分者在 [d - pool, d) 内保存的记录，这节课还没有专家打分、本周没被抽过、不是首批导入的课
  drop table if exists _cand; drop table if exists _need; drop table if exists _picked;
  create temp table _cand on commit drop as
    select distinct on (s.class_id) s.id, s.user_id, s.class_id, s.date, s.type, s.level, s.lesson, s.teacher, s.country, s.url,
      (coalesce(s.issues,'') like '%严重%' or exists(select 1 from issues_v21 ii where ii.score_id = s.id and ii.priority in ('P0','P1')))::int as sev,
      (s.total < 60 or exists(select 1 from unnest(s.s) v where v < 6))::int as low,
      (s.created_at at time zone 'Asia/Shanghai')::date as scored
    from scores_v21 s join members m on m.user_id = s.user_id and m.active and m.compare_role = 'regular'
    where s.import_role is null and s.s is not null and s.total is not null
      and (s.created_at at time zone 'Asia/Shanghai')::date < d
      and (s.created_at at time zone 'Asia/Shanghai')::date >= d - pool
      and not exists(select 1 from review_tasks_v21 t where t.class_id = s.class_id and (t.status <> 'cancelled' or t.week_start = ws))
      and not exists(select 1 from scores_v21 x join members mx on mx.user_id = x.user_id where x.class_id = s.class_id and mx.compare_role = 'expert')
      and not exists(select 1 from scores_v21 y where y.class_id = s.class_id and y.import_role is not null)
    order by s.class_id, s.created_at;

  -- 每位常规打分者本周还差几节（只算有候选课的人）
  create temp table _need on commit drop as
    select m.user_id as scorer,
      least(greatest(per - (select count(*) from review_tasks_v21 t where t.week_start = ws and t.status <> 'cancelled' and t.scorer_id = m.user_id), 0),
            (select count(*) from _cand c2 where c2.user_id = m.user_id))::int as need
    from members m where m.active and m.compare_role = 'regular' and m.user_id is not null;
  create temp table _picked(scorer uuid) on commit drop;

  -- 本周还没覆盖、且有候选课的级别
  lv := array(select l from unnest(lv) l
              where not exists(select 1 from review_tasks_v21 t where t.week_start = ws and t.status <> 'cancelled' and t.level = l)
                and exists(select 1 from _cand c3 where c3.level = l));
  lv_need := coalesce(array_length(lv, 1), 0);
  select coalesce(sum(need), 0) into need_total from _need;

  target := greatest(dmin,
                     ceil(greatest(wmin - before_n, 0)::numeric / days_left)::int,
                     ceil(greatest(need_total, lv_need)::numeric / days_left)::int);
  target := least(target, dmax, greatest(wmax - before_n, 0));
  to_create := greatest(target - today_n, 0);

  select case when count(*) = 1 then min(user_id::text)::uuid end into exp
    from members where active and compare_role = 'expert' and user_id is not null;

  for i in 1..to_create loop
    select c.*, coalesce(n.need, 0) as need,
      (case when coalesce(n.need,0) > 0 then 100 + 10 * n.need else 0 end)
      + (case when c.level = any(lv) then 40 else 0 end)
      + 8 * c.sev + 4 * c.low + (case when c.scored >= d - 3 then 2 else 0 end)
      - 15 * (select count(*) from _picked p where p.scorer = c.user_id)
      + random() * 3 as sc
    into pick from _cand c left join _need n on n.scorer = c.user_id
    order by sc desc limit 1;
    exit when not found;
    why := array[]::text[];
    if pick.need > 0 then why := why || '覆盖打分者'::text; end if;
    if pick.level = any(lv) then why := why || ('覆盖 ' || pick.level); end if;
    if pick.sev = 1 then why := why || '有严重问题'::text; end if;
    if pick.low = 1 then why := why || '低分'::text; end if;
    if cardinality(why) = 0 then why := array['随机抽查']; end if;
    insert into review_tasks_v21(task_date, week_start, score_id, scorer_id, class_id, date, type, level, lesson, teacher, country, url, reason, assigned_to, created_by)
    values (d, ws, pick.id, pick.user_id, pick.class_id, pick.date, pick.type, pick.level, pick.lesson, pick.teacher, pick.country, pick.url,
            array_to_string(why, '、'), exp, 'auto');
    update _need set need = need - 1 where scorer = pick.user_id;
    lv := array_remove(lv, pick.level);
    delete from _cand where class_id = pick.class_id;
    insert into _picked values (pick.user_id);
    made := made + 1;
  end loop;

  return jsonb_build_object('created', made, 'target', target, 'day', d, 'week_start', ws,
    'candidates_left', (select count(*) from _cand));
end $$;

-- 管理员取消一条未完成的任务
create or replace function public.cancel_review_task_v21(p_id uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception '只有管理员可以取消任务'; end if;
  update review_tasks_v21 set status = 'cancelled', cancelled_at = now() where id = p_id and status = 'open';
  if not found then raise exception '这条任务已完成或已取消'; end if;
end $$;

-- 管理员按 Class ID 指定一节课给专家复评
create or replace function public.add_review_task_v21(p_class text) returns void
language plpgsql security definer set search_path = public as $$
declare s record; d date := bj_today_v21(); exp uuid;
begin
  if not public.is_admin() then raise exception '只有管理员可以指定任务'; end if;
  if exists(select 1 from review_tasks_v21 where class_id = trim(p_class) and status <> 'cancelled') then raise exception '这节课已经在复评任务里'; end if;
  select sc.* into s from scores_v21 sc join members m on m.user_id = sc.user_id and m.compare_role = 'regular'
   where sc.class_id = trim(p_class) order by sc.created_at desc limit 1;
  if not found then raise exception '没有找到常规打分者对这节课的打分记录'; end if;
  select case when count(*) = 1 then min(user_id::text)::uuid end into exp from members where active and compare_role = 'expert' and user_id is not null;
  insert into review_tasks_v21(task_date, week_start, score_id, scorer_id, class_id, date, type, level, lesson, teacher, country, url, reason, assigned_to, created_by)
  values (d, d - (extract(isodow from d)::int - 1), s.id, s.user_id, s.class_id, s.date, s.type, s.level, s.lesson, s.teacher, s.country, s.url, '管理员指定', exp, 'admin');
  perform review_sync_v21(s.class_id);
end $$;

-- 专家看到的任务（不含打分者和分数）
create or replace function public.my_review_tasks_v21() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id',id,'task_date',task_date,'date',date,'type',type,'level',level,'lesson',lesson,
    'class_id',class_id,'teacher',teacher,'country',country,'url',url,'status',status,'done_at',done_at) order by task_date, created_at), '[]'::jsonb)
  from review_tasks_v21
  where (public.is_expert_v21() or public.is_admin()) and status <> 'cancelled'
    and (assigned_to is null or assigned_to = auth.uid() or public.is_admin())
    and (status = 'open' or task_date >= bj_today_v21() - 28)
$$;

-- 专家完成后查看常规打分者的分数和问题
create or replace function public.review_compare_v21(p_id uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare t review_tasks_v21; r jsonb;
begin
  select * into t from review_tasks_v21 where id = p_id;
  if not found then raise exception '任务不存在'; end if;
  if not (public.is_admin() or (public.is_expert_v21() and t.status = 'done' and (t.assigned_to is null or t.assigned_to = auth.uid()))) then
    raise exception '完成打分后才能查看对比';
  end if;
  select jsonb_agg(jsonb_build_object('who', coalesce(nullif(m.name,''), split_part(m.email,'@',1)), 's', s.s, 'total', s.total,
           'hl', s.hl, 'issues', s.issues, 'sugg', s.sugg, 'reasons', s.reasons,
           'issue_list', (select coalesce(jsonb_agg(jsonb_build_object('time', i.time, 'description', i.description, 'root', i.root, 'priority', i.priority) order by i.pos, i.created_at), '[]'::jsonb) from issues_v21 i where i.score_id = s.id)) order by s.created_at) into r
    from scores_v21 s join members m on m.user_id = s.user_id and m.compare_role = 'regular' where s.class_id = t.class_id;
  return coalesce(r, '[]'::jsonb);
end $$;

-- ============ 权限 ============
revoke all on function public.is_expert_v21() from public, anon;
revoke all on function public.review_cfg_v21() from public, anon;
revoke all on function public.review_sync_v21(text) from public, anon, authenticated;
revoke all on function public.scores_review_trg_v21() from public, anon, authenticated;
revoke all on function public.generate_review_tasks_v21(date, boolean) from public, anon;
revoke all on function public.cancel_review_task_v21(uuid) from public, anon;
revoke all on function public.add_review_task_v21(text) from public, anon;
revoke all on function public.my_review_tasks_v21() from public, anon;
revoke all on function public.review_compare_v21(uuid) from public, anon;
grant execute on function public.is_expert_v21(), public.review_cfg_v21(), public.generate_review_tasks_v21(date, boolean),
  public.cancel_review_task_v21(uuid), public.add_review_task_v21(text), public.my_review_tasks_v21(), public.review_compare_v21(uuid) to authenticated;

-- ============ 定时：每天 23:00 UTC（北京时间 07:00）运行，函数内部判断是否复评日 ============
create extension if not exists pg_cron;
select cron.unschedule(jobid) from cron.job where jobname = 'tqa-review-tasks-v21';
select cron.schedule('tqa-review-tasks-v21', '0 23 * * *', $$select public.generate_review_tasks_v21()$$);

commit;
