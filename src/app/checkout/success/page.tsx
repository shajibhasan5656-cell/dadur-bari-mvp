import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3EFE6] px-6 text-[#111111]">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
          ✓
        </div>

        <h1 className="mt-6 text-4xl font-extrabold">
          Thank You!
        </h1>

        <p className="mt-4 text-lg text-black/60">
          Your Dadur Bari order has been placed successfully.
        </p>

        <div className="mt-6 rounded-2xl bg-[#F3EFE6] p-5">
          <p className="text-sm text-black/50">Order Number</p>
          <p className="mt-1 text-2xl font-bold">DB-2026-0001</p>
        </div>

        <p className="mt-6 text-sm leading-7 text-black/60">
          Payment will be manually verified by Dadur Bari. You will be contacted
          for confirmation, printing, packing and delivery updates.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/shop"
            className="rounded-md bg-[#111111] px-6 py-4 font-semibold text-white hover:bg-[#C8A45D] hover:text-[#111111]"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="rounded-md border border-[#111111] px-6 py-4 font-semibold hover:bg-[#111111] hover:text-white"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}