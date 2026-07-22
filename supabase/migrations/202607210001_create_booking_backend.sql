create type public.reservation_status as enum ('pending', 'confirmed', 'cancelled');
create type public.subscriber_status as enum ('active', 'unsubscribed');
create type public.response_channel as enum ('email', 'sms');
create type public.experience_type as enum ('accommodation', 'dining', 'activities', 'events');

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email = lower(email) and char_length(email) <= 254),
  phone text not null check (char_length(phone) between 8 and 30),
  reservation_date date not null,
  reservation_time time not null,
  party_size integer not null check (party_size between 1 and 500),
  experience_type public.experience_type not null,
  special_requests text not null default '' check (char_length(special_requests) <= 4000),
  details jsonb not null default '{}'::jsonb check (jsonb_typeof(details) = 'object'),
  status public.reservation_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email) and char_length(email) <= 254),
  source text not null default 'website' check (char_length(source) <= 80),
  subscribed_at timestamptz not null default now(),
  status public.subscriber_status not null default 'active',
  updated_at timestamptz not null default now()
);

create table public.booking_responses (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  message text not null check (char_length(message) between 1 and 10000),
  sent_at timestamptz not null default now(),
  channel public.response_channel not null default 'email'
);

create index reservations_created_at_idx on public.reservations (created_at desc);
create index reservations_status_idx on public.reservations (status);
create index booking_responses_reservation_id_idx
  on public.booking_responses (reservation_id, sent_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger reservations_set_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

create trigger newsletter_subscribers_set_updated_at
before update on public.newsletter_subscribers
for each row execute function public.set_updated_at();

alter table public.reservations enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.booking_responses enable row level security;

create policy "Public may submit reservations"
on public.reservations for insert
to anon
with check (status = 'pending');

create policy "Staff may manage reservations"
on public.reservations for all
to authenticated
using (true)
with check (true);

create policy "Public may subscribe"
on public.newsletter_subscribers for insert
to anon
with check (status = 'active');

create policy "Staff may manage subscribers"
on public.newsletter_subscribers for all
to authenticated
using (true)
with check (true);

create policy "Staff may manage booking responses"
on public.booking_responses for all
to authenticated
using (true)
with check (true);

revoke all on public.reservations from anon;
revoke all on public.newsletter_subscribers from anon;
revoke all on public.booking_responses from anon;

grant insert (
  name,
  email,
  phone,
  reservation_date,
  reservation_time,
  party_size,
  experience_type,
  special_requests,
  details
) on public.reservations to anon;

grant insert (email, source) on public.newsletter_subscribers to anon;

grant select, insert, update, delete on public.reservations to authenticated;
grant select, insert, update, delete on public.newsletter_subscribers to authenticated;
grant select, insert, update, delete on public.booking_responses to authenticated;
