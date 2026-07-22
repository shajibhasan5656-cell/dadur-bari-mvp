import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-db";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let products: any[] = [];

  try {
    products = await getPublishedProducts();
  } catch {
    products = [];
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold"><img src="/logo.png" alt="Dadur Bari Logo" className="h-10 w-10 rounded-full object-contain" /> <span>Dadur Bari</span></Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop" className="text-[#C8A45D]">Shop</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#111111] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">Dadur Bari</p>
          <h1 className="mt-4 text-5xl font-extrabold">Shop Our Collection</h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Premium custom apparel crafted for comfort, confidence and identity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">All Products</h2>
          <p className="mt-2 text-black/60">Products are now loaded from database.</p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <h3 className="text-2xl font-bold">No products found</h3>
            <p className="mt-3 text-black/60">Run seed or add products from admin panel.</p>
            <Link href="/admin/products/new" className="mt-6 inline-block rounded bg-[#111111] px-6 py-3 text-white">
              Add Product
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="rounded-3xl border border-black/10 bg-white p-5 shadow-lg transition hover:-translate-y-1">
                <Link href={`/product/${product.slug}`}>
                  <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#F3EFE6] p-6 text-center">
                    <p className="text-xl font-bold">{product.name}</p>
                  </div>
                </Link>

                <div className="mt-5">
                  <span className="rounded-full bg-[#C8A45D] px-3 py-1 text-xs font-semibold">
                    {product.isPreOrder ? "Pre Order" : product.status}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm text-black/50">{product.categoryName ?? "Dadur Bari"} Collection</p>
                  <p className="mt-4 text-2xl font-bold">৳{product.price ?? 0}</p>

                  <Link href={`/product/${product.slug}`} className="mt-5 block rounded-md bg-[#111111] px-5 py-3 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]">
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
