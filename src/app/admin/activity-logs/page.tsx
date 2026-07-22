import AdminShell from "@/components/admin/AdminShell";
import { listActivityItems } from "@/lib/mvp-admin-data";

export const dynamic = "force-dynamic";

export default async function ActivityLogsPage() {
  const items = await listActivityItems();

  return (
    <AdminShell title="Activity Logs" description="Recent admin data changes in MVP system.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3">Type</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-black/60">No activity yet.</td></tr>
            ) : (
              items.map((item: any) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">{item.type}</td>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
