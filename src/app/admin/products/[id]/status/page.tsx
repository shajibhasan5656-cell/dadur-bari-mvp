import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";

async function updateStatus(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status") || "draft");
  await getDb().update(products).set({ status: status as any, updatedAt: new Date() }).where(eq(products.id, id));
  redirect("/admin/products");
}

export default async function ProductStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product] = await getDb().select().from(products).where(eq(products.id, id)).limit(1);

  return (
    <main className="min-h-screen bg-[#F3EFE6] p-8 text-[#111111]">
      <form action={updateStatus} className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/admin/products" className="text-sm font-semibold text-[#C8A45D]">← Back to Products</Link>
        <h1 className="mt-6 text-4xl font-bold">Update Status</h1>
        <p className="mt-3 text-black/60">{product?.name}</p>
        <input type="hidden" name="id" value={id} />
        <select name="status" defaultValue={product?.status ?? "draft"} className="mt-6 w-full rounded border p-3">
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="pre_order">Pre Order</option>
          <option value="out_of_stock">Out of Stock</option>
          <option value="hidden">Hidden</option>
          <option value="discontinued">Discontinued</option>
        </select>
        <button className="mt-6 rounded bg-[#111111] px-6 py-3 font-semibold text-white">Update Status</button>
      </form>
    </main>
  );
}
