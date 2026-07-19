import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { getProductBySlug } from "@/lib/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F3EFE6] p-10 text-[#111111]">
        <Header />
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl font-bold">Product Not Found</h1>
          <Link href="/shop" className="mt-6 inline-block underline">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#F3EFE6] p-10 text-center">
            <div>
              <p className="text-4xl font-bold">Dadur Bari</p>
              <p className="mt-3 text-xl">{product.name}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <span className="rounded-full bg-[#C8A45D] px-4 py-2 text-sm font-semibold text-[#111111]">
            {product.badge}
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            {product.name}
          </h1>

          <p className="mt-4 text-lg leading-8 text-black/60">
            {product.description}
          </p>

          <div className="mt-6 flex items-end gap-4">
            <p className="text-4xl font-bold">৳{product.price}</p>
            <p className="text-xl text-black/40 line-through">
              ৳{product.oldPrice}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#F3EFE6] p-4">
              <p className="text-sm text-black/50">Category</p>
              <p className="font-bold">{product.category}</p>
            </div>

            <div className="rounded-2xl bg-[#F3EFE6] p-4">
              <p className="text-sm text-black/50">Fabric</p>
              <p className="font-bold">{product.fabric}</p>
            </div>

            <div className="rounded-2xl bg-[#F3EFE6] p-4">
              <p className="text-sm text-black/50">GSM</p>
              <p className="font-bold">{product.gsm}</p>
            </div>

            <div className="rounded-2xl bg-[#F3EFE6] p-4">
              <p className="text-sm text-black/50">Print Type</p>
              <p className="font-bold">{product.printType}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 font-semibold">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="rounded-md border border-black/20 px-5 py-3 font-semibold hover:bg-[#111111] hover:text-white"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/cart"
              className="rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
            >
              Add to Cart
            </Link>

            <Link
              href="/checkout"
              className="rounded-md border border-[#111111] px-6 py-4 text-center font-semibold hover:bg-[#111111] hover:text-white"
            >
              Buy Now
            </Link>
          </div>

          <div className="mt-8 rounded-2xl bg-[#F3EFE6] p-5 text-sm leading-7 text-black/70">
            <p>✓ Premium DTF Printing</p>
            <p>{`✓ ${product.deliveryInfo}`}</p>
            <p>✓ COD Available — Advance Delivery Charge Required</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
