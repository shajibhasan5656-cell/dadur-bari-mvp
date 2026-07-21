import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-[#F3EFE6] p-8 text-[#111111]">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/admin/products" className="text-sm font-semibold text-[#C8A45D]">← Back to Products</Link>
        <h1 className="mt-6 text-4xl font-bold">Delete Product</h1>
        <p className="mt-4 text-black/60">Product ID: {id}</p>
        <p className="mt-4 text-black/60">This action page is prepared for the final SRS database workflow.</p>
      </div>
    </main>
  );
}
