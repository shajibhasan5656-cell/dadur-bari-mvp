import Link from "next/link";
import {
  address,
  brandName,
  deliveryRules,
  paymentNumber,
  phone,
  productQualities,
  tagline,
} from "@/lib/brand";

const checklistItems = [
  "Check new Formspree submissions",
  "Verify payment manually",
  "Contact customer by phone",
  "Confirm order",
  "Send for printing",
  "Pack product",
  "Assign courier",
  "Update customer manually",
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#111111]">
            {brandName}
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium md:gap-6">
            <Link href="/" className="text-[#111111] hover:text-[#C8A45D]">
              Home
            </Link>
            <Link href="/shop" className="text-[#111111] hover:text-[#C8A45D]">
              Shop
            </Link>
            <Link href="/checkout" className="text-[#111111] hover:text-[#C8A45D]">
              Checkout
            </Link>
          </nav>
        </div>

        <div className="border-t border-black/5 bg-[#F3EFE6] px-4 py-2 text-center text-sm font-medium text-[#111111]">
          <span className="text-[#2E3A2F]">{tagline}</span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="rounded-[2rem] border border-[#C8A45D]/25 bg-white p-8 shadow-[0_20px_60px_rgba(17,17,17,0.08)] md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-[#C8A45D] bg-[#F3EFE6] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
                Temporary Admin Helper
              </p>
              <h1 className="mt-5 text-4xl font-bold text-[#111111] md:text-5xl">
                Dadur Bari MVP Admin
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-black/70">
                This page supports the current MVP order workflow while the full secure admin panel is prepared.
              </p>
            </div>

            <div className="rounded-2xl border border-[#111111]/10 bg-[#111111] px-5 py-4 text-sm text-white">
              <p className="font-semibold">Business contact</p>
              <p className="mt-2 text-white/70">{phone}</p>
              <p className="text-white/70">{address}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-black/10 bg-[#F3EFE6] p-8">
              <h2 className="text-2xl font-bold text-[#111111]">Order Management</h2>
              <p className="mt-4 leading-7 text-black/70">
                Current MVP orders are collected in Formspree. Review new submissions daily and keep the customer journey moving.
              </p>
              <a
                href="https://formspree.io/forms"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#C8A45D] px-5 py-3 font-semibold text-[#111111] transition hover:bg-[#111111] hover:text-white"
              >
                Open Formspree dashboard
              </a>
              <p className="mt-4 text-sm font-medium text-[#2E3A2F]">
                Open Formspree dashboard and check Dadur Bari Orders submissions.
              </p>
            </section>

            <section className="rounded-3xl border border-black/10 bg-white p-8">
              <h2 className="text-2xl font-bold text-[#111111]">Payment Information</h2>
              <div className="mt-5 space-y-3 text-black/75">
                <p>
                  <span className="font-semibold text-[#111111]">Payment number:</span> {paymentNumber}
                </p>
                <p>
                  <span className="font-semibold text-[#111111]">Supported methods:</span> bKash, Nagad, Rocket
                </p>
                <p>
                  <span className="font-semibold text-[#111111]">COD:</span> {deliveryRules.codAdvanceMessage}
                </p>
                <p>
                  <span className="font-semibold text-[#111111]">Manual step:</span> Admin must manually verify transaction ID before confirmation.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-black/10 bg-white p-8">
              <h2 className="text-2xl font-bold text-[#111111]">Delivery Rules</h2>
              <div className="mt-5 space-y-4 text-black/75">
                <div className="rounded-2xl bg-[#F3EFE6] p-4">
                  <p className="font-semibold text-[#111111]">Inside Joypurhat</p>
                  <p>100 BDT</p>
                  <p>1–2 days</p>
                </div>
                <div className="rounded-2xl bg-[#F3EFE6] p-4">
                  <p className="font-semibold text-[#111111]">Outside Joypurhat</p>
                  <p>150 BDT</p>
                  <p>2–4 days</p>
                </div>
                <div className="rounded-2xl bg-[#F3EFE6] p-4">
                  <p className="font-semibold text-[#111111]">Couriers</p>
                  <p>Steadfast, Sundarban</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-black/10 bg-[#111111] p-8 text-white">
              <h2 className="text-2xl font-bold">Product Quality Rules</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {productQualities.map((quality) => (
                  <div key={quality} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <p className="font-semibold text-[#C8A45D]">{quality}</p>
                    <p className="mt-2 text-sm text-white/75">
                      Each quality may have different fabric, GSM, price and features.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-8">
            <h2 className="text-2xl font-bold text-[#111111]">Quick Action Checklist</h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {checklistItems.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-[#F3EFE6] p-4 text-black/75">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#C8A45D] text-sm font-semibold text-[#111111]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-3xl border border-[#C8A45D]/30 bg-[#F3EFE6] p-6 text-center">
            <p className="text-lg font-semibold text-[#111111]">
              This is a temporary MVP admin page. Full secure admin panel will be built in final SRS implementation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
