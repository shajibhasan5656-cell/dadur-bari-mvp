import Link from "next/link";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { products } from "@/lib/db/schema";

async function deleteProduct(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  await getDb().update(products).set({ deletedAt: new Date(), updatedAt: new Date() }).where(eq(products.id, id));
  redirect("/admin/products");
}

export default async function DeleteProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product] = await getDb().select().from(products).where(eq(products.id, id)).limit(1);

  return (
    <main className="min-h-screen bg-[#F3EFE6] p-8 text-[#111111]">
      <form action={deleteProduct} className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/admin/products" className="text-sm font-semibold text-[#C8A45D]">← Back to Products</Link>
        <h1 className="mt-6 text-4xl font-bold text-red-700">Delete Product</h1>
        <p className="mt-4 text-black/60">Are you sure you want to delete this product?</p>
        <p className="mt-3 font-bold">{product?.name}</p>
        <input type="hidden" name="id" value={id} />
        <button className="mt-6 rounded bg-red-600 px-6 py-3 font-semibold text-white">Confirm Delete</button>
      </form>
    </main>
  );
}
