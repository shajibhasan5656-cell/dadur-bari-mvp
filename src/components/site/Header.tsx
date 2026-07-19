import Link from "next/link";
import { brandName, colors, tagline } from "@/lib/brand";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold tracking-tight text-[#111111]">
          {brandName}
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-[#111111] hover:text-[#C8A45D]">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-[#111111] hover:text-[#C8A45D]">
            Shop
          </Link>
          <Link href="/cart" className="text-sm font-medium text-[#111111] hover:text-[#C8A45D]">
            Cart
          </Link>
          <Link href="/checkout" className="text-sm font-medium text-[#111111] hover:text-[#C8A45D]">
            Checkout
          </Link>
        </nav>
      </div>

      <div className="border-t border-black/5 bg-[#F3EFE6] px-4 py-2 text-center text-sm font-medium text-[#111111]">
        <span className="text-[#2E3A2F]">{tagline}</span>
      </div>
    </header>
  );
}
