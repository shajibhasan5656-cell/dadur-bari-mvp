import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { categories, collections, inventory, productVariants, products, roles, siteSettings } from "../src/lib/db/schema";

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

  const categoryLookup = await db.select().from(categories);
  const collectionLookup = await db.select().from(collections);

  const sampleProducts = [
    {
      name: "Premium Oversized T-Shirt",
      slug: "premium-oversized-t-shirt",
      sku: "DB-PREM-001",
      category: "Premium",
      collection: "Oversized",
      fabric: "Premium Cotton Blend",
      gsm: "260",
      price: 1390,
      stock: 24,
      status: "active",
      isPreOrder: false,
      description: "Premium oversized tee with a refined streetwear finish.",
    },
    {
      name: "Gold Custom DTF T-Shirt",
      slug: "gold-custom-dtf-t-shirt",
      sku: "DB-GOLD-001",
      category: "Gold",
      collection: "Minimal",
      fabric: "Soft Cotton",
      gsm: "220",
      price: 1190,
      stock: 18,
      status: "active",
      isPreOrder: false,
      description: "Gold-tier custom apparel built for premium everyday use.",
    },
    {
      name: "Silver Everyday T-Shirt",
      slug: "silver-everyday-t-shirt",
      sku: "DB-SILV-001",
      category: "Silver",
      collection: "Minimal",
      fabric: "Comfort Cotton",
      gsm: "180",
      price: 990,
      stock: 30,
      status: "active",
      isPreOrder: true,
      description: "Entry-level premium tee for comfort and everyday style.",
    },
  ];

  for (const product of sampleProducts) {
    const category = categoryLookup.find((entry) => entry.name === product.category);
    const collection = collectionLookup.find((entry) => entry.name === product.collection);
    const existing = await db.select().from(products).where((productsTable) => productsTable.slug === product.slug);
    if (existing[0]) {
      continue;
    }

    const insertedProducts = await db.insert(products).values({
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      status: product.status as "draft" | "active" | "hidden" | "out_of_stock" | "coming_soon" | "pre_order" | "discontinued",
      availability: product.isPreOrder ? "pre_order" : "available",
      categoryId: category?.id,
      collectionId: collection?.id,
      price: product.price,
      description: product.description,
      fabric: product.fabric,
      gsm: product.gsm,
      seoTitle: product.name,
      seoDescription: product.description,
      isFeatured: product.category === "Premium",
    }).returning({ id: products.id });

    const createdProduct = insertedProducts[0];
    if (!createdProduct) {
      continue;
    }

    const sizes = ["M", "L", "XL", "XXL"];
    for (const size of sizes) {
      await db.insert(productVariants).values({
        productId: createdProduct.id,
        size,
        color: "Black",
        quality: product.category,
        fabric: product.fabric,
        gsm: product.gsm,
        price: product.price,
        stock: product.stock,
        sku: `${product.sku}-${size}`,
        isActive: true,
      });
    }

    await db.insert(inventory).values({
      productId: createdProduct.id,
      stock: product.stock,
      lowStockThreshold: 5,
    });
  }

  console.log("Seed data inserted successfully.");
  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
