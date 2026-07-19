import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { categories, collections, roles, siteSettings } from "../src/lib/db/schema";

config({ path: ".env.local" });

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured. Set it in .env.local before running seed.");
  }

  const client = postgres(process.env.DATABASE_URL, { ssl: "require" });
  const db = drizzle(client);

  const roleRows = [
    { name: "OWNER", description: "Owner of the business", isSystemRole: true },
    { name: "SUPER_ADMIN", description: "Full administrative access", isSystemRole: true },
    { name: "MANAGER", description: "Business operations manager", isSystemRole: true },
    { name: "INVENTORY_STAFF", description: "Inventory and stock management", isSystemRole: true },
    { name: "CUSTOMER_SUPPORT", description: "Customer support operations", isSystemRole: true },
    { name: "MARKETING_MANAGER", description: "Marketing and campaigns", isSystemRole: true },
    { name: "CONTENT_MANAGER", description: "Website content management", isSystemRole: true },
    { name: "CUSTOMER", description: "Regular customer account", isSystemRole: true },
  ];

  await db.insert(roles).values(roleRows).onConflictDoNothing();

  const siteSettingsRows = [
    { key: "brand_name", value: "Dadur Bari" },
    { key: "tagline", value: "Wear Your Identity." },
    { key: "business_phone", value: "01746-212501" },
    { key: "business_email", value: "dadur.bari.cloths@gmail.com" },
    { key: "delivery_inside_joypurhat", value: "100" },
    { key: "delivery_outside_joypurhat", value: "150" },
    { key: "primary_color", value: "#111111" },
    { key: "accent_color", value: "#C8A45D" },
    { key: "heritage_green", value: "#2E3A2F" },
    { key: "warm_ivory", value: "#F3EFE6" },
  ];

  await db.insert(siteSettings).values(siteSettingsRows).onConflictDoNothing();

  const categoryRows = [
    { name: "Silver", slug: "silver", description: "Entry-level premium quality" },
    { name: "Gold", slug: "gold", description: "Popular premium quality" },
    { name: "Premium", slug: "premium", description: "Luxury quality" },
  ];

  await db.insert(categories).values(categoryRows).onConflictDoNothing();

  const collectionRows = [
    { name: "Oversized", slug: "oversized", description: "Relaxed fit apparel" },
    { name: "Anime", slug: "anime", description: "Anime-inspired apparel" },
    { name: "Minimal", slug: "minimal", description: "Clean, minimal aesthetics" },
  ];

  await db.insert(collections).values(collectionRows).onConflictDoNothing();

  console.log("Seed data inserted successfully.");
  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
