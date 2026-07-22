import Link from "next/link";
import { getMvpOrders } from "@/lib/mvp-orders";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders: any[] = [];

  try {
    orders = await getMvpOrders();
  } catch {
    orders = [];
  }

  return (
    <main className="min-h-screen bg-[#F3EFE6] p-8 text-[#111111]">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-lg">
        <Link href="/admin" className="text-sm font-semibold text-[#C8A45D]">
          ← Back to Admin
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Orders</h1>
        <p className="mt-2 text-black/60">
          Real MVP orders submitted from checkout.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3">Customer</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-black/60">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 font-semibold">{order.full_name}</td>
                    <td>{order.phone}</td>
                    <td>{order.order_product || order.order_items}</td>
                    <td>{order.order_size}</td>
                    <td>{order.order_quantity}</td>
                    <td>{order.order_total}</td>
                    <td>
                      {order.payment_method}
                      <br />
                      <span className="text-xs text-black/50">
                        {order.transaction_id || "No TXN"}
                      </span>
                    </td>
                    <td>{order.status}</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
