import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { tagline } from "@/lib/brand";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C8A45D]">
            Terms & Conditions
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Simple terms for a premium experience.</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-base leading-8 text-black/70">
            Customers must provide correct order and delivery information to ensure smooth processing.
            Product images and colors may appear slightly different due to screen and printing variations.
          </p>
          <p className="mt-4 text-base leading-8 text-black/70">
            Pre-order production begins after order confirmation. Cancellation is allowed before printing starts.
            Payment verification is required before production moves forward.
          </p>
          <p className="mt-4 text-base leading-8 text-black/70">
            Dadur Bari may update its policies when needed to reflect business operations and customer support requirements.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
