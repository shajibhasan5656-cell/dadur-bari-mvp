import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { createCoupon, getCoupons } from "@/lib/mvp-coupons";

export const dynamic = "force-dynamic";

async function createCouponAction(formData: FormData) {
  "use server";

  await createCoupon({
    code: String(formData.get("code") || ""),
    type: String(formData.get("type") || "fixed"),
    value: Number(formData.get("value") || 0),
    minimumOrder: Number(formData.get("minimum_order") || 0),
  });

  redirect("/admin/coupons");
}

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <AdminShell title="Coupons" description="Create and manage Dadur Bari MVP coupons.">
      <form action={createCouponAction} className="grid gap-4 rounded-2xl bg-[#F3EFE6] p-6 md:grid-cols-4">
        <input name="code" required placeholder="Coupon Code" className="rounded border p-3" />
        <select name="type" className="rounded border p-3">
          <option value="fixed">Fixed Amount</option>
          <option value="percentage">Percentage</option>
          <option value="free_shipping">Free Shipping</option>
        </select>
        <input name="value" type="number" placeholder="Value" className="rounded border p-3" />
        <input name="minimum_order" type="number" placeholder="Minimum Order" className="rounded border p-3" />
        <button className="rounded bg-[#111111] px-5 py-3 font-semibold text-white md:col-span-4">
          Save Coupon
        </button>
      </form>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Minimum Order</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-black/60">No coupons yet.</td></tr>
            ) : (
              coupons.map((coupon: any) => (
                <tr key={coupon.id} className="border-b">
                  <td className="py-3 font-semibold">{coupon.code}</td>
                  <td>{coupon.type}</td>
                  <td>{coupon.value}</td>
                  <td>{coupon.minimum_order}</td>
                  <td>{coupon.active ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
