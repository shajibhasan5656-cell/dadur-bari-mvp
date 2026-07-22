import AdminShell from "@/components/admin/AdminShell";

const collections = ["Oversized", "Anime", "Minimal", "Typography", "Custom Design", "Limited Edition"];

export default function CollectionsPage() {
  return (
    <AdminShell title="Collections" description="Dadur Bari collection structure.">
      <div className="grid gap-5 md:grid-cols-3">
        {collections.map((name) => (
          <div key={name} className="rounded-2xl bg-[#F3EFE6] p-6">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="mt-3 text-black/60">Collection ready for products.</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
