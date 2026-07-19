import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { tagline } from "@/lib/brand";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Choose your product, add it to the cart, and complete checkout with your contact and delivery details. Our team will verify your payment and confirm the order.",
  },
  {
    question: "What is DTF printing?",
    answer:
      "DTF printing is a modern direct-to-film printing process that delivers sharp, vibrant, and durable prints on custom apparel.",
  },
  {
    question: "Is Cash on Delivery available?",
    answer:
      "Yes, COD is available when the delivery charge is paid in advance. This helps ensure smooth delivery and order confirmation.",
  },
  {
    question: "Why do I need to pay delivery charge in advance for COD?",
    answer:
      "Advance payment for the delivery charge helps us secure the delivery process and avoid order confusion for COD requests.",
  },
  {
    question: "What is delivery time?",
    answer:
      "Inside Joypurhat takes 1–2 days and outside Joypurhat takes 2–4 days depending on courier movement.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Returns are accepted only for company mistakes such as wrong product, wrong size, printing defect, or manufacturing defects. Exchanges are allowed only for company errors.",
  },
  {
    question: "What sizes are available?",
    answer:
      "Our initial available sizes are M, L, XL, and XXL. Additional sizes may be added as the collection expands.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C8A45D]">
            FAQ
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Questions about orders, printing, and delivery.</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="space-y-6">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-xl font-semibold">{item.question}</h2>
              <p className="mt-3 text-base leading-8 text-black/70">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
