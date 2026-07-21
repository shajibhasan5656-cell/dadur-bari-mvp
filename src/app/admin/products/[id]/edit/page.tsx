import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";

async function updateProduct(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await getDb().update(products).set({
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    status: String(formData.get("status") || "draft") as any,
    price: Number(formData.get("price") || 0),
    fabric: String(formData.get("fabric") || ""),
    gsm: String(formData.get("gsm") || ""),
    description: String(formData.get("description") || ""),
    updatedAt: new Date(),
  }).where(eq(products.id, id));
  redirect("/admin/products");
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product] = await getDb().select().from(products).where(eq(products.id, id)).limit(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F3EFE6] p-8">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link href="/admin/products" className="mt-4 inline-block underline">Back</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] p-8 text-[#111111]">
      <form action={updateProduct} className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/admin/products" className="text-sm font-semibold text-[#C8A45D]">← Back to Products</Link>
        <h1 className="mt-6 text-4xl font-bold">Edit Product</h1>
        <input type="hidden" name="id" value={product.id} />

        <div className="mt-6 grid gap-4">
          <input name="name" defaultValue={product.name} className="rounded border p-3" placeholder="Name" />
          <input name="slug" defaultValue={product.slug} className="rounded border p-3" placeholder="Slug" />
          <select name="status" defaultValue={product.status ?? "draft"} className="rounded border p-3">
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="pre_order">Pre Order</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="hidden">Hidden</option>
            <option value="discontinued">Discontinued</option>
          </select>
          <input name="price" type="number" defaultValue={product.price ?? 0} className="rounded border p-3" placeholder="Price" />
          <input name="fabric" defaultValue={product.fabric ?? ""} className="rounded border p-3" placeholder="Fabric" />
          <input name="gsm" defaultValue={product.gsm ?? ""} className="rounded border p-3" placeholder="GSM" />
          <textarea name="description" defaultValue={product.description ?? ""} className="min-h-32 rounded border p-3" placeholder="Description" />
        </div>

        <button className="mt-6 rounded bg-[#111111] px-6 py-3 font-semibold text-white">Save Product</button>
      </form>
    </main>
  );
}
