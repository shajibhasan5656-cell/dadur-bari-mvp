import fs from "node:fs";
import postgres from "postgres";

function getDatabaseUrl() {
  const envText = fs.readFileSync(".env.local", "utf8");
  const line = envText
    .split(/\r?\n/)
    .find((item) => item.startsWith("DATABASE_URL="));

  if (!line) {
    throw new Error("DATABASE_URL not found in .env.local");
  }

  return line.replace("DATABASE_URL=", "").trim();
}

async function main() {
  const sql = postgres(getDatabaseUrl(), { ssl: "require" });

  const items = [
    {
      name: "Premium Oversized T-Shirt",
      slug: "premium-oversized-tshirt",
      price: 799,
      description: "Luxury oversized T-shirt with premium fabric, comfortable fit and durable DTF printing.",
      fabric: "Premium Cotton",
      gsm: "220 GSM"
    },
    {
      name: "Gold Custom DTF T-Shirt",
      slug: "gold-custom-dtf-tshirt",
      price: 599,
      description: "Most popular Dadur Bari T-shirt with balanced quality, comfort and durable DTF printing.",
      fabric: "Soft Cotton",
      gsm: "190 GSM"
    },
    {
      name: "Silver Everyday T-Shirt",
      slug: "silver-everyday-tshirt",
      price: 449,
      description: "Entry level premium T-shirt for everyday use with clean design and comfortable fabric.",
      fabric: "Comfort Cotton",
      gsm: "170 GSM"
    }
  ];

  for (const item of items) {
    await sql`
      insert into products (name, slug, status, availability, price, description, fabric, gsm)
      values (${item.name}, ${item.slug}, 'active', 'pre_order', ${item.price}, ${item.description}, ${item.fabric}, ${item.gsm})
      on conflict (slug) do update set
        name = excluded.name,
        status = 'active',
        availability = 'pre_order',
        price = excluded.price,
        description = excluded.description,
        fabric = excluded.fabric,
        gsm = excluded.gsm,
        deleted_at = null,
        updated_at = now()
    `;
  }

  const rows = await sql`
    select id, name, slug, status, price, deleted_at
    from products
    order by name
  `;

  console.log(rows);

  await sql.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
