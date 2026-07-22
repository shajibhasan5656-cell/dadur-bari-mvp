import AdminShell from "@/components/admin/AdminShell";
import { getMvpOrders } from "@/lib/mvp-orders";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const orders = await getMvpOrders();
  const map = new Map<string, any>();

  orders.forEach((order: any) => {
    if (!map.has(order.phone)) {
      map.set(order.phone, {
        name: order.full_name,
        phone: order.phone,
        email: order.email,
        district: order.district,
        totalOrders: 0,
      });
    }
    map.get(order.phone).totalOrders += 1;
  });

  const customers = Array.from(map.values());

  return (
    <AdminShell title="Customers" description="Customers collected from checkout orders.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>District</th>
              <th>Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-black/60">No customers yet.</td></tr>
            ) : (
              customers.map((c) => (
                <tr key={c.phone} className="border-b">
                  <td className="py-3 font-semibold">{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.email || "-"}</td>
                  <td>{c.district}</td>
                  <td>{c.totalOrders}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
