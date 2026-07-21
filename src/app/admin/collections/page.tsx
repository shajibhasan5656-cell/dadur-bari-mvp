import Link from "next/link";

export default function AdminCollectionsPage() {
  return (
    <main className="min-h-screen bg-[#F3EFE6] p-8 text-[#111111]">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/admin" className="text-sm font-semibold text-[#C8A45D]">← Back to Admin</Link>
        <h1 className="mt-6 text-4xl font-bold">Collections</h1>
        <p className="mt-4 text-black/60">
          This Collections module is part of the final Dadur Bari SRS admin system.
        </p>
      </div>
    </main>
  );
}
