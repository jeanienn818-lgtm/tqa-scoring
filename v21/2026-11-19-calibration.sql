-- V2.1 calibration upgrade. Additive: no score rows or V1.9 objects are changed.
begin;

create table if not exists public.trial_periods_v21 (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  started_at timestamptz not null,
  ended_at timestamptz,
  created_by uuid not null references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now(),
  check (ended_at is null or ended_at > started_at)
);
create unique index if not exists trial_periods_one_open_v21 on public.trial_periods_v21(user_id) where ended_at is null;
create index if not exists trial_periods_user_time_v21 on public.trial_periods_v21(user_id, started_at, ended_at);
alter table public.trial_periods_v21 enable row level security;
revoke all on public.trial_periods_v21 from anon;
grant select on public.trial_periods_v21 to authenticated;
drop policy if exists trial_periods_read_v21 on public.trial_periods_v21;
create policy trial_periods_read_v21 on public.trial_periods_v21 for select to authenticated
  using (public.is_admin() or public.is_expert_v21());

create or replace function public.set_trial_v21(p_user uuid, p_enable boolean, p_start date default null)
returns void language plpgsql security definer set search_path = public as $$
declare v_start timestamptz;
begin
  if not public.is_admin() then raise exception '只有管理员可以调整新人试打'; end if;
  if not exists(select 1 from members where user_id = p_user and active and compare_role = 'regular') then
    raise exception '只能为常规打分者设置新人试打';
  end if;
  perform pg_advisory_xact_lock(hashtext('trial_v21_' || p_user::text));
  if p_enable then
    if exists(select 1 from trial_periods_v21 where user_id = p_user and ended_at is null) then
      raise exception '该打分者已处于试打阶段';
    end if;
    v_start := case when p_start is null then now() else p_start::timestamp at time zone 'Asia/Shanghai' end;
    if v_start > now() then raise exception '开始日期不能晚于今天'; end if;
    if exists(select 1 from trial_periods_v21 where user_id = p_user and ended_at > v_start) then
      raise exception '开始日期与之前的试打阶段重叠';
    end if;
    insert into trial_periods_v21(user_id,started_at) values(p_user,v_start);
  else
    update trial_periods_v21 set ended_at = now() where user_id = p_user and ended_at is null;
    if not found then raise exception '该打分者当前不在试打阶段'; end if;
  end if;
end $$;

create or replace function public.is_trial_score_v21(p_score uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from scores_v21 s join trial_periods_v21 p on p.user_id = s.user_id
    where s.id = p_score and s.rubric = 'V2.1' and s.import_role is null
      and s.created_at >= p.started_at and (p.ended_at is null or s.created_at < p.ended_at)
  )
$$;

