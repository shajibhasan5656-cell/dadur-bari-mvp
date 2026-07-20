import Link from "next/link";
import { redirect } from "next/navigation";
import { readAdminSession } from "@/lib/auth/admin-session";
import { getDb } from "@/lib/db";
import { categories, collections, inventory, products, productVariants } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

export default async function AdminProductsPage() {
  const session = await readAdminSession();

  if (!session) {
    redirect("/admin-login");
  }

  const db = getDb();
  const productRows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      status: products.status,
      price: products.price,
      createdAt: products.createdAt,
      categoryName: categories.name,
      collectionName: collections.name,
    })
    .from(products)
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .leftJoin(collections, eq(collections.id, products.collectionId))
    .orderBy(products.createdAt);

  const productIds = productRows.map((row) => row.id);
  const variantRows = productIds.length
    ? await db.select().from(productVariants).where(inArray(productVariants.productId, productIds))
    : [];
  const inventoryRows = productIds.length
    ? await db.select().from(inventory).where(inArray(inventory.productId, productIds))
    : [];

  const variantStockMap = new Map<string, number>();
  const variantSkuMap = new Map<string, string>();
  for (const variant of variantRows) {
    if (!variant.productId) {
      continue;
    }

    const currentStock = variantStockMap.get(variant.productId) ?? 0;
    variantStockMap.set(variant.productId, currentStock + Number(variant.stock ?? 0));

    if (!variantSkuMap.has(variant.productId) && variant.sku) {
      variantSkuMap.set(variant.productId, variant.sku);
    }
  }

  const inventoryStockMap = new Map<string, number>();
  for (const item of inventoryRows) {
    if (item.productId) {
      inventoryStockMap.set(item.productId, Number(item.stock ?? 0));
    }
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] p-6 text-[#111111] md:p-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(17,17,17,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C8A45D]">Admin</p>
            <h1 className="mt-3 text-3xl font-bold">Products</h1>
            <p className="mt-3 max-w-2xl text-base leading-8 text-black/70">
              Manage the Dadur Bari catalog with database-backed product records, variants, and inventory.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2E3A2F]"
          >
            Add Product
          </Link>
        </div>

        {productRows.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-black/20 bg-[#F3EFE6] p-10 text-center">
            <h2 className="text-xl font-semibold">No products yet</h2>
            <p className="mt-3 text-black/70">Create the first product to begin the final SRS catalog foundation.</p>
          </div>
        ) : (
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#111111] text-white">
                <tr>
                  <th className="rounded-tl-2xl px-4 py-3">Product</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Category / Quality</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Pre-order</th>
                  <th className="rounded-tr-2xl px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((product) => {
                  const stock = inventoryStockMap.get(product.id) ?? variantStockMap.get(product.id) ?? 0;
                  const sku = variantSkuMap.get(product.id) ?? "—";
                  const isPreOrder = product.status === "pre_order" || (product.status === "active" && Number(stock) === 0);
                  return (
                    <tr key={product.id} className="border-b border-black/10 bg-white">
                      <td className="px-4 py-4 font-semibold">{product.name}</td>
                      <td className="px-4 py-4">{sku}</td>
                      <td className="px-4 py-4 capitalize">{product.status}</td>
                      <td className="px-4 py-4">{product.categoryName ?? "—"}</td>
                      <td className="px-4 py-4">{product.price} BDT</td>
                      <td className="px-4 py-4">{stock}</td>
                      <td className="px-4 py-4">{isPreOrder ? "Yes" : "No"}</td>
                      <td className="px-4 py-4">{product.createdAt ? new Date(product.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
