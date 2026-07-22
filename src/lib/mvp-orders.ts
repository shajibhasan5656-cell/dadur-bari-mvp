import postgres from "postgres";

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL missing");
  }
  return postgres(process.env.DATABASE_URL, { ssl: "require" });
}

export async function ensureOrdersTable() {
  const sql = getSql();
  await sql`
    create table if not exists mvp_orders (
      id uuid primary key default gen_random_uuid(),
      full_name text not null,
      phone text not null,
      email text,
      district text not null,
      area text not null,
      address text not null,
      payment_method text not null,
      transaction_id text,
      sender_number text,
      order_notes text,
      order_items text not null,
      order_product text,
      order_category text,
      order_size text,
      order_quantity integer default 1,
      order_unit_price text,
      delivery_charge text,
      order_total text not null,
      status text default 'pending',
      payment_status text default 'awaiting_verification',
      created_at timestamptz default now()
    )
  `;
  await sql.end();
}

export async function createMvpOrder(data: any) {
  const sql = getSql();
  await ensureOrdersTable();
  const [order] = await sql`
    insert into mvp_orders (
      full_name, phone, email, district, area, address,
      payment_method, transaction_id, sender_number, order_notes,
      order_items, order_product, order_category, order_size,
      order_quantity, order_unit_price, delivery_charge, order_total
    )
    values (
      ${data.full_name}, ${data.phone}, ${data.email || null},
      ${data.district}, ${data.area}, ${data.address},
      ${data.payment_method}, ${data.transaction_id || null},
      ${data.sender_number || null}, ${data.order_notes || null},
      ${data.order_items}, ${data.order_product || null},
      ${data.order_category || null}, ${data.order_size || null},
      ${Number(data.order_quantity || 1)}, ${data.order_unit_price || null},
      ${data.delivery_charge || null}, ${data.order_total}
    )
    returning *
  `;
  await sql.end();
  return order;
}

export async function getMvpOrders() {
  const sql = getSql();
  await ensureOrdersTable();
  const rows = await sql`
    select * from mvp_orders
    order by created_at desc
  `;
  await sql.end();
  return rows;
}
