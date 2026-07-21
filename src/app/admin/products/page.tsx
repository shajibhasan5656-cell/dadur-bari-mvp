import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-db";

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await getPublishedProducts();
  } catch {
    products = [];
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] p-8 text-[#111111]">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link href="/admin" className="text-sm font-semibold text-[#C8A45D]">← Back to Admin</Link>
            <h1 className="mt-4 text-4xl font-bold">Products</h1>
            <p className="mt-2 text-black/60">Database-backed product management foundation.</p>
          </div>
          <Link href="/admin/products/new" className="rounded-full bg-[#111111] px-6 py-3 font-semibold text-white">
            Add Product
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3">Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Category</th>
                <th>Price</th>
                <th>Pre Order</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td className="py-6 text-black/60" colSpan={6}>No products found. Run seed or add product.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3 font-semibold">{product.name}</td>
                    <td>{product.slug}</td>
                    <td>{product.status}</td>
                    <td>{product.categoryName ?? "-"}</td>
                    <td>৳{product.price ?? 0}</td>
                    <td>{product.isPreOrder ? "Yes" : "No"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
