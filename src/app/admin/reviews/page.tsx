import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export default function Page() {
  return (
    <AdminShell title="Reviews" description="Moderate verified buyer reviews.">
      <div className="rounded-2xl bg-[#F3EFE6] p-6">
        <p className="font-semibold">This module is available in the final SRS admin panel foundation.</p>
        <p className="mt-3 text-black/60">
          Full database actions will be expanded step by step without changing Dadur Bari brand identity.
        </p>
        <Link href="/admin" className="mt-6 inline-block rounded-xl bg-[#111111] px-5 py-3 text-white">
          Back to Dashboard
        </Link>
      </div>
    </AdminShell>
  );
}
