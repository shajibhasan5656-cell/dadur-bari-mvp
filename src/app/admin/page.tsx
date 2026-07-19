import Link from "next/link";
import { brandName } from "@/lib/brand";

const sidebarItems = [
  "Dashboard",
  "Orders",
  "Products",
  "Categories",
  "Collections",
  "Inventory",
  "Customers",
  "Reviews",
  "Coupons",
  "Analytics",
  "Reports",
  "Media Library",
  "SEO",
  "Website Content",
  "Notifications",
  "Support Tickets",
  "Settings",
  "Roles & Permissions",
  "Activity Logs",
  "Security",
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F3EFE6] text-[#111111]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-black/10 bg-[#111111] p-6 text-white lg:w-80 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C8A45D]">Admin</p>
              <h1 className="mt-2 text-2xl font-bold">{brandName}</h1>
            </div>
            <Link href="/" className="text-sm font-semibold text-[#C8A45D] hover:text-white">
              Public
            </Link>
          </div>

          <nav className="mt-8 space-y-2">
            {sidebarItems.map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(17,17,17,0.08)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C8A45D]">Final SRS Direction</p>
                <h2 className="mt-3 text-3xl font-bold">Admin Dashboard</h2>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-black/70">
                  This shell establishes the final admin architecture for products, orders, content, security, and role-based access.
                </p>
              </div>

              <Link
                href="/admin-login"
                className="rounded-full bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2E3A2F]"
              >
                Go to Admin Login
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl bg-[#F3EFE6] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A2F]">Orders</p>
                <p className="mt-3 text-3xl font-bold">0</p>
                <p className="mt-2 text-sm text-black/65">Pending review</p>
              </div>
              <div className="rounded-3xl bg-[#F3EFE6] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A45]">Products</p>
                <p className="mt-3 text-3xl font-bold">3+</p>
                <p className="mt-2 text-sm text-black/65">Collections ready for expansion</p>
              </div>
              <div className="rounded-3xl bg-[#F3EFE6] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2E3A2F]">Access</p>
                <p className="mt-3 text-3xl font-bold">Owner</p>
                <p className="mt-2 text-sm text-black/65">Role-based foundation prepared</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-black/10 bg-[#111111] p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#C8A45D]">Implementation note</p>
              <p className="mt-3 text-base leading-8 text-white/80">
                The final protected admin experience will be connected to a secure database-backed session system and role-based permissions in the next implementation stage.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
