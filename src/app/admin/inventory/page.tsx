import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getPublishedProducts } from "@/lib/products-db";
import { updateProductAdmin } from "@/lib/mvp-admin-data";

export const dynamic = "force-dynamic";

async function updateInventoryAction(formData: FormData) {
  "use server";

  await updateProductAdmin({
    id: String(formData.get("id")),
    status: String(formData.get("status") || "active"),
    price: Number(formData.get("price") || 0),
    stock: Number(formData.get("stock") || 0),
  });

  redirect("/admin/inventory");
}

export default async function InventoryPage() {
  const products = await getPublishedProducts();

  return (
    <AdminShell title="Inventory" description="Edit product price, status and stock.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Product</th>
              <th>Current</th>
              <th>Edit Status</th>
              <th>Edit Price</th>
              <th>Edit Stock</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-black/60">No products found.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 font-semibold">{product.name}</td>
                  <td>
                    Status: {product.status}
                    <br />
                    Price: ৳{product.price}
                    <br />
                    Stock: {product.stock}
                  </td>
                  <td colSpan={4}>
                    <form action={updateInventoryAction} className="grid gap-2 md:grid-cols-4">
                      <input type="hidden" name="id" value={product.id} />
                      <select name="status" defaultValue={product.status} className="rounded border p-2">
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="pre_order">Pre Order</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="hidden">Hidden</option>
                      </select>
                      <input name="price" type="number" defaultValue={product.price} className="rounded border p-2" />
                      <input name="stock" type="number" defaultValue={product.stock} className="rounded border p-2" />
                      <button className="rounded bg-[#111111] px-4 py-2 font-semibold text-white">Save</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
