-- Adiciona um código único e sequencial (ex: BV00001) a cada veículo, gerado
-- automaticamente pelo banco de dados em toda inserção nova (painel admin,
-- formulário público de anúncio, ou scripts SQL).
-- Rode no Supabase Dashboard -> SQL Editor -> New query -> Run.

create sequence if not exists public.vehicles_code_seq start 1;

alter table public.vehicles
  add column if not exists code text;

-- Preenche o código dos veículos que já existem no banco.
update public.vehicles
set code = 'BV' || lpad(nextval('public.vehicles_code_seq')::text, 5, '0')
where code is null;

-- A partir daqui, todo INSERT novo já recebe um código automaticamente.
alter table public.vehicles
  alter column code set default ('BV' || lpad(nextval('public.vehicles_code_seq')::text, 5, '0'));

alter table public.vehicles
  alter column code set not null;

create unique index if not exists vehicles_code_key on public.vehicles(code);
