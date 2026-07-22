"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const products = [
  {
    name: "Premium Oversized T-Shirt",
    slug: "premium-oversized-tshirt",
    price: 799,
    category: "Premium",
    fabric: "Premium Cotton",
    gsm: "220 GSM"
  },
  {
    name: "Gold Custom DTF T-Shirt",
    slug: "gold-custom-dtf-tshirt",
    price: 599,
    category: "Gold",
    fabric: "Soft Cotton",
    gsm: "190 GSM"
  },
  {
    name: "Silver Everyday T-Shirt",
    slug: "silver-everyday-tshirt",
    price: 449,
    category: "Silver",
    fabric: "Comfort Cotton",
    gsm: "170 GSM"
  }
];

export default function CheckoutPage() {
  const [selectedSlug, setSelectedSlug] = useState("premium-oversized-tshirt");
  const [size, setSize] = useState("L");
  const [quantity, setQuantity] = useState(1);
  const [district, setDistrict] = useState("Joypurhat");
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const product = products.find((item) => item.slug === selectedSlug) || products[0];

  const deliveryCharge =
    district.trim().toLowerCase() === "joypurhat" ? 100 : 150;

  const subtotal = product.price * quantity;
  const total = subtotal + deliveryCharge;

  const orderDetails = useMemo(() => {
    return `${product.name} | Category: ${product.category} | Size: ${size} | Quantity: ${quantity} | Fabric: ${product.fabric} | GSM: ${product.gsm}`;
  }, [product, size, quantity]);

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      _subject: "New Dadur Bari Order",
      full_name: formData.get("full_name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      district,
      area: formData.get("area"),
      address: formData.get("address"),
      payment_method: paymentMethod,
      transaction_id: formData.get("transaction_id"),
      sender_number: formData.get("sender_number"),
      order_notes: formData.get("order_notes"),
      order_items: orderDetails,
      order_product: product.name,
      order_category: product.category,
      order_size: size,
      order_quantity: quantity,
      order_unit_price: `${product.price} BDT`,
      delivery_charge: `${deliveryCharge} BDT`,
      order_total: `${total} BDT`
    };

    try {
      const res = await fetch("https://formspree.io/f/mqerqlyw", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Order submit failed. Please try again.");
      }

      window.location.href = "/checkout/success";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order submit failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold">
            Dadur Bari
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-[#C8A45D]">Home</Link>
            <Link href="/shop" className="hover:text-[#C8A45D]">Shop</Link>
            <Link href="/cart" className="hover:text-[#C8A45D]">Cart</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-extrabold">Checkout</h1>
          <p className="mt-4 text-white/70">
            Review your order details before placing order.
          </p>
        </div>
      </section>

      <form
        onSubmit={submitOrder}
        className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_390px]"
      >
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Select Product</h2>

            <div className="mt-6 grid gap-4">
              <select
                value={selectedSlug}
                onChange={(event) => setSelectedSlug(event.target.value)}
                className="rounded-md border border-black/10 px-4 py-3"
              >
                {products.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name} — ৳{item.price}
                  </option>
                ))}
              </select>

              <div>
                <p className="mb-3 font-semibold">Select Size</p>
                <div className="flex flex-wrap gap-3">
                  {["M", "L", "XL", "XXL"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSize(item)}
                      className={
                        size === item
                          ? "rounded-md bg-[#111111] px-5 py-3 font-semibold text-white"
                          : "rounded-md border border-black/20 px-5 py-3 font-semibold"
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(1, Number(event.target.value)))
                  }
                  className="w-full rounded-md border border-black/10 px-4 py-3"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Customer Information</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input name="full_name" required className="rounded-md border border-black/10 px-4 py-3" placeholder="Full Name" />
              <input name="phone" required className="rounded-md border border-black/10 px-4 py-3" placeholder="Phone Number" />
              <input name="email" type="email" className="rounded-md border border-black/10 px-4 py-3 md:col-span-2" placeholder="Email Optional" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Delivery Address</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                required
                className="rounded-md border border-black/10 px-4 py-3"
                placeholder="District"
              />
              <input name="area" required className="rounded-md border border-black/10 px-4 py-3" placeholder="Area" />
              <textarea name="address" required className="min-h-28 rounded-md border border-black/10 px-4 py-3 md:col-span-2" placeholder="Full Address" />
            </div>

            <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4 text-sm leading-7">
              <p>Inside Joypurhat: ৳100, 1–2 days</p>
              <p>Outside Joypurhat: ৳150, 2–4 days</p>
              <p>Current delivery charge: ৳{deliveryCharge}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Payment Method</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {["bKash", "Nagad", "Rocket", "Cash On Delivery"].map((method) => (
                <label
                  key={method}
                  className={
                    paymentMethod === method
                      ? "rounded-2xl border-2 border-[#C8A45D] bg-[#F3EFE6] p-4"
                      : "rounded-2xl border border-black/10 p-4"
                  }
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="mr-2"
                  />
                  <span className="font-bold">{method}</span>
                </label>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#F3EFE6] p-4 text-sm leading-7">
              <p>Payment Number: <strong>01746-212501</strong></p>
              <p>COD available only if delivery charge is paid in advance.</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input name="transaction_id" className="rounded-md border border-black/10 px-4 py-3" placeholder="Transaction ID" />
              <input name="sender_number" className="rounded-md border border-black/10 px-4 py-3" placeholder="Sender Number Optional" />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-bold">Order Notes</h2>
            <textarea name="order_notes" className="mt-5 min-h-24 w-full rounded-md border border-black/10 px-4 py-3" placeholder="Any special instruction?" />
          </div>

          {error ? (
            <div className="rounded-md bg-red-50 p-4 text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <p className="font-bold">{product.name}</p>
              <p className="mt-1 text-black/60">{product.category} Collection</p>
              <p className="text-black/60">Size: {size}</p>
              <p className="text-black/60">Fabric: {product.fabric}</p>
              <p className="text-black/60">GSM: {product.gsm}</p>
            </div>

            <div className="flex justify-between">
              <span>Unit Price</span>
              <span>৳{product.price}</span>
            </div>

            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>

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

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111] disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <p className="mt-4 text-xs leading-6 text-black/50">
            Please review product, size, quantity, delivery and payment before placing order.
          </p>
        </aside>
      </form>
    </main>
  );
}
