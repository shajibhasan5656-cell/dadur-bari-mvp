import Link from "next/link";

const products = [
  {
    slug: "premium-oversized-tshirt",
    name: "Premium Oversized T-Shirt",
    price: 799,
    oldPrice: 999,
    category: "Premium",
    badge: "Pre Order",
    description: "Luxury feel, premium fabric and durable DTF printing."
  },
  {
    slug: "gold-custom-dtf-tshirt",
    name: "Gold Custom DTF T-Shirt",
    price: 599,
    oldPrice: 749,
    category: "Gold",
    badge: "Best Seller",
    description: "Most popular quality for daily premium comfort."
  },
  {
    slug: "silver-everyday-tshirt",
    name: "Silver Everyday T-Shirt",
    price: 449,
    oldPrice: 549,
    category: "Silver",
    badge: "New",
    description: "Entry level premium T-shirt for everyday use."
  }
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold">
            Dadur Bari
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-[#C8A45D]">
              Home
            </Link>
            <Link href="/shop" className="text-[#C8A45D]">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-[#C8A45D]">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#111111] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
            Dadur Bari
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
            <div
              key={product.slug}
              className="rounded-3xl border border-black/10 bg-white p-5 shadow-lg transition hover:-translate-y-1"
            >
              <Link href={`/product/${product.slug}`}>
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#F3EFE6] p-6 text-center">
                  <p className="text-xl font-bold">{product.name}</p>
                </div>
              </Link>

              <div className="mt-5">
                <span className="rounded-full bg-[#C8A45D] px-3 py-1 text-xs font-semibold">
                  {product.badge}
                </span>

                <h3 className="mt-4 text-xl font-bold">{product.name}</h3>

                <p className="mt-1 text-sm text-black/50">
                  {product.category} Collection
                </p>

                <p className="mt-3 text-sm leading-6 text-black/60">
                  {product.description}
                </p>

                <div className="mt-4 flex items-end gap-3">
                  <p className="text-2xl font-bold">৳{product.price}</p>
                  <p className="text-sm text-black/40 line-through">
                    ৳{product.oldPrice}
                  </p>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  className="mt-5 block rounded-md bg-[#111111] px-5 py-3 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}