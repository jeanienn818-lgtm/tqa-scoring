-- TQA 看课打分台 · 数据库结构与权限
-- 在 Supabase 项目的 SQL Editor 中整段运行一次即可（可重复运行）。

-- ============ 表 ============
create table if not exists public.members (
  email        text primary key check (email = lower(email)),
  name         text,
  is_admin     boolean not null default false,
  is_owner     boolean not null default false,
  compare_role text not null default 'regular' check (compare_role in ('regular','expert','none')),
  active       boolean not null default true,
  user_id      uuid unique references auth.users(id) on delete set null,
  created_at   timestamptz not null default now()
);

create table if not exists public.scores (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete set null default auth.uid(),
  import_role text check (import_role in ('regular','expert')),
  source      text not null default 'web',
  date        date not null,
  type        text, level text, lesson text,
  class_id    text not null,
  teacher     text, country text, done text, camera text, url text,
  s           smallint[] not null check (array_length(s,1) = 8),
  total       numeric(5,1),
  hl text, issues text, sugg text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create unique index if not exists scores_one_per_user_class on public.scores(user_id, class_id) where user_id is not null;
create index if not exists scores_date_idx on public.scores(date);
create index if not exists scores_user_idx on public.scores(user_id);
create index if not exists members_user_idx on public.members(user_id);

create table if not exists public.app_config (
  id         int primary key default 1 check (id = 1),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.app_config(id, data) values (1, '{}'::jsonb) on conflict (id) do nothing;

-- ============ 辅助函数 ============
create or replace function public.is_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from members where user_id = auth.uid() and active)
$$;
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from members where user_id = auth.uid() and active and is_admin)
$$;
create or replace function public.is_owner_user() returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from members where user_id = auth.uid() and active and is_owner)
$$;

-- 登录后调用：把账号和名单里的同一邮箱关联，返回自己的成员信息（未授权返回空）
create or replace function public.claim_membership() returns setof public.members
language plpgsql security definer set search_path = public as $$
declare e text := lower(coalesce(auth.jwt() ->> 'email', ''));
begin
  if auth.uid() is null then return; end if;
  update members set user_id = auth.uid() where email = e and user_id is null;
  -- 首批导入的"专家"记录：归属邮箱（app_config.data.import_owner.expert）的专家第一次登录时转到他名下
  if e <> '' and e = lower(coalesce((select data->'import_owner'->>'expert' from app_config where id = 1), ''))
     and exists(select 1 from members where user_id = auth.uid() and active and compare_role = 'expert') then
    update scores set user_id = auth.uid(), import_role = null where import_role = 'expert' and user_id is null;
  end if;
  return query select * from members where user_id = auth.uid() and active;
end $$;

-- （旧版注册检查，现由 Edge Function tqa-account 负责注册）
create or replace function public.email_invited(p_email text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists(select 1 from members where email = lower(trim(p_email)) and active)
$$;

-- 成员修改自己的名字
create or replace function public.set_my_name(p_name text) returns void
language sql security definer set search_path = public as $$
  update members set name = nullif(left(trim(p_name), 30), '') where user_id = auth.uid() and active
$$;

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists scores_touch on public.scores;
create trigger scores_touch before update on public.scores for each row execute function public.touch_updated_at();

revoke all on function public.claim_membership() from public, anon;
revoke all on function public.set_my_name(text) from public, anon;
grant execute on function public.claim_membership() to authenticated;
grant execute on function public.set_my_name(text) to authenticated;
revoke all on function public.is_member() from public, anon;
revoke all on function public.is_admin() from public, anon;
revoke all on function public.is_owner_user() from public, anon;
grant execute on function public.is_member() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_owner_user() to authenticated;
grant execute on function public.email_invited(text) to anon, authenticated;

-- ============ 行级权限 ============
alter table public.members    enable row level security;
alter table public.scores     enable row level security;
alter table public.app_config enable row level security;
revoke all on public.members, public.scores, public.app_config from anon;

drop policy if exists m_select on public.members;
drop policy if exists m_insert on public.members;
drop policy if exists m_update on public.members;
drop policy if exists m_delete on public.members;
create policy m_select on public.members for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
create policy m_insert on public.members for insert to authenticated with check (public.is_admin() and not is_owner);
create policy m_update on public.members for update to authenticated
  using (public.is_admin() and (not is_owner or public.is_owner_user()))
  with check (not is_owner or public.is_owner_user());
create policy m_delete on public.members for delete to authenticated using (public.is_admin() and not is_owner);

drop policy if exists s_select on public.scores;
drop policy if exists s_insert on public.scores;
drop policy if exists s_update on public.scores;
drop policy if exists s_delete on public.scores;
create policy s_select on public.scores for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
create policy s_insert on public.scores for insert to authenticated
  with check (user_id = (select auth.uid()) and public.is_member() and import_role is null and source = 'web');
create policy s_update on public.scores for update to authenticated
  using (user_id = (select auth.uid()) and public.is_member())
  with check (user_id = (select auth.uid()) and import_role is null and source in ('web','历史导入','首批导入'));
create policy s_delete on public.scores for delete to authenticated using (user_id = (select auth.uid()) or public.is_admin());

drop policy if exists c_select on public.app_config;
drop policy if exists c_update on public.app_config;
create policy c_select on public.app_config for select to authenticated using (public.is_member());
create policy c_update on public.app_config for update to authenticated using (public.is_admin()) with check (public.is_admin());
