import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { categories, inventory, products, productVariants } from "@/lib/db/schema";

function normalizeStatus(value: string) {
  const normalized = value.toLowerCase();
  switch (normalized) {
    case "draft":
    case "active":
    case "hidden":
    case "out_of_stock":
    case "coming_soon":
    case "pre_order":
    case "discontinued":
      return normalized;
    default:
      return "draft";
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const slug = String(body?.slug ?? "").trim();
    const sku = String(body?.sku ?? "").trim();
    const shortDescription = String(body?.shortDescription ?? "").trim();
    const description = String(body?.description ?? "").trim();
    const status = normalizeStatus(String(body?.status ?? "draft"));
    const quality = String(body?.quality ?? "Premium").trim() || "Premium";
    const fabric = String(body?.fabric ?? "").trim();
    const gsm = String(body?.gsm ?? "").trim();
    const price = Number(body?.price ?? 0);
    const stock = Number(body?.stock ?? 0);
    const size = String(body?.size ?? "M").toUpperCase();
    const color = String(body?.color ?? "Black").trim();
    const isPreOrder = Boolean(body?.isPreOrder);

    if (!name || !slug || !sku) {
      return NextResponse.json({ success: false, error: "Name, slug and SKU are required." }, { status: 400 });
    }

    const db = getDb();
    const existingProduct = await db.select({ id: products.id }).from(products).where(eq(products.slug, slug));
    if (existingProduct[0]) {
      return NextResponse.json({ success: false, error: "A product with this slug already exists." }, { status: 409 });
    }

    const categoryRow = await db.select().from(categories).where(eq(categories.name, quality));
    const category = categoryRow[0];

    const productInsert = await db.insert(products).values({
      name,
      slug,
      status: status as "draft" | "active" | "hidden" | "out_of_stock" | "coming_soon" | "pre_order" | "discontinued",
      availability: isPreOrder ? "pre_order" : "available",
      categoryId: category?.id,
      price,
      description: description || shortDescription,
      fabric,
      gsm,
      seoTitle: name,
      seoDescription: shortDescription || description,
      isFeatured: false,
    }).returning({ id: products.id });

    const productId = productInsert[0]?.id;

    if (!productId) {
      return NextResponse.json({ success: false, error: "Unable to create product record." }, { status: 500 });
    }

    await db.insert(productVariants).values({
      productId,
      size,
      color,
      quality,
      fabric,
      gsm,
      price,
      stock,
      sku,
      isActive: true,
    });

    try {
      await db.insert(inventory).values({
        productId,
        stock,
        lowStockThreshold: 5,
      });
    } catch (inventoryError) {
      console.warn("Inventory insert skipped", inventoryError);
    }

    return NextResponse.json({ success: true, productId });
  } catch (error) {
    console.error("Create product error", error);
    return NextResponse.json({ success: false, error: "Unable to create product." }, { status: 500 });
  }
}
