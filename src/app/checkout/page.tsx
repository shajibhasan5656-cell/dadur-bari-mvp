import Link from "next/link";

export default function CheckoutPage() {
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
            <Link href="/shop" className="hover:text-[#C8A45D]">
              Shop
            </Link>
            <Link href="/cart" className="hover:text-[#C8A45D]">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-extrabold">Checkout</h1>
          <p className="mt-4 text-white/70">
            Complete your Dadur Bari order securely.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Customer Information</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Full Name"
              />
              <input
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Phone Number"
              />
              <input
                className="rounded-md border border-black/10 px-4 py-3 md:col-span-2"
                placeholder="Email Optional"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Delivery Address</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="District"
              />
              <input
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Area"
              />
              <textarea
                className="min-h-28 rounded-md border border-black/10 px-4 py-3 md:col-span-2"
                placeholder="Full Address"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4 text-sm leading-7">
              <p>Inside Joypurhat Delivery Charge: ৳100</p>
              <p>Outside Joypurhat Delivery Charge: ৳150</p>
              <p>Delivery Time: 1–4 Days</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Payment Method</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {["bKash", "Nagad", "Rocket", "Cash On Delivery"].map(
                (method) => (
                  <div
                    key={method}
                    className="rounded-2xl border border-black/10 p-4"
                  >
                    <p className="font-bold">{method}</p>
                  </div>
                )
              )}
            </div>

            <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4 text-sm leading-7">
              <p>
                Payment Number: <strong>01746-212501</strong>
              </p>
              <p>
                COD Available — Delivery charge must be paid in advance.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Transaction ID"
              />
              <input
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Sender Number Optional"
              />
            </div>
          </div>
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Premium Oversized T-Shirt</span>
              <span>৳799</span>
            </div>

            <div className="flex justify-between">
              <span>Gold Custom DTF T-Shirt</span>
              <span>৳599</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>৳100</span>
            </div>

            <div className="border-t border-black/10 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>৳1498</span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout/success"
            className="mt-6 block rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
          >
            Place Order
          </Link>

          <p className="mt-4 text-xs leading-6 text-black/50">
            By placing this order, you confirm that your information is correct.
            Payment will be manually verified by Dadur Bari.
          </p>
        </aside>
      </section>
    </main>
  );
}