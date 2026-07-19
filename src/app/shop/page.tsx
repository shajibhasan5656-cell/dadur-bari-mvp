import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { brandName } from "@/lib/brand";
import { products } from "@/lib/products";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
            {brandName}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold">
            Shop Our Collection
          </h1>
          <p className="mt-5 max-w-2xl text-white/70">
            Premium custom apparel crafted for comfort, confidence and identity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">All Products</h2>
            <p className="mt-2 text-black/60">
              Choose Silver, Gold or Premium quality.
            </p>
          </div>

          <div className="rounded-md bg-white px-4 py-3 text-sm shadow">
            COD Available — Advance Delivery Charge Required
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
