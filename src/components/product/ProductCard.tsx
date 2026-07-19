import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-3xl border border-black/10 bg-white p-5 shadow-lg transition hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <div className="flex aspect-square items-center justify-center rounded-2xl bg-[#F3EFE6] p-6 text-center">
          <div>
            <p className="text-xl font-bold text-[#111111]">{product.name}</p>
            <p className="mt-2 text-sm text-black/60">{product.category} Collection</p>
          </div>
        </div>
      </Link>

      <div className="mt-5">
        <span className="rounded-full bg-[#C8A45D] px-3 py-1 text-xs font-semibold text-[#111111]">
          {product.badge}
        </span>

        <h3 className="mt-4 text-xl font-bold text-[#111111]">{product.name}</h3>

        <p className="mt-3 text-sm leading-6 text-black/60">{product.description}</p>

        <div className="mt-4 flex items-end gap-3">
          <p className="text-2xl font-bold text-[#111111]">৳{product.price}</p>
          <p className="text-sm text-black/40 line-through">৳{product.oldPrice}</p>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="mt-5 block rounded-md bg-[#111111] px-5 py-3 text-center font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
        >
          View Product
        </Link>
      </div>
    </article>
  );
}
