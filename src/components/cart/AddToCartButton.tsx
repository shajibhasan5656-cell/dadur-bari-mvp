"use client";

import { useState } from "react";

type ProductForCart = {
  slug: string;
  name: string;
  price: number;
  categoryName?: string | null;
};

const CART_KEY = "dadur_bari_cart";

export default function AddToCartButton({ product }: { product: ProductForCart }) {
  const [added, setAdded] = useState(false);

  function addToCart() {
    const current = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

    const item = {
      id: product.slug,
      name: product.name,
      category: product.categoryName || "Dadur Bari",
      size: "L",
      price: Number(product.price || 0),
      quantity: 1,
    };

    const existing = current.find(
      (cartItem: any) => cartItem.id === item.id && cartItem.size === item.size
    );

    let next;

    if (existing) {
      next = current.map((cartItem: any) =>
        cartItem.id === item.id && cartItem.size === item.size
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      next = [...current, item];
    }

    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={addToCart}
      className="rounded-md bg-[#111111] px-6 py-4 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}
