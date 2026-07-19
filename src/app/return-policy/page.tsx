import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { tagline } from "@/lib/brand";

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C8A45D]">
            Return Policy
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Clear return and exchange standards.</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold">Returns accepted</h2>
            <ul className="mt-4 space-y-3 text-base leading-8 text-black/70">
              <li>• Wrong product sent by the company</li>
              <li>• Wrong size sent by the company</li>
              <li>• Printing defect</li>
              <li>• Manufacturing defect</li>
              <li>• Company mistake</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold">Returns not accepted</h2>
            <ul className="mt-4 space-y-3 text-base leading-8 text-black/70">
              <li>• Customer changed mind</li>
              <li>• Wrong size selected by the customer</li>
              <li>• Color expectation difference</li>
              <li>• Normal wear after use</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#C8A45D]/30 bg-[#111111] p-8 text-white shadow-lg">
          <h2 className="text-2xl font-semibold">Exchange and approval</h2>
          <p className="mt-4 text-base leading-8 text-white/70">
            Exchange is allowed only for company error. All return or exchange requests are reviewed
            and approved by the admin team based on the situation and available evidence.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
