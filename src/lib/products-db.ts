import { eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { categories, collections, products, productVariants, inventory } from "@/lib/db/schema";

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  status: string;
  categoryName?: string | null;
  collectionName?: string | null;
  price: number;
  fabric?: string | null;
  gsm?: string | null;
  stock: number;
  isPreOrder: boolean;
  createdAt: Date | null;
}

export async function getPublishedProducts(): Promise<ProductListItem[]> {
  try {
    const db = getDb();
    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        status: products.status,
        price: products.price,
        fabric: products.fabric,
        gsm: products.gsm,
        createdAt: products.createdAt,
        categoryName: categories.name,
        collectionName: collections.name,
      })
      .from(products)
      .leftJoin(categories, eq(categories.id, products.categoryId))
      .leftJoin(collections, eq(collections.id, products.collectionId))
      .where(eq(products.status, "active"));

    const productIds = rows.map((row) => row.id);
    const variantRows = productIds.length
      ? await db.select().from(productVariants).where(inArray(productVariants.productId, productIds))
      : [];
    const inventoryRows = productIds.length
      ? await db.select().from(inventory).where(inArray(inventory.productId, productIds))
      : [];

    const inventoryMap = new Map<string, number>();
    inventoryRows.forEach((row) => {
      if (row.productId) {
        inventoryMap.set(row.productId, Number(row.stock ?? 0));
      }
    });

    const variantMap = new Map<string, number>();
    variantRows.forEach((row) => {
      if (row.productId) {
        const current = variantMap.get(row.productId) ?? 0;
        variantMap.set(row.productId, current + Number(row.stock ?? 0));
      }
    });

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      status: row.status ?? "draft",
      categoryName: row.categoryName ?? null,
      collectionName: row.collectionName ?? null,
      price: Number(row.price ?? 0),
      fabric: row.fabric,
      gsm: row.gsm,
      stock: inventoryMap.get(row.id) ?? variantMap.get(row.id) ?? 0,
      isPreOrder: (row.status ?? "") === "pre_order",
      createdAt: row.createdAt,
    }));
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductListItem | null> {
  try {
    const db = getDb();
    const rows = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        status: products.status,
        price: products.price,
        fabric: products.fabric,
        gsm: products.gsm,
        createdAt: products.createdAt,
        categoryName: categories.name,
        collectionName: collections.name,
      })
      .from(products)
      .leftJoin(categories, eq(categories.id, products.categoryId))
      .leftJoin(collections, eq(collections.id, products.collectionId))
      .where(eq(products.slug, slug));

    const row = rows[0];

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      status: row.status ?? "draft",
      categoryName: row.categoryName ?? null,
      collectionName: row.collectionName ?? null,
      price: Number(row.price ?? 0),
      fabric: row.fabric,
      gsm: row.gsm,
      stock: 0,
      isPreOrder: (row.status ?? "") === "pre_order",
      createdAt: row.createdAt,
    };
  } catch {
    return null;
  }
}
