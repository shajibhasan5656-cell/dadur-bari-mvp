import AdminShell from "@/components/admin/AdminShell";

export default function SettingsPage() {
  return (
    <AdminShell title="Settings" description="Business, payment and delivery settings for Dadur Bari.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Business Info</h2>
          <p className="mt-3">Phone: 01746-212501</p>
          <p>Email: dadur.bari.cloths@gmail.com</p>
          <p>Khetlal, Joypurhat, Rajshahi, Bangladesh</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Payment</h2>
          <p className="mt-3">bKash/Nagad/Rocket: 01746-212501</p>
          <p>COD requires advance delivery charge.</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Delivery</h2>
          <p className="mt-3">Inside Joypurhat: ৳100, 1–2 days</p>
          <p>Outside Joypurhat: ৳150, 2–4 days</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Brand</h2>
          <p className="mt-3">Tagline: Wear Your Identity.</p>
          <p>Colors: Black, Gold, Ivory</p>
        </div>
      </div>
    </AdminShell>
  );
}
