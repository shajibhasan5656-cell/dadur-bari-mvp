import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { deliveryRules, tagline } from "@/lib/brand";

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C8A45D]">
            Shipping Policy
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Reliable delivery with clear logistics.</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold">Courier partners</h2>
            <ul className="mt-4 space-y-3 text-base leading-8 text-black/70">
              <li>• Steadfast</li>
              <li>• Sundarban</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold">Delivery charges</h2>
            <ul className="mt-4 space-y-3 text-base leading-8 text-black/70">
              <li>{`• Inside Joypurhat: ${deliveryRules.insideJoypurhat.days} • ৳${deliveryRules.insideJoypurhat.charge}`}</li>
              <li>{`• Outside Joypurhat: ${deliveryRules.outsideJoypurhat.days} • ৳${deliveryRules.outsideJoypurhat.charge}`}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[#C8A45D]/30 bg-[#111111] p-8 text-white shadow-lg">
          <h2 className="text-2xl font-semibold">Important delivery notes</h2>
          <p className="mt-4 text-base leading-8 text-white/70">
            Delivery charge may be updated in the future as the business grows. COD is available
            only when the delivery charge is paid in advance.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
