import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { address, email, paymentNumber, phone, tagline } from "@/lib/brand";

const contactCards = [
  {
    title: "Phone",
    value: phone,
    description: "Call for order support and payment confirmation.",
  },
  {
    title: "Email",
    value: email,
    description: "Reach us for questions, custom requests, and support.",
  },
  {
    title: "Address",
    value: address,
    description: "Visit or send orders to our official location.",
  },
  {
    title: "Payment Number",
    value: paymentNumber,
    description: "Use this number for bKash, Nagad, Rocket, or COD coordination.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C8A45D]">
            Contact Us
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">We are here to help.</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {contactCards.map((card) => (
            <div key={card.title} className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-lg font-medium text-[#111111]">{card.value}</p>
              <p className="mt-2 text-sm leading-7 text-black/70">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-[#C8A45D]/30 bg-[#111111] p-8 text-white shadow-lg">
          <h2 className="text-2xl font-semibold">Support channels</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Phone</p>
              <p className="mt-2 text-sm text-white/70">{phone}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Email</p>
              <p className="mt-2 text-sm text-white/70">{email}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold">Social</p>
              <p className="mt-2 text-sm text-white/70">Facebook • Instagram</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
