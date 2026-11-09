-- Add course completion date and course/product version to the V2.1 platform.
-- Existing rows remain unchanged; completed rows without a date must supply it when edited.
begin;

alter table public.scores_v21 add column if not exists completion_date date;
alter table public.scores_v21 add column if not exists course_version text;
do $$ begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.scores_v21'::regclass and conname = 'scores_v21_completion_date_required') then
    alter table public.scores_v21 add constraint scores_v21_completion_date_required
      check (source <> 'web' or coalesce(done,'') <> '完课' or completion_date is not null) not valid;
  end if;
end $$;

alter table public.review_tasks_v21 add column if not exists completion_date date;
alter table public.review_tasks_v21 add column if not exists course_version text;

create or replace function public.review_task_course_fields_v21() returns trigger
language plpgsql security definer set search_path = public as $$
declare v_date date; v_version text;
begin
  if new.score_id is not null then
    select s.completion_date, s.course_version into v_date, v_version from scores_v21 s where s.id = new.score_id;
    new.completion_date := v_date; new.course_version := v_version;
  end if;
  return new;
end $$;
drop trigger if exists review_task_course_fields_v21 on public.review_tasks_v21;
create trigger review_task_course_fields_v21 before insert or update of score_id on public.review_tasks_v21
  for each row execute function public.review_task_course_fields_v21();

create or replace function public.score_course_fields_to_review_v21() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update review_tasks_v21 set completion_date = new.completion_date, course_version = new.course_version
    where score_id = new.id and status = 'open';
  return null;
end $$;
drop trigger if exists score_course_fields_to_review_v21 on public.scores_v21;
create trigger score_course_fields_to_review_v21 after update of completion_date, course_version on public.scores_v21
  for each row when (old.completion_date is distinct from new.completion_date or old.course_version is distinct from new.course_version)
  execute function public.score_course_fields_to_review_v21();

update public.review_tasks_v21 t
  set completion_date = s.completion_date, course_version = s.course_version
  from public.scores_v21 s
  where t.score_id = s.id
    and (t.completion_date is distinct from s.completion_date or t.course_version is distinct from s.course_version);

create or replace function public.my_review_tasks_v21() returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object('id',id,'task_date',task_date,'date',date,'completion_date',completion_date,'course_version',course_version,'type',type,'level',level,'lesson',lesson,
    'class_id',class_id,'teacher',teacher,'country',country,'url',url,'status',status,'done_at',done_at) order by task_date, created_at), '[]'::jsonb)
  from review_tasks_v21
  where (public.is_expert_v21() or public.is_admin()) and status <> 'cancelled'
    and (assigned_to is null or assigned_to = auth.uid() or public.is_admin())
    and (status = 'open' or task_date >= bj_today_v21() - 28)
$$;
revoke all on function public.review_task_course_fields_v21(), public.score_course_fields_to_review_v21() from public, anon, authenticated;
revoke all on function public.my_review_tasks_v21() from public, anon;
grant execute on function public.my_review_tasks_v21() to authenticated;

commit;
