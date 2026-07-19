import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { tagline } from "@/lib/brand";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C8A45D]">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Your data is handled with care.</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-base leading-8 text-black/70">
            Dadur Bari collects only the necessary information required to process your order and
            support your request. This may include your name, phone number, email address, delivery
            address, and relevant order or payment details.
          </p>
          <p className="mt-4 text-base leading-8 text-black/70">
            We use your information only for order processing, customer support, and communication
            related to your purchase. Dadur Bari does not sell customer data to third parties.
          </p>
          <p className="mt-4 text-base leading-8 text-black/70">
            Customers may request updates or deletion of their information where applicable and where
            the request is operationally possible.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