create table if not exists public.score_feedback_v21 (
  id uuid primary key default gen_random_uuid(),
  score_id uuid not null references public.scores_v21(id) on delete cascade,
  author_id uuid not null references auth.users(id) default auth.uid(),
  author_name text not null,
  author_role text not null check (author_role in ('admin','expert')),
  body text not null check (length(btrim(body)) between 1 and 2000),
  score_updated_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists score_feedback_score_v21 on public.score_feedback_v21(score_id, created_at);
create or replace function public.can_review_score_v21(p_score uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from scores_v21 s join review_tasks_v21 t on t.class_id = s.class_id
    where s.id = p_score and t.status = 'done' and
      (t.assigned_to is null or t.assigned_to = auth.uid())) and public.is_expert_v21()
$$;
alter table public.score_feedback_v21 enable row level security;
revoke all on public.score_feedback_v21 from anon;
grant select on public.score_feedback_v21 to authenticated;
drop policy if exists score_feedback_read_v21 on public.score_feedback_v21;
create policy score_feedback_read_v21 on public.score_feedback_v21 for select to authenticated using (
  public.is_admin() or public.can_review_score_v21(score_id) or
  exists (select 1 from scores_v21 s where s.id = score_id and s.user_id = auth.uid())
);

create or replace function public.add_score_feedback_v21(p_score uuid, p_body text)
returns uuid language plpgsql security definer set search_path = public as $$
declare s scores_v21; v_id uuid;
begin
  select * into s from scores_v21 where id = p_score;
  if not found or s.rubric <> 'V2.1' then raise exception '找不到 V2.1 打分记录'; end if;
  if not exists(select 1 from members m where m.user_id = s.user_id and m.compare_role = 'regular') then
    raise exception '只能给打分者记录留言';
  end if;
  if not (public.is_admin() or public.can_review_score_v21(p_score)) then
    raise exception '完成该课复评后才能留言'; end if;
  insert into score_feedback_v21(score_id, author_id, author_name, author_role, body, score_updated_at)
  values(p_score, auth.uid(),
    coalesce((select nullif(m.name,'') from members m where m.user_id = auth.uid()), '管理员/专家'),
    case when public.is_admin() then 'admin' else 'expert' end,
    btrim(p_body), s.updated_at) returning id into v_id;
  return v_id;
end $$;

alter table public.review_tasks_v21 add column if not exists started_at timestamptz;
create or replace function public.start_review_task_v21(p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not (public.is_expert_v21() or public.is_admin()) then raise exception '只有专家可以开始复评'; end if;
  update review_tasks_v21 set started_at = coalesce(started_at, now())
  where id = p_id and status = 'open' and (assigned_to is null or assigned_to = auth.uid() or public.is_admin());
  if not found then raise exception '复评任务已不可用'; end if;
end $$;

-- Record-specific manual assignment. Existing automatic tasks are promoted in place.
-- Keep existing tasks when capacity is full: a task may already be open in an older browser tab.
create or replace function public.add_review_score_v21(p_score uuid)
returns uuid language plpgsql security definer set search_path = public as $$
declare s scores_v21; t review_tasks_v21; d date := bj_today_v21(); exp uuid; v_id uuid;
begin
  if not public.is_admin() then raise exception '只有管理员可以指定复评'; end if;
  perform pg_advisory_xact_lock(hashtext('tqa_review_gen_v21'));
  select * into s from scores_v21 where id = p_score;
  if not found or s.rubric <> 'V2.1' or s.import_role is not null or s.total is null or
    not exists(select 1 from members where user_id = s.user_id and compare_role = 'regular') then
    raise exception '只能选择 V2.1 打分者的完整记录';
  end if;
  select * into t from review_tasks_v21 where class_id = s.class_id and status <> 'cancelled';
  if found then
    if t.status = 'done' then raise exception '这节课已完成复评'; end if;
    if t.score_id is distinct from s.id then
      raise exception '该课已有另一条记录的复评任务；请先处理原任务';
    end if;
    update review_tasks_v21 set created_by = 'admin', reason = '管理员指定'
      where id = t.id returning id into v_id;
    return v_id;
  end if;
  if exists(select 1 from scores_v21 x join members m on m.user_id = x.user_id
      where x.class_id = s.class_id and x.rubric = 'V2.1' and m.compare_role = 'expert') then
    raise exception '这节课已有专家打分';
  end if;
  select case when count(*) = 1 then min(user_id::text)::uuid end into exp
    from members where active and compare_role = 'expert' and user_id is not null;
  insert into review_tasks_v21(task_date,week_start,score_id,scorer_id,class_id,date,type,level,
    lesson,teacher,country,url,reason,assigned_to,created_by)
  values(d,d-(extract(isodow from d)::int-1),s.id,s.user_id,s.class_id,s.date,s.type,s.level,
    s.lesson,s.teacher,s.country,s.url,'管理员指定',exp,'admin') returning id into v_id;
  return v_id;
end $$;

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
    into before_n, today_n from review_tasks_v21 where week_start = ws and status <> 'cancelled' and not public.is_trial_score_v21(score_id);
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
    where s.import_role is null and not public.is_trial_score_v21(s.id) and s.rubric = 'V2.1' and s.s is not null and s.total is not null
      and (s.created_at at time zone 'Asia/Shanghai')::date < d
      and (s.created_at at time zone 'Asia/Shanghai')::date >= d - pool
      and not exists(select 1 from review_tasks_v21 t where t.class_id = s.class_id and (t.status <> 'cancelled' or t.week_start = ws))
      and not exists(select 1 from scores_v21 x join members mx on mx.user_id = x.user_id where x.class_id = s.class_id and mx.compare_role = 'expert' and x.rubric = 'V2.1')
      and not exists(select 1 from scores_v21 y where y.class_id = s.class_id and y.import_role is not null and y.rubric = 'V2.1')
    order by s.class_id, s.created_at;

  -- 每位常规打分者本周还差几节（只算有候选课的人）
  create temp table _need on commit drop as
    select m.user_id as scorer,
      least(greatest(per - (select count(*) from review_tasks_v21 t where t.week_start = ws and t.status <> 'cancelled' and not public.is_trial_score_v21(t.score_id) and t.scorer_id = m.user_id), 0),
            (select count(*) from _cand c2 where c2.user_id = m.user_id))::int as need
    from members m where m.active and m.compare_role = 'regular' and m.user_id is not null;
  create temp table _picked(scorer uuid) on commit drop;

  -- 本周还没覆盖、且有候选课的级别
  lv := array(select l from unnest(lv) l
              where not exists(select 1 from review_tasks_v21 t where t.week_start = ws and t.status <> 'cancelled' and not public.is_trial_score_v21(t.score_id) and t.level = l)
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

create or replace function public.my_review_tasks_v21() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id',id,'task_date',task_date,'date',date,'completion_date',completion_date,'course_version',course_version,'type',type,'level',level,'lesson',lesson,
    'class_id',class_id,'teacher',teacher,'country',country,'url',url,'created_by',created_by,'score_id',score_id,'started_at',started_at,'is_trial',public.is_trial_score_v21(score_id),'status',status,'done_at',done_at) order by case when created_by = 'admin' then 0 else 1 end, task_date, created_at), '[]'::jsonb)
  from review_tasks_v21
  where (public.is_expert_v21() or public.is_admin()) and status <> 'cancelled'
    and (assigned_to is null or assigned_to = auth.uid() or public.is_admin())
    and (status = 'open' or task_date >= bj_today_v21() - 28)
