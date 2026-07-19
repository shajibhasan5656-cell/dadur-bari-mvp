import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { ProductCard } from "@/components/product/ProductCard";
import { brandName, tagline } from "@/lib/brand";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] text-white">
        <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full border border-[#C8A45D] px-4 py-2 text-sm text-[#C8A45D]">
              Premium Custom Apparel
            </p>

            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
              {tagline}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              {brandName} creates premium custom printed T-shirts with durable
              DTF printing, comfortable fabric and a clean modern fashion
              experience.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#shop"
                className="rounded-md bg-[#C8A45D] px-8 py-4 text-center font-semibold text-[#111111] hover:bg-white"
              >
                Shop Collection
              </a>

              <a
                href="#quality"
                className="rounded-md border border-white px-8 py-4 text-center font-semibold text-white hover:bg-white hover:text-[#111111]"
              >
                Explore Quality
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 shadow-2xl">
            <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#F3EFE6] text-center text-[#111111]">
              <div>
                <p className="text-4xl font-bold">{brandName}</p>
                <p className="mt-3 text-lg">Premium DTF T-Shirts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quality" className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          eyebrow="Shop By Quality"
          title="Silver, Gold & Premium"
          description="Choose the quality category that matches your comfort, budget and premium fashion preference."
          center
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Silver Collection",
              text: "Entry level premium quality for everyday comfort.",
            },
            {
              title: "Gold Collection",
              text: "Most popular quality with better fabric and durable DTF print.",
            },
            {
              title: "Premium Collection",
              text: "Luxury feel with superior fabric, GSM and premium finish.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1"
            >
              <span className="rounded-full bg-[#111111] px-4 py-2 text-sm font-semibold text-white">
                {item.title.split(" ")[0]}
              </span>

              <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>

              <p className="mt-4 leading-7 text-black/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="shop" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
                Products
              </p>
              <h2 className="mt-3 text-4xl font-bold">Featured T-Shirts</h2>
            </div>

            <p className="text-black/60">
              Pre-order available. COD requires advance delivery charge.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="dtf" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
              DTF Printing
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              Durable Direct To Film Printing
            </h2>

            <p className="mt-6 leading-8 text-black/60">
              DTF printing delivers vibrant colors, strong durability, wash
              resistance and a clean premium finish for custom apparel.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Durable Print", "Wash Resistant", "Vibrant Colors", "Premium Finish"].map(
              (item) => (
                <div key={item} className="rounded-3xl bg-white p-6 shadow-lg">
                  <h3 className="text-xl font-bold">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/60">
                    Built for confidence, comfort and long-term use.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#111111] py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-bold">Contact {brandName}</h2>

          <div className="mt-6 space-y-2 text-white/70">
            <p>Phone: 01746-212501</p>
            <p>Email: dadur.bari.cloths@gmail.com</p>
            <p>Khetlal, Joypurhat, Rajshahi, Bangladesh</p>
          </div>

          <p className="mt-10 text-sm text-white/50">
            © 2026 {brandName}. {tagline}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
