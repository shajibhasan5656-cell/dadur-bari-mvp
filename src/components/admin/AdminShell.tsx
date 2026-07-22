import Link from "next/link";

const menu = [
  ["Dashboard", "/admin"],
  ["Orders", "/admin/orders"],
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Collections", "/admin/collections"],
  ["Inventory", "/admin/inventory"],
  ["Customers", "/admin/customers"],
  ["Reviews", "/admin/reviews"],
  ["Coupons", "/admin/coupons"],
  ["Analytics", "/admin/analytics"],
  ["Reports", "/admin/reports"],
  ["Media Library", "/admin/media"],
  ["SEO", "/admin/seo"],
  ["Website Content", "/admin/content"],
  ["Notifications", "/admin/notifications"],
  ["Support Tickets", "/admin/support"],
  ["Settings", "/admin/settings"],
  ["Roles & Permissions", "/admin/roles"],
  ["Activity Logs", "/admin/activity-logs"],
  ["Security", "/admin/security"],
];

export default function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
        <aside className="bg-[#111111] p-6 text-white">
          <Link href="/" className="text-2xl font-bold">Dadur Bari</Link>
          <p className="mt-2 text-sm text-white/50">Admin Panel</p>

          <nav className="mt-8 space-y-1">
            {menu.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="block rounded-xl px-4 py-3 text-sm hover:bg-white/10 hover:text-[#C8A45D]"
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="p-6 lg:p-10">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h1 className="text-4xl font-bold">{title}</h1>
            {description ? <p className="mt-3 text-black/60">{description}</p> : null}
            <div className="mt-8">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
