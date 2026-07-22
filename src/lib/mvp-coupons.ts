import postgres from "postgres";

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing");
  }
  return postgres(process.env.DATABASE_URL, { ssl: "require" });
}

export async function ensureCouponsTable() {
  const sql = getSql();
  await sql`
    create table if not exists mvp_coupons (
      id uuid primary key default gen_random_uuid(),
      code text unique not null,
      type text default 'fixed',
      value integer default 0,
      minimum_order integer default 0,
      active boolean default true,
      created_at timestamptz default now()
    )
  `;
  await sql.end();
}

export async function getCoupons() {
  const sql = getSql();
  await ensureCouponsTable();
  const rows = await sql`select * from mvp_coupons order by created_at desc`;
  await sql.end();
  return rows;
}

export async function createCoupon(data: {
  code: string;
  type: string;
  value: number;
  minimumOrder: number;
}) {
  const sql = getSql();
  await ensureCouponsTable();
  await sql`
    insert into mvp_coupons (code, type, value, minimum_order, active)
    values (${data.code}, ${data.type}, ${data.value}, ${data.minimumOrder}, true)
    on conflict (code) do update set
      type = excluded.type,
      value = excluded.value,
      minimum_order = excluded.minimum_order,
      active = true
  `;
  await sql.end();
}
