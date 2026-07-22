import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import {
  createOrUpdateAdminItem,
  deleteAdminItem,
  listAdminItems,
} from "@/lib/mvp-admin-data";

export const dynamic = "force-dynamic";

async function saveAction(formData: FormData) {
  "use server";
  await createOrUpdateAdminItem("notification", {
    name: String(formData.get("name") || ""),
    slug: String(formData.get("slug") || ""),
    description: String(formData.get("description") || ""),
    status: String(formData.get("status") || "active"),
  });
  redirect("/admin/notifications");
}

async function deleteAction(formData: FormData) {
  "use server";
  await deleteAdminItem(String(formData.get("id")));
  redirect("/admin/notifications");
}

export default async function Page() {
  const items = await listAdminItems("notification");

  return (
    <AdminShell title="Notifications" description="Add, update and delete notification templates/messages.">
      <form action={saveAction} className="grid gap-4 rounded-2xl bg-[#F3EFE6] p-6 md:grid-cols-2">
        <input name="name" required placeholder="Name" className="rounded border p-3" />
        <input name="slug" required placeholder="Unique key / slug" className="rounded border p-3" />
        <select name="status" className="rounded border p-3">
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="hidden">Hidden</option>
        </select>
        <textarea name="description" placeholder="Description / details" className="rounded border p-3 md:col-span-2" />
        <button className="rounded bg-[#111111] px-5 py-3 font-semibold text-white md:col-span-2">
          Add or Update Notifications
        </button>
      </form>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-black/60">No records yet.</td>
              </tr>
            ) : (
              items.map((item: any) => (
                <tr key={item.id} className="border-b align-top">
                  <td className="py-3 font-semibold">{item.name}</td>
                  <td>{item.slug}</td>
                  <td>{item.status}</td>
                  <td>{item.description || "-"}</td>
                  <td>
                    <form action={deleteAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <button className="rounded bg-red-100 px-3 py-2 text-xs font-semibold text-red-700">
                        Delete
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
