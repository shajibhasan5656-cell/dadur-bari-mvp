import AdminShell from "@/components/admin/AdminShell";
import { getPublishedProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const products = await getPublishedProducts();

  return (
    <AdminShell title="Inventory" description="Product stock and availability overview.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Product</th>
              <th>Status</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Pre Order</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-black/60">No products found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="py-3 font-semibold">{p.name}</td>
                  <td>{p.status}</td>
                  <td>৳{p.price}</td>
                  <td>{p.stock}</td>
                  <td>{p.isPreOrder ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
