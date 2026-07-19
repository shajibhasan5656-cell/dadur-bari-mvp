import Link from "next/link";
import { brandName } from "@/lib/brand";

const adminMenu = [
  "Orders",
  "Products",
  "Customers",
  "Inventory",
  "Settings",
];

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(200,164,93,0.16),_transparent_45%),_#111111] px-6 py-16 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center">
        <section className="flex-1">
          <p className="inline-flex rounded-full border border-[#C8A45D]/45 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#C8A45D]">
            Dadur Bari Admin Access
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Secure owner and admin access for the final platform.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            This page establishes the final administrative entry experience for Dadur Bari. Authentication will be connected to a secure database-backed session layer in the next implementation stage.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/admin"
              className="rounded-full bg-[#C8A45D] px-6 py-3 font-semibold text-[#111111] transition hover:bg-white"
            >
              Open Admin Dashboard
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#111111]"
            >
              Return to Public Site
            </Link>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Ready for final SRS roles</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {adminMenu.map((item) => (
                <span key={item} className="rounded-full border border-[#C8A45D]/40 bg-[#111111]/70 px-3 py-2 text-sm text-[#F3EFE6]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#F3EFE6] p-8 text-[#111111] shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#2E3A2F]">Secure Sign In</p>
              <h2 className="mt-2 text-3xl font-bold">Admin Login</h2>
            </div>
            <div className="rounded-2xl bg-[#111111] px-4 py-3 text-sm font-semibold text-[#C8A45D]">
              {brandName}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold">Email or phone</label>
              <input
                type="text"
                placeholder="owner@dadurbari.com"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none ring-0"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none ring-0"
              />
            </div>
            <button className="w-full rounded-2xl bg-[#111111] px-4 py-3 font-semibold text-white transition hover:bg-[#2E3A2F]">
              Continue to admin dashboard
            </button>
          </div>

          <p className="mt-6 text-sm leading-7 text-black/70">
            Real database-backed authentication and owner bootstrap will be connected using secure environment variables and a protected session layer.
          </p>
        </section>
      </div>
    </main>
  );
}
