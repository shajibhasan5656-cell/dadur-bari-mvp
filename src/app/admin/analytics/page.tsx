import AdminShell from "@/components/admin/AdminShell";
import { getMvpOrders } from "@/lib/mvp-orders";

export const dynamic = "force-dynamic";

function money(value: string) {
  return Number(String(value || "0").replace(/[^0-9]/g, "")) || 0;
}

export default async function AnalyticsPage() {
  const orders = await getMvpOrders();
  const totalRevenue = orders.reduce((sum: number, o: any) => sum + money(o.order_total), 0);
  const totalOrders = orders.length;
  const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
  const codOrders = orders.filter((o: any) => o.payment_method === "Cash On Delivery").length;

  return (
    <AdminShell title="Analytics" description="MVP business analytics from real checkout orders.">
      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <p className="text-sm font-bold tracking-[0.2em]">ORDERS</p>
          <p className="mt-4 text-4xl font-bold">{totalOrders}</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <p className="text-sm font-bold tracking-[0.2em]">REVENUE</p>
          <p className="mt-4 text-4xl font-bold">৳{totalRevenue}</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <p className="text-sm font-bold tracking-[0.2em]">AVG ORDER</p>
          <p className="mt-4 text-4xl font-bold">৳{avgOrder}</p>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <p className="text-sm font-bold tracking-[0.2em]">COD</p>
          <p className="mt-4 text-4xl font-bold">{codOrders}</p>
        </div>
      </div>
    </AdminShell>
  );
}
