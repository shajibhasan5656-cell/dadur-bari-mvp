"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadOrders() {
    setLoading(true);
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    const json = await res.json();
    setOrders(json.orders || []);
    setLoading(false);
  }

  async function updateOrder(id: string, status: string, payment_status: string) {
    setMessage("");

    const res = await fetch("/api/admin/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status,
        payment_status,
      }),
    });

    const json = await res.json();

    if (!json.success) {
      setMessage("Order update failed.");
      return;
    }

    setMessage("Order updated successfully.");
    await loadOrders();
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <AdminShell
      title="Orders"
      description="Manage real MVP checkout orders, payment verification and order status."
    >
      {message ? (
        <div className="mb-5 rounded-xl bg-[#F3EFE6] p-4 font-semibold">
          {message}
        </div>
      ) : null}

      {loading ? (
        <p>Loading orders...</p>
      ) : (
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
                orders.map((order) => (
                  <OrderRow key={order.id} order={order} onUpdate={updateOrder} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}

function OrderRow({
  order,
  onUpdate,
}: {
  order: any;
  onUpdate: (id: string, status: string, payment_status: string) => void;
}) {
  const [status, setStatus] = useState(order.status || "pending");
  const [paymentStatus, setPaymentStatus] = useState(
    order.payment_status || "awaiting_verification"
  );

  return (
    <tr className="border-b align-top">
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
      <td className="space-y-2">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
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
          value={paymentStatus}
          onChange={(event) => setPaymentStatus(event.target.value)}
          className="w-full rounded border p-2"
        >
          <option value="awaiting_verification">Awaiting Verification</option>
          <option value="verified">Verified</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>

        <button
          type="button"
          onClick={() => onUpdate(order.id, status, paymentStatus)}
          className="w-full rounded bg-[#111111] px-4 py-2 font-semibold text-white"
        >
          Save
        </button>
      </td>
    </tr>
  );
}
