"use client";

import { useState } from "react";

export default function SizeSelector() {
  const sizes = ["M", "L", "XL", "XXL"];
  const [selected, setSelected] = useState("L");

  return (
    <div className="mt-8">
      <p className="mb-3 font-semibold">Select Size</p>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setSelected(size)}
            className={
              selected === size
                ? "rounded-md bg-[#111111] px-5 py-3 font-semibold text-white"
                : "rounded-md border border-black/20 px-5 py-3 font-semibold hover:bg-[#111111] hover:text-white"
            }
          >
            {size}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-black/60">Selected size: {selected}</p>
    </div>
  );
}
