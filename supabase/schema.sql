-- CodeSharp - cloud progress sync schema.
--
-- Run this once in your Supabase project's SQL Editor
-- (https://supabase.com/dashboard/project/_/sql/new). It is idempotent, so
-- it's safe to run again if you change something and re-run it.
--
-- This is the ONLY thing that needs the Supabase dashboard / SQL Editor.
-- The app itself only ever talks to Supabase through the anon key, which is
-- restricted by the Row Level Security policies defined below: a signed-in
-- user can only ever read or write their own row.

create table if not exists public.game_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  trail text not null check (trail in ('csharp', 'qa')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, trail)
);

-- Widen the trail check to include 'java' (added when the Java track shipped).
-- Safe to re-run: drops the old constraint (whether it allowed 2 or 3 trails)
-- and recreates it with the current full list, on both fresh and existing tables.
alter table public.game_progress drop constraint if exists game_progress_trail_check;
alter table public.game_progress add constraint game_progress_trail_check
  check (trail in ('csharp', 'qa', 'java'));

alter table public.game_progress enable row level security;

drop policy if exists "Users can read their own progress" on public.game_progress;
create policy "Users can read their own progress"
  on public.game_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own progress" on public.game_progress;
create policy "Users can insert their own progress"
  on public.game_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own progress" on public.game_progress;
create policy "Users can update their own progress"
  on public.game_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own progress" on public.game_progress;
create policy "Users can delete their own progress"
  on public.game_progress for delete
  using (auth.uid() = user_id);

-- Keep updated_at current on every write, without relying on the client.
create or replace function public.set_game_progress_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_game_progress_updated_at on public.game_progress;
create trigger set_game_progress_updated_at
  before update on public.game_progress
  for each row
  execute function public.set_game_progress_updated_at();
