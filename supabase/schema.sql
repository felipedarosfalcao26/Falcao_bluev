-- BlueV — schema inicial do Supabase
-- Rode este arquivo inteiro em: Supabase Dashboard -> SQL Editor -> New query -> Run
--
-- Modelo de permissao adotado: nao ha cadastro publico de usuarios (login e
-- somente para a equipe BlueV via /admin). Por isso, qualquer sessao
-- autenticada (auth.role() = 'authenticated') e tratada como administradora.
-- Nao crie usuarios no Supabase Auth alem da equipe BlueV.

create extension if not exists "pgcrypto";

-- =========================================================
-- CHARGERS
-- =========================================================
create table if not exists public.chargers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  latitude double precision not null,
  longitude double precision not null,
  address text not null,
  city text not null,
  state text not null,
  power numeric not null,
  current text not null check (current in ('AC', 'DC')),
  speed text not null check (speed in ('Padrao', 'Rapido', 'Ultrarrapido')),
  connectors text[] not null default '{}',
  points integer not null default 1,
  status text not null default 'Disponivel'
    check (status in ('Disponivel', 'Ocupado', 'Manutencao', 'Offline')),
  operator text not null default 'BlueV',
  location_type text not null,
  price text,
  hours text not null default '24 horas',
  rating numeric not null default 5,
  image text not null default 'charger',
  created_at timestamptz not null default now()
);

alter table public.chargers enable row level security;

create policy "chargers_select_public" on public.chargers
  for select using (true);

create policy "chargers_write_admin" on public.chargers
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- =========================================================
-- VEHICLES
-- =========================================================
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  brand text not null,
  model text not null,
  year integer not null,
  mileage_km integer not null default 0,
  price numeric not null,
  city text not null,
  state text not null,
  type text not null check (type in ('100% eletrico', 'Hibrido plug-in', 'Hibrido')),
  autonomy_km integer not null default 0,
  battery_kwh numeric not null default 0,
  power_hp integer not null default 0,
  charge_time_hours numeric not null default 0,
  connector text not null default 'Tipo 2',
  description text not null default '',
  features text[] not null default '{}',
  seller_name text not null,
  seller_type text not null default 'Particular'
    check (seller_type in ('Particular', 'Concessionaria', 'BlueV Certificado')),
  featured boolean not null default false,
  status text not null default 'Pendente moderacao'
    check (status in ('Disponivel', 'Reservado', 'Vendido', 'Pendente moderacao')),
  created_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;

-- Visitantes só veem anúncios já aprovados (Disponivel); admins veem tudo.
create policy "vehicles_select_public" on public.vehicles
  for select using (status = 'Disponivel');

create policy "vehicles_select_admin" on public.vehicles
  for select using (auth.role() = 'authenticated');

-- Formulário público "Anunciar veículo" só pode criar como pendente de moderação.
create policy "vehicles_insert_public" on public.vehicles
  for insert with check (status = 'Pendente moderacao');

create policy "vehicles_update_admin" on public.vehicles
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "vehicles_delete_admin" on public.vehicles
  for delete using (auth.role() = 'authenticated');

-- =========================================================
-- VEHICLE IMAGES
-- =========================================================
create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.vehicle_images enable row level security;

create policy "vehicle_images_select_public" on public.vehicle_images
  for select using (true);

-- Permite anexar fotos a um anúncio recém-criado (ainda pendente) pelo formulário público.
create policy "vehicle_images_insert_public" on public.vehicle_images
  for insert with check (
    exists (
      select 1 from public.vehicles v
      where v.id = vehicle_id and v.status = 'Pendente moderacao'
    )
    or auth.role() = 'authenticated'
  );

create policy "vehicle_images_update_admin" on public.vehicle_images
  for update using (auth.role() = 'authenticated');

create policy "vehicle_images_delete_admin" on public.vehicle_images
  for delete using (auth.role() = 'authenticated');

-- =========================================================
-- BLOG POSTS
-- =========================================================
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text[] not null default '{}',
  image text,
  category text not null,
  author text not null default 'Equipe BlueV',
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled')),
  published_at timestamptz,
  read_minutes integer not null default 5,
  seo_title text,
  seo_description text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "blog_posts_select_public" on public.blog_posts
  for select using (status = 'published' and published_at <= now());

create policy "blog_posts_select_admin" on public.blog_posts
  for select using (auth.role() = 'authenticated');

create policy "blog_posts_write_admin" on public.blog_posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- =========================================================
-- LEADS
-- =========================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('instalacao', 'contato', 'veiculo-interesse', 'anuncio-veiculo')),
  name text not null,
  email text not null,
  phone text not null,
  message text,
  source text not null default '',
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Qualquer visitante (via formulários do site) pode criar um lead, mas não ler/editar.
create policy "leads_insert_public" on public.leads
  for insert with check (true);

create policy "leads_select_admin" on public.leads
  for select using (auth.role() = 'authenticated');

create policy "leads_delete_admin" on public.leads
  for delete using (auth.role() = 'authenticated');

-- =========================================================
-- STORAGE (fotos de veículos, carregadores e blog)
-- =========================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_select_public" on storage.objects
  for select using (bucket_id = 'media');

create policy "media_insert_public" on storage.objects
  for insert with check (bucket_id = 'media');

create policy "media_delete_admin" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
