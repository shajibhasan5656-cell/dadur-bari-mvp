import AdminShell from "@/components/admin/AdminShell";

const categories = [
  ["Silver", "Entry level premium"],
  ["Gold", "Most popular"],
  ["Premium", "Luxury experience"],
];

export default function CategoriesPage() {
  return (
    <AdminShell title="Categories" description="Dadur Bari product quality categories.">
      <div className="grid gap-5 md:grid-cols-3">
        {categories.map(([name, desc]) => (
          <div key={name} className="rounded-2xl bg-[#F3EFE6] p-6">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="mt-3 text-black/60">{desc}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
