"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const initialItems = [
  {
    id: "premium",
    name: "Premium Oversized T-Shirt",
    size: "L",
    category: "Premium",
    price: 799,
    quantity: 1
  },
  {
    id: "gold",
    name: "Gold Custom DTF T-Shirt",
    size: "XL",
    category: "Gold",
    price: 599,
    quantity: 1
  }
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const deliveryCharge = items.length ? 100 : 0;
  const total = subtotal + deliveryCharge;

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function updateQuantity(id: string, quantity: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
            <img src="/logo.png" alt="Dadur Bari Logo" className="h-10 w-10 rounded-full object-contain" />
            <span>Dadur Bari</span>
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/cart" className="text-[#C8A45D]">Cart</Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-extrabold">Shopping Cart</h1>
          <p className="mt-4 text-white/70">Review your products before checkout.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {items.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
              <h2 className="text-3xl font-bold">Your cart is empty</h2>
              <Link href="/shop" className="mt-6 inline-block rounded bg-[#111111] px-6 py-3 text-white">
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="rounded-3xl bg-white p-6 shadow-lg">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <p className="mt-2 text-black/60">{item.category} / Size {item.size}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded border px-3 py-1">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded border px-3 py-1">+</button>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-2xl font-bold">৳{item.price * item.quantity}</p>
                    <button onClick={() => removeItem(item.id)} className="mt-3 text-sm font-semibold text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>৳{subtotal}</span></div>
            <div className="flex justify-between"><span>Delivery Charge</span><span>৳{deliveryCharge}</span></div>
            <div className="border-t border-black/10 pt-4">
              <div className="flex justify-between text-xl font-bold"><span>Total</span><span>৳{total}</span></div>
            </div>
          </div>

          {items.length ? (
            <Link href="/checkout" className="mt-6 block rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]">
              Proceed to Checkout
            </Link>
          ) : null}

          <Link href="/shop" className="mt-3 block rounded-md border border-[#111111] px-6 py-4 text-center font-semibold hover:bg-[#111111] hover:text-white">
            Continue Shopping
          </Link>
        </aside>
      </section>
    </main>
  );
}
