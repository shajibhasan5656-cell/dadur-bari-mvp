import postgres from "postgres";

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing");
  }
  return postgres(process.env.DATABASE_URL, { ssl: "require" });
}

export async function ensureAdminItemsTable() {
  const sql = getSql();
  await sql`
    create table if not exists mvp_admin_items (
      id uuid primary key default gen_random_uuid(),
      type text not null,
      name text not null,
      slug text not null,
      description text,
      status text default 'active',
      meta jsonb default '{}'::jsonb,
      created_at timestamptz default now(),
      updated_at timestamptz default now(),
      unique(type, slug)
    )
  `;
  await sql.end();
}

export async function listAdminItems(type: string) {
  const sql = getSql();
  await ensureAdminItemsTable();
  const rows = await sql`
    select * from mvp_admin_items
    where type = ${type}
    order by created_at desc
  `;
  await sql.end();
  return rows;
}

export async function createOrUpdateAdminItem(type: string, data: {
  name: string;
  slug: string;
  description?: string;
  status?: string;
}) {
  const sql = getSql();
  await ensureAdminItemsTable();
  await sql`
    insert into mvp_admin_items (type, name, slug, description, status)
    values (${type}, ${data.name}, ${data.slug}, ${data.description || null}, ${data.status || "active"})
    on conflict (type, slug) do update set
      name = excluded.name,
      description = excluded.description,
      status = excluded.status,
      updated_at = now()
  `;
  await sql.end();
}

export async function deleteAdminItem(id: string) {
  const sql = getSql();
  await ensureAdminItemsTable();
  await sql`delete from mvp_admin_items where id = ${id}`;
  await sql.end();
}

export async function listActivityItems() {
  const sql = getSql();
  await ensureAdminItemsTable();
  const rows = await sql`
    select * from mvp_admin_items
    order by updated_at desc
    limit 100
  `;
  await sql.end();
  return rows;
}

export async function updateProductAdmin(data: {
  id: string;
  status: string;
  price: number;
  stock: number;
}) {
  const sql = getSql();

  await sql`
    update products
    set status = ${data.status},
        price = ${data.price},
        updated_at = now()
    where id = ${data.id}
  `;

  await sql`delete from inventory where product_id = ${data.id}`;

  await sql`
    insert into inventory (product_id, stock, low_stock_threshold)
    values (${data.id}, ${data.stock}, 5)
  `;

  await sql.end();
}
