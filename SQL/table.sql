-- Inventory Management System ki tables
--
-- Supabase Dashboard -> SQL Editor -> New query me ye poora file paste karke Run karein.
-- Ek bar chalana hai. Dobara chalayenge to "already exists" error aayega, wo theek hai.

-- Stock: har product ki ek line. Purchase se quantity barhti hai, sell se kam hoti hai.
create table products (
  id bigint generated always as identity primary key,
  name text not null unique,
  quantity integer not null default 0,
  price numeric not null default 0,
  created_at timestamptz not null default now()
);

-- Har purchase ki ek line, total quantity x price hota hai
create table purchases (
  id bigint generated always as identity primary key,
  po_number integer not null,
  supplier_name text not null,
  product_name text not null,
  quantity integer not null,
  price numeric not null,
  total_price numeric not null,
  product_status text not null,
  created_at timestamptz not null default now()
);

-- Har sale ki ek line
create table sales (
  id bigint generated always as identity primary key,
  customer_name text not null,
  phone text not null,
  product_name text not null,
  quantity integer not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: sirf logged in user in tables ko parh aur likh sake.
-- RLS on karne ke baad bina policy ke koi bhi kuch nahi kar sakta, is liye
-- har table par ek policy chahiye.
alter table products enable row level security;
alter table purchases enable row level security;
alter table sales enable row level security;

create policy "logged in users can do everything"
  on products for all to authenticated
  using (true) with check (true);

create policy "logged in users can do everything"
  on purchases for all to authenticated
  using (true) with check (true);

create policy "logged in users can do everything"
  on sales for all to authenticated
  using (true) with check (true);