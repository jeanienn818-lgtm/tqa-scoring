-- Copy V1.9-platform completed, fully scored records into V2.1.
-- Reads public.scores only. Never updates or deletes V1.9 rows.
-- The source has no completion_date or course_version; both stay NULL.
-- Unlabeled source rubric values remain visibly unlabeled in V2.1.

begin isolation level repeatable read;

do $$
begin
  if exists (
    select 1 from public.scores
    where done = '完课' and array_length(s, 1) = 8 and total is not null
      and rubric is not null and rubric <> 'V1.9'
  ) then
    raise exception 'Unexpected source rubric; no records imported';
  end if;
  if exists (
    select user_id, class_id from public.scores
    where done = '完课' and array_length(s, 1) = 8 and total is not null
      and user_id is not null
    group by user_id, class_id having count(*) > 1
  ) then
    raise exception 'Duplicate V1.9 user/class pair; no records imported';
  end if;
  if exists (
    select 1 from public.scores s join public.scores_v21 n
      on n.user_id = s.user_id and n.class_id = s.class_id
        and n.rubric = coalesce(s.rubric, 'Unspecified') and n.id <> s.id
    where s.done = '完课' and array_length(s.s, 1) = 8 and s.total is not null
  ) then
    raise exception 'V2.1 already contains a different score for the same user/class/rubric';
  end if;
end $$;

alter table public.scores_v21 drop constraint scores_v21_rubric_check;
alter table public.scores_v21 add constraint scores_v21_rubric_check
  check (rubric in ('V2.1', 'V1.9', 'Unspecified'));

alter table public.scores_v21 drop constraint scores_v21_completion_date_required;
alter table public.scores_v21 add constraint scores_v21_completion_date_required
  check (
    source <> 'web' or coalesce(done, '') <> '完课'
    or rubric <> 'V2.1' or completion_date is not null
  ) not valid;

-- A person may score the same class again under V2.1 without replacing the
-- historical copy. Legacy copies remain read-only through the platform.
drop index if exists public.scores_v21_one_per_user_class;
create unique index scores_v21_one_per_user_class
  on public.scores_v21(user_id, class_id, rubric) where user_id is not null;
drop policy if exists s21_update on public.scores_v21;
create policy s21_update on public.scores_v21 for update to authenticated
  using (user_id = (select auth.uid()) and public.is_member() and rubric = 'V2.1')
  with check (user_id = (select auth.uid()) and import_role is null
    and source in ('web','历史导入','首批导入') and rubric = 'V2.1');
drop policy if exists s21_delete on public.scores_v21;
create policy s21_delete on public.scores_v21 for delete to authenticated
  using ((user_id = (select auth.uid()) or public.is_admin()) and rubric = 'V2.1');

-- Keep every V2.1 expert-review path on V2.1 scores. Historical rows may
-- share a Class ID with new scores, so candidate selection alone is not enough.
do $$
declare
  function_sql text;
  patch record;
begin
  for patch in
    select * from (values
      ('public.review_sync_v21(text)',
       'where s.class_id = p_class and m.compare_role = ''expert'';',
       'where s.class_id = p_class and m.compare_role = ''expert'' and s.rubric = ''V2.1'';'),
      ('public.generate_review_tasks_v21(date,boolean)',
       'where s.import_role is null and s.s is not null and s.total is not null',
       'where s.import_role is null and s.rubric = ''V2.1'' and s.s is not null and s.total is not null'),
      ('public.generate_review_tasks_v21(date,boolean)',
       'where x.class_id = s.class_id and mx.compare_role = ''expert''',
       'where x.class_id = s.class_id and mx.compare_role = ''expert'' and x.rubric = ''V2.1'''),
      ('public.generate_review_tasks_v21(date,boolean)',
       'where y.class_id = s.class_id and y.import_role is not null',
       'where y.class_id = s.class_id and y.import_role is not null and y.rubric = ''V2.1'''),
      ('public.add_review_task_v21(text)',
       'where sc.class_id = trim(p_class) order by sc.created_at desc limit 1;',
       'where sc.class_id = trim(p_class) and sc.rubric = ''V2.1'' order by sc.created_at desc limit 1;'),
      ('public.review_compare_v21(uuid)',
       'where s.class_id = t.class_id;',
       'where s.class_id = t.class_id and s.rubric = ''V2.1'';')
    ) as p(signature, find_text, replace_text)
  loop
    select pg_get_functiondef(patch.signature::regprocedure) into function_sql;
    if position(patch.replace_text in function_sql) > 0 then
      continue;
    end if;
    if length(function_sql) - length(replace(function_sql, patch.find_text, ''))
         <> length(patch.find_text) then
      raise exception 'Review function % differs from expected; rolling back', patch.signature;
    end if;
    execute replace(function_sql, patch.find_text, patch.replace_text);
  end loop;
end $$;

insert into public.scores_v21 (
  id, user_id, import_role, source, date, completion_date, course_version,
  type, level, lesson, class_id, teacher, country, done, camera, url,
  s, total, hl, issues, sugg, reasons, rubric, created_at, updated_at
)
select
  s.id, s.user_id, s.import_role, s.source, s.date, null::date, null::text,
  s.type, s.level, s.lesson, s.class_id, s.teacher, s.country, s.done, s.camera, s.url,
  s.s, s.total, s.hl, s.issues, s.sugg, s.reasons,
  coalesce(s.rubric, 'Unspecified'), s.created_at, s.updated_at
from public.scores s
where s.done = '完课' and array_length(s.s, 1) = 8 and s.total is not null
on conflict (id) do nothing;

do $$
declare expected_count bigint; copied_count bigint;
begin
  select count(*) into expected_count from public.scores
  where done = '完课' and array_length(s, 1) = 8 and total is not null;

  select count(*) into copied_count from public.scores s
    join public.scores_v21 n on n.id = s.id
  where s.done = '完课' and array_length(s.s, 1) = 8 and s.total is not null
    and n.completion_date is null and n.course_version is null
    and row(n.user_id, n.import_role, n.source, n.date, n.type, n.level,
            n.lesson, n.class_id, n.teacher, n.country, n.done, n.camera,
            n.url, n.s, n.total, n.hl, n.issues, n.sugg, n.reasons,
            n.rubric, n.created_at, n.updated_at)
        is not distinct from
        row(s.user_id, s.import_role, s.source, s.date, s.type, s.level,
            s.lesson, s.class_id, s.teacher, s.country, s.done, s.camera,
            s.url, s.s, s.total, s.hl, s.issues, s.sugg, s.reasons,
            coalesce(s.rubric, 'Unspecified'), s.created_at, s.updated_at);

  if copied_count <> expected_count then
    raise exception 'Verification failed: % of % source rows matched; rolling back',
      copied_count, expected_count;
  end if;
end $$;

commit;

select
  (select count(*) from public.scores where done = '完课'
    and array_length(s, 1) = 8 and total is not null) as v19_completed_scored,
  (select count(*) from public.scores s join public.scores_v21 n on n.id = s.id
    where s.done = '完课' and array_length(s.s, 1) = 8 and s.total is not null) as copied_to_v21,
  (select count(*) from public.scores_v21) as v21_total;
