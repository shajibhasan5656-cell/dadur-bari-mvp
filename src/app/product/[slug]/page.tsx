import Link from "next/link";
import { getProductBySlug } from "@/lib/products-db";
import { makeCartUrl } from "@/lib/cart-url";
import AddToCartButton from "@/components/cart/AddToCartButton";
import SizeSelector from "@/components/product/SizeSelector";

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
        <Link href="/shop" className="mt-6 inline-block underline">Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold"><img src="/logo.png" alt="Dadur Bari Logo" className="h-10 w-10 rounded-full object-contain" /> <span>Dadur Bari</span></Link>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <AddToCartButton product={product} />
            <Link href="/checkout" className="rounded-md border border-[#111111] px-6 py-4 text-center font-semibold hover:bg-[#111111] hover:text-white">
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
