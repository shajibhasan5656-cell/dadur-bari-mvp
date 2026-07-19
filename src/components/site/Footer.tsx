import Link from "next/link";
import { address, brandName, colors, email, phone, tagline } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#111111] py-16 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold">{brandName}</h3>
          <p className="mt-3 text-sm leading-7 text-white/70">{tagline}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Phone: {phone}</li>
            <li>Email: {email}</li>
            <li>{address}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A45D]">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/shop" className="hover:text-[#C8A45D]">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#C8A45D]">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C8A45D]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#C8A45D]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-[#C8A45D]">
                Checkout
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-[#C8A45D]">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
