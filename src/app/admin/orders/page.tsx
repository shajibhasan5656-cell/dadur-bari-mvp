import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getMvpOrders, updateMvpOrder } from "@/lib/mvp-orders";

export const dynamic = "force-dynamic";

async function updateOrderAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status") || "pending");
  const paymentStatus = String(formData.get("payment_status") || "awaiting_verification");

  await updateMvpOrder(id, status, paymentStatus);
  redirect("/admin/orders");
}

export default async function AdminOrdersPage() {
  const orders = await getMvpOrders();

  return (
    <AdminShell title="Orders" description="Manage real MVP checkout orders, payment verification and order status.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Customer</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-black/60">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order.id} className="border-b align-top">
                  <td className="py-4 font-semibold">{order.full_name}</td>
                  <td>{order.phone}</td>
                  <td>
                    {order.order_product || order.order_items}
                    <br />
                    <span className="text-xs text-black/50">
                      Size: {order.order_size || "-"} / Qty: {order.order_quantity || 1}
                    </span>
                  </td>
                  <td>{order.order_total}</td>
                  <td>
                    {order.payment_method}
                    <br />
                    <span className="text-xs text-black/50">
                      TXN: {order.transaction_id || "Not provided"}
                    </span>
                  </td>
                  <td>{order.status}</td>
                  <td>{order.payment_status}</td>
                  <td>
                    <form action={updateOrderAction} className="space-y-2">
                      <input type="hidden" name="id" value={order.id} />

                      <select
                        name="status"
                        defaultValue={order.status || "pending"}
                        className="w-full rounded border p-2"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="printing">Printing</option>
                        <option value="packing">Packing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>

                      <select
                        name="payment_status"
                        defaultValue={order.payment_status || "awaiting_verification"}
                        className="w-full rounded border p-2"
                      >
                        <option value="awaiting_verification">Awaiting Verification</option>
                        <option value="verified">Verified</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>

                      <button className="w-full rounded bg-[#111111] px-4 py-2 font-semibold text-white">
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
