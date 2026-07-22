"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  quantity: number;
};

const CART_KEY = "dadur_bari_cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let current = readCart();

    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");

    if (product) {
      const name = params.get("name") || "Dadur Bari Product";
      const category = params.get("category") || "Dadur Bari";
      const size = params.get("size") || "L";
      const price = Number(params.get("price") || 0);

      const existing = current.find(
        (item) => item.id === product && item.size === size
      );

      if (existing) {
        current = current.map((item) =>
          item.id === product && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        current.push({
          id: product,
          name,
          category,
          size,
          price,
          quantity: 1
        });
      }

      saveCart(current);
      window.history.replaceState({}, "", "/cart");
    }

    setItems(current);
    setLoaded(true);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const deliveryCharge = items.length ? 100 : 0;
  const total = subtotal + deliveryCharge;

  function updateQuantity(id: string, size: string, quantity: number) {
    const next = items.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );

    setItems(next);
    saveCart(next);
  }

  function removeItem(id: string, size: string) {
    const next = items.filter((item) => !(item.id === id && item.size === size));
    setItems(next);
    saveCart(next);
  }

  function clearCart() {
    setItems([]);
    saveCart([]);
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#F3EFE6] p-10 text-[#111111]">
        Loading cart...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 text-2xl font-bold">
            <img
              src="/logo.png"
              alt="Dadur Bari Logo"
              className="h-10 w-10 rounded-full object-contain"
            />
            <span>Dadur Bari</span>
          </Link>

          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/cart" className="text-[#C8A45D]">
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#111111] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-extrabold">Shopping Cart</h1>
          <p className="mt-4 text-white/70">
            Review your products before checkout.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          {items.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
              <h2 className="text-3xl font-bold">Your cart is empty</h2>
              <p className="mt-3 text-black/60">
                Add products from shop or product page.
              </p>
              <Link
                href="/shop"
                className="mt-6 inline-block rounded bg-[#111111] px-6 py-3 text-white"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{item.name}</h2>
                    <p className="mt-2 text-black/60">
                      {item.category} Collection / Size {item.size}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="rounded border px-4 py-2 font-bold"
                      >
                        -
                      </button>

                      <span className="min-w-8 text-center font-bold">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="rounded border px-4 py-2 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-sm text-black/50">
                      Unit: ৳{item.price}
                    </p>
                    <p className="text-2xl font-bold">
                      ৳{item.price * item.quantity}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.size)}
                      className="mt-3 text-sm font-semibold text-red-600"
                    >
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
            <div className="flex justify-between">
              <span>Items</span>
              <span>{items.length}</span>
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

          {items.length ? (
            <>
              <Link
                href="/checkout"
                className="mt-6 block rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
              >
                Proceed to Checkout
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full rounded-md border border-red-600 px-6 py-4 text-center font-semibold text-red-600"
              >
                Clear Cart
              </button>
            </>
          ) : null}

          <Link
            href="/shop"
            className="mt-3 block rounded-md border border-[#111111] px-6 py-4 text-center font-semibold hover:bg-[#111111] hover:text-white"
          >
            Continue Shopping
          </Link>
        </aside>
      </section>
    </main>
  );
}