$$;

create or replace function public.review_compare_v21(p_id uuid) returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare t review_tasks_v21; r jsonb;
begin
  select * into t from review_tasks_v21 where id = p_id;
  if not found then raise exception '任务不存在'; end if;
  if not (public.is_admin() or (public.is_expert_v21() and t.status = 'done' and (t.assigned_to is null or t.assigned_to = auth.uid()))) then
    raise exception '完成打分后才能查看对比';
  end if;
  select jsonb_agg(jsonb_build_object('id', s.id, 'updated_at', s.updated_at, 'who', coalesce(nullif(m.name,''), split_part(m.email,'@',1)), 's', s.s, 'total', s.total,
           'hl', s.hl, 'issues', s.issues, 'sugg', s.sugg, 'reasons', s.reasons,
           'issue_list', (select coalesce(jsonb_agg(jsonb_build_object('time', i.time, 'description', i.description, 'root', i.root, 'priority', i.priority) order by i.pos, i.created_at), '[]'::jsonb) from issues_v21 i where i.score_id = s.id)) order by s.created_at) into r
    from scores_v21 s join members m on m.user_id = s.user_id and m.compare_role = 'regular' where s.class_id = t.class_id and s.rubric = 'V2.1';
  return coalesce(r, '[]'::jsonb);
end $$;

revoke all on function public.set_trial_v21(uuid, boolean, date), public.is_trial_score_v21(uuid),
  public.can_review_score_v21(uuid),
  public.add_score_feedback_v21(uuid,text), public.start_review_task_v21(uuid),
  public.add_review_score_v21(uuid) from public, anon;
grant execute on function public.set_trial_v21(uuid, boolean, date), public.is_trial_score_v21(uuid),
  public.can_review_score_v21(uuid),
  public.add_score_feedback_v21(uuid,text), public.start_review_task_v21(uuid),
  public.add_review_score_v21(uuid) to authenticated;
revoke all on function public.is_trial_score_v21(uuid) from authenticated;
commit;
