import AdminShell from "@/components/admin/AdminShell";

export default function ReviewsPage() {
  return (
    <AdminShell title="Reviews" description="Verified buyer review moderation foundation.">
      <div className="rounded-2xl bg-[#F3EFE6] p-6">
        <p>No reviews yet. After customer review feature is enabled, pending reviews will appear here.</p>
      </div>
    </AdminShell>
  );
}
