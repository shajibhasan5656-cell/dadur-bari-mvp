"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const qualityOptions = ["Silver", "Gold", "Premium"];
const statusOptions = ["ACTIVE", "DRAFT", "PRE_ORDER", "OUT_OF_STOCK"];
const sizeOptions = ["M", "L", "XL", "XXL"];

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim(),
      sku: String(formData.get("sku") ?? "").trim(),
      shortDescription: String(formData.get("shortDescription") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      status: String(formData.get("status") ?? "DRAFT").toLowerCase(),
      quality: String(formData.get("quality") ?? "Silver"),
      fabric: String(formData.get("fabric") ?? "").trim(),
      gsm: String(formData.get("gsm") ?? "").trim(),
      price: Number(formData.get("price") ?? 0),
      stock: Number(formData.get("stock") ?? 0),
      size: String(formData.get("size") ?? "M"),
      color: String(formData.get("color") ?? "Black"),
      isPreOrder: Boolean(formData.get("isPreOrder")),
    };

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({ success: false }));

    if (!response.ok || !data.success) {
      setError(data.error ?? "Unable to create product.");
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/products");
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] px-6 py-10 text-[#111111] md:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(17,17,17,0.08)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C8A45D]">Admin</p>
            <h1 className="mt-3 text-3xl font-bold">Add New Product</h1>
            <p className="mt-3 max-w-2xl text-base leading-8 text-black/70">
              Create a new Dadur Bari catalog entry with product variants, inventory, and SRS-ready metadata.
            </p>
          </div>
          <a href="/admin/products" className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-[#111111] transition hover:bg-[#F3EFE6]">
            Back to Products
          </a>
        </div>

        {error ? <p className="mt-6 rounded-2xl bg-[#111111] px-4 py-3 text-sm text-white">{error}</p> : null}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">Product Name</label>
            <input name="name" required className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Slug</label>
            <input name="slug" required className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">SKU</label>
            <input name="sku" required className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Status</label>
            <select name="status" defaultValue="ACTIVE" className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3">
              {statusOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Category / Quality</label>
            <select name="quality" defaultValue="Premium" className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3">
              {qualityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Fabric</label>
            <input name="fabric" className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">GSM</label>
            <input name="gsm" className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Price (BDT)</label>
            <input type="number" name="price" defaultValue={0} className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Stock</label>
            <input type="number" name="stock" defaultValue={0} className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Default Size</label>
            <select name="size" defaultValue="M" className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3">
              {sizeOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Color</label>
            <input name="color" defaultValue="Black" className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Short Description</label>
            <input name="shortDescription" className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">Description</label>
            <textarea name="description" rows={4} className="w-full rounded-2xl border border-black/10 bg-[#F3EFE6] px-4 py-3" />
          </div>
          <div className="md:col-span-2 flex items-center gap-3 rounded-2xl bg-[#F3EFE6] px-4 py-3">
            <input id="isPreOrder" name="isPreOrder" type="checkbox" className="h-4 w-4" />
            <label htmlFor="isPreOrder" className="text-sm font-semibold">Pre-order product</label>
          </div>

          <div className="md:col-span-2">
            <button type="submit" disabled={isSubmitting} className="rounded-full bg-[#111111] px-6 py-3 font-semibold text-white transition hover:bg-[#2E3A2F] disabled:opacity-70">
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
