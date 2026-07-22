import AdminShell from "@/components/admin/AdminShell";

export default function SecurityPage() {
  return (
    <AdminShell title="Security Dashboard" description="Security status and final SRS checklist.">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Current Security</h2>
          <ul className="mt-3 list-inside list-disc text-black/70">
            <li>Owner login foundation enabled</li>
            <li>Database connected</li>
            <li>Admin route foundation enabled</li>
            <li>Secrets stored in environment variables</li>
          </ul>
        </div>
        <div className="rounded-2xl bg-[#F3EFE6] p-6">
          <h2 className="text-xl font-bold">Next Security Tasks</h2>
          <ul className="mt-3 list-inside list-disc text-black/70">
            <li>Stronger session signing</li>
            <li>Audit log for all actions</li>
            <li>Role based permission enforcement</li>
            <li>2FA future-ready</li>
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
