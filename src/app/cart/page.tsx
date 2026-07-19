import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { deliveryRules } from "@/lib/brand";

const cartItems = [
  {
    name: "Premium Oversized T-Shirt",
    size: "L",
    category: "Premium",
    price: 799,
    quantity: 1,
  },
  {
    name: "Gold Custom DTF T-Shirt",
    size: "XL",
    category: "Gold",
    price: 599,
    quantity: 1,
  },
];

const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

const deliveryCharge = deliveryRules.insideJoypurhat.charge;
const total = subtotal + deliveryCharge;

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <Header />

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-extrabold">Shopping Cart</h1>
          <p className="mt-4 text-white/70">
            Review your selected Dadur Bari products before checkout.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="mt-2 text-black/60">
                    {item.category} Collection / Size {item.size}
                  </p>
                  <p className="mt-2 text-black/60">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-2xl font-bold">৳{item.price}</p>
                  <button className="mt-3 text-sm text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{subtotal}</span>
            </div>

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

          <Link
            href="/checkout"
            className="mt-6 block rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
          >
            Proceed to Checkout
          </Link>

          <Link
            href="/shop"
            className="mt-3 block rounded-md border border-[#111111] px-6 py-4 text-center font-semibold hover:bg-[#111111] hover:text-white"
          >
            Continue Shopping
          </Link>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
