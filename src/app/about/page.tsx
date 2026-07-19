import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { brandName, tagline } from "@/lib/brand";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C8A45D]">
            About Dadur Bari
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Premium custom apparel with purpose.</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold">A premium Bangladeshi apparel brand</h2>
            <p className="mt-4 text-lg leading-8 text-black/70">
              {brandName} is a premium Bangladeshi custom apparel brand focused on individuality,
              comfort, quality, and trust. We create meaningful custom T-shirts with thoughtful
              design and dependable service, built for people who want their clothes to feel as
              personal as their identity.
            </p>
            <p className="mt-4 text-lg leading-8 text-black/70">
              Our work is rooted in DTF printing, premium finishing, and a commitment to making
              each order feel personal and premium from the first click to final delivery.
            </p>
          </div>

          <div className="rounded-3xl border border-[#C8A45D]/30 bg-[#111111] p-8 text-white shadow-lg">
            <h3 className="text-xl font-semibold">What we stand for</h3>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-white/70">
              <li>• Individuality over mass production</li>
              <li>• Comfort, quality, and style in every piece</li>
              <li>• Trusted custom printing with clear communication</li>
              <li>• Premium apparel today, with fashion expansion ahead</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
