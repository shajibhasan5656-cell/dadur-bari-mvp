import AdminShell from "@/components/admin/AdminShell";

export default function SeoPage() {
  return (
    <AdminShell title="SEO Manager" description="SEO checklist and metadata foundation for Dadur Bari.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Homepage SEO</h2>
          <p className="mt-3">Dadur Bari | Premium Custom Apparel in Bangladesh</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Required SEO</h2>
          <ul className="mt-3 list-inside list-disc text-black/70">
            <li>Meta title</li>
            <li>Meta description</li>
            <li>Open Graph</li>
            <li>Product schema</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
