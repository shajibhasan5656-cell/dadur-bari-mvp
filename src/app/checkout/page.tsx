import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { deliveryRules, paymentMethods, paymentNumber } from "@/lib/brand";

const orderItems = [
  { name: "Premium Oversized T-Shirt", price: 799 },
  { name: "Gold Custom DTF T-Shirt", price: 599 },
];

const subtotal = orderItems.reduce((total, item) => total + item.price, 0);
const deliveryCharge = deliveryRules.insideJoypurhat.charge;
const total = subtotal + deliveryCharge;

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-extrabold">Checkout</h1>
          <p className="mt-4 text-white/70">
            Complete your Dadur Bari order securely.
          </p>
        </div>
      </section>

      <form
        action="https://formspree.io/f/mqerqlyw"
        method="POST"
        className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_380px]"
      >
        <input type="hidden" name="_subject" value="New Dadur Bari Order" />
        <input
          type="hidden"
          name="order_items"
          value="Premium Oversized T-Shirt + Gold Custom DTF T-Shirt"
        />
        <input type="hidden" name="order_total" value="1498 BDT" />

        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Customer Information</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                name="full_name"
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Full Name"
                required
              />
              <input
                name="phone"
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Phone Number"
                required
              />
              <input
                name="email"
                type="email"
                className="rounded-md border border-black/10 px-4 py-3 md:col-span-2"
                placeholder="Email Optional"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Delivery Address</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                name="district"
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="District"
                required
              />
              <input
                name="area"
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Area"
                required
              />
              <textarea
                name="address"
                className="min-h-28 rounded-md border border-black/10 px-4 py-3 md:col-span-2"
                placeholder="Full Address"
                required
              />
            </div>

            <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4 text-sm leading-7">
              <p>{`Inside Joypurhat Delivery Charge: ৳${deliveryRules.insideJoypurhat.charge}`}</p>
              <p>{`Outside Joypurhat Delivery Charge: ৳${deliveryRules.outsideJoypurhat.charge}`}</p>
              <p>{`Delivery Time: ${deliveryRules.insideJoypurhat.days} / ${deliveryRules.outsideJoypurhat.days}`}</p>
              <p className="font-semibold text-[#111111]">{deliveryRules.codAdvanceMessage}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Payment Method</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <label
                  key={method}
                  className="rounded-2xl border border-black/10 p-4"
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method}
                    className="mr-2"
                    required
                  />
                  <span className="font-bold">{method}</span>
                </label>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4 text-sm leading-7">
              <p>
                Payment Number: <strong>{paymentNumber}</strong>
              </p>
              <p>{deliveryRules.codAdvanceMessage}</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                name="transaction_id"
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Transaction ID"
              />
              <input
                name="sender_number"
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="Sender Number Optional"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Order Notes</h2>
            <textarea
              name="order_notes"
              className="mt-5 min-h-24 w-full rounded-md border border-black/10 px-4 py-3"
              placeholder="Any special instruction?"
            />
          </div>
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            {orderItems.map((item) => (
              <div key={item.name} className="flex justify-between">
                <span>{item.name}</span>
                <span>৳{item.price}</span>
              </div>
            ))}

            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>৳{deliveryCharge}</span>
            </div>

            <div className="border-t border-black/10 pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
          >
            Place Order
          </button>

          <p className="mt-4 text-xs leading-6 text-black/50">
            By placing this order, you confirm that your information is correct.
            Payment will be manually verified by Dadur Bari.
          </p>
        </aside>
      </form>

      <Footer />
    </main>
  );
}
