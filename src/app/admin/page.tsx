import AdminShell from "@/components/admin/AdminShell";

export default function AdminDashboardPage() {
  return (
    <AdminShell
      title="Admin Dashboard"
      description="Final SRS admin dashboard foundation for Dadur Bari."
    >
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <p className="text-sm font-bold tracking-[0.2em]">ORDERS</p>
          <p className="mt-4 text-4xl font-bold">Live</p>
          <p className="mt-2 text-black/60">Order database flow connected.</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <p className="text-sm font-bold tracking-[0.2em]">PRODUCTS</p>
          <p className="mt-4 text-4xl font-bold">Live</p>
          <p className="mt-2 text-black/60">Product management foundation ready.</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <p className="text-sm font-bold tracking-[0.2em]">ACCESS</p>
          <p className="mt-4 text-4xl font-bold">OWNER</p>
          <p className="mt-2 text-black/60">Role-based final foundation.</p>
        </div>
      </div>
    </AdminShell>
  );
}
