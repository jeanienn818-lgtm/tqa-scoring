-- V2.1 score classification only. No score values or V1.9 objects are changed.
begin;

create table if not exists public.trial_score_labels_v21 (
  score_id uuid primary key references public.scores_v21(id) on delete cascade,
  is_trial boolean not null,
  set_by uuid not null references auth.users(id) default auth.uid(),
  set_at timestamptz not null default now()
);
alter table public.trial_score_labels_v21 enable row level security;
revoke all on public.trial_score_labels_v21 from anon;
grant select on public.trial_score_labels_v21 to authenticated;
drop policy if exists trial_score_labels_read_v21 on public.trial_score_labels_v21;
create policy trial_score_labels_read_v21 on public.trial_score_labels_v21 for select to authenticated using (
  public.is_admin() or public.is_expert_v21() or
  exists (select 1 from public.scores_v21 s where s.id = score_id and s.user_id = auth.uid())
);

drop policy if exists trial_periods_read_v21 on public.trial_periods_v21;
create policy trial_periods_read_v21 on public.trial_periods_v21 for select to authenticated using (
  public.is_admin() or public.is_expert_v21() or user_id = auth.uid()
);

create or replace function public.is_trial_score_v21(p_score uuid)
returns boolean language plpgsql stable security definer set search_path = public as $$
declare v_trial boolean;
begin
  select l.is_trial into v_trial from trial_score_labels_v21 l where l.score_id = p_score;
  if found then return v_trial; end if;
  return exists (
    select 1 from scores_v21 s join trial_periods_v21 p on p.user_id = s.user_id
    where s.id = p_score and s.rubric = 'V2.1' and s.import_role is null
      and s.created_at >= p.started_at and (p.ended_at is null or s.created_at < p.ended_at)
  );
end $$;

create or replace function public.set_trial_score_v21(p_score uuid, p_trial boolean)
returns void language plpgsql security definer set search_path = public as $$
declare v_score scores_v21;
begin
  if not public.is_admin() then raise exception '只有管理员可以标记试打记录'; end if;
  select * into v_score from scores_v21 where id = p_score;
  if not found or v_score.rubric <> 'V2.1' or v_score.import_role is not null or v_score.user_id is null or
    not exists(select 1 from members m where m.user_id = v_score.user_id and m.compare_role = 'regular') then
    raise exception '只能标记 V2.1 打分者的记录';
  end if;
  insert into trial_score_labels_v21(score_id,is_trial,set_by,set_at)
  values(p_score,p_trial,auth.uid(),now())
  on conflict(score_id) do update set is_trial = excluded.is_trial, set_by = excluded.set_by, set_at = excluded.set_at;
end $$;

revoke all on function public.set_trial_score_v21(uuid,boolean) from public, anon;
grant execute on function public.set_trial_score_v21(uuid,boolean) to authenticated;
revoke all on function public.is_trial_score_v21(uuid) from public, anon, authenticated;

commit;
