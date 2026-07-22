import AdminShell from "@/components/admin/AdminShell";

export default function SupportPage() {
  return (
    <AdminShell title="Support Tickets" description="Customer support management foundation.">
      <div className="rounded-2xl bg-[#F3EFE6] p-6">
        <p>No support tickets yet. Customers can currently contact by phone or email.</p>
        <p className="mt-2">Phone: 01746-212501</p>
        <p>Email: dadur.bari.cloths@gmail.com</p>
      </div>
    </AdminShell>
  );
}
