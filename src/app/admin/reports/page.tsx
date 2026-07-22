import AdminShell from "@/components/admin/AdminShell";
import { getMvpOrders } from "@/lib/mvp-orders";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const orders = await getMvpOrders();

  return (
    <AdminShell title="Reports" description="Order report from real checkout submissions.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Date</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Size</th>
              <th>Payment</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={7} className="py-6 text-black/60">No reports yet.</td></tr>
            ) : (
              orders.map((o: any) => (
                <tr key={o.id} className="border-b">
                  <td className="py-3">{new Date(o.created_at).toLocaleString()}</td>
                  <td>{o.full_name}</td>
                  <td>{o.phone}</td>
                  <td>{o.order_product || o.order_items}</td>
                  <td>{o.order_size}</td>
                  <td>{o.payment_method}</td>
                  <td>{o.order_total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
