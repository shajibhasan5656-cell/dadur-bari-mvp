import Link from "next/link";
import { getProductBySlug } from "@/lib/products-db";
import AddToCartButton from "@/components/cart/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product: any = null;

  try {
    product = await getProductBySlug(slug);
  } catch {
    product = null;
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F3EFE6] p-10 text-[#111111]">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <Link href="/shop" className="mt-6 inline-block underline">
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
            <img
              src="/logo.png"
              alt="Dadur Bari Logo"
              className="h-10 w-10 rounded-full object-contain"
            />
            <span>Dadur Bari</span>
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </div>
      </header>

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
          <span className="rounded-full bg-[#C8A45D] px-4 py-2 text-sm font-semibold">
            {product.isPreOrder ? "Pre Order" : product.status}
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight">
            {product.name}
          </h1>

          <p className="mt-4 text-lg leading-8 text-black/60">
            {product.description ||
              "Premium Dadur Bari custom apparel with durable DTF printing."}
          </p>

          <div className="mt-6 flex items-end gap-4">
            <p className="text-4xl font-bold">৳{product.price ?? 0}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Info label="Category" value={product.categoryName ?? "Dadur Bari"} />
            <Info label="Fabric" value={product.fabric ?? "Premium Cotton"} />
            <Info label="GSM" value={product.gsm ?? "Editable"} />
            <Info label="Print Type" value="DTF Printing" />
          </div>

          <div className="mt-8">
            <p className="mb-3 font-semibold">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {["M", "L", "XL", "XXL"].map((size) => (
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
            <AddToCartButton product={product} />

            <Link
              href="/checkout"
              className="rounded-md border border-[#111111] px-6 py-4 text-center font-semibold hover:bg-[#111111] hover:text-white"
            >
              Buy Now
            </Link>
          </div>

          <div className="mt-8 rounded-2xl bg-[#F3EFE6] p-5 text-sm leading-7 text-black/70">
            <p>✓ Premium DTF Printing</p>
            <p>✓ Inside Joypurhat: 1–2 Days, ৳100</p>
            <p>✓ Outside Joypurhat: 2–4 Days, ৳150</p>
            <p>✓ COD Available — Advance Delivery Charge Required</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#F3EFE6] p-4">
      <p className="text-sm text-black/50">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
