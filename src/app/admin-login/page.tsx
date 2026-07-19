"use client";

import Link from "next/link";
import { useState } from "react";
import { brandName } from "@/lib/brand";

const adminMenu = [
  "Orders",
  "Products",
  "Customers",
  "Inventory",
  "Settings",
];

export default function AdminLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        setError(data?.error ?? "Login failed.");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

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
            This page is the SRS-ready entry point for owner and admin access. The login flow now validates credentials against the database-backed user store and prepares the session foundation for the next security stage.
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
            <h2 className="text-xl font-semibold">Prepared for final SRS roles</h2>
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="identifier" className="mb-2 block text-sm font-semibold">Email or phone</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="owner@dadurbari.com"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none ring-0"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none ring-0"
              />
            </div>
            {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-[#111111] px-4 py-3 font-semibold text-white transition hover:bg-[#2E3A2F] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Continue to admin dashboard"}
            </button>
          </form>

          <p className="mt-6 text-sm leading-7 text-black/70">
            This login foundation validates credentials against the database and prepares the secure session layer for the next SRS security phase.
          </p>
        </section>
      </div>
    </main>
  );
}
