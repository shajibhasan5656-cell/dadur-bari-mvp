"use server";

import { redirect } from "next/navigation";
import { eq, or } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { writeAdminSession } from "@/lib/auth/admin-session";
import { users } from "@/lib/db/schema";
import { canAccessAdminPanel } from "@/lib/auth/roles";

export async function loginAdminAction(formData: FormData): Promise<void> {
  const identifier = String(formData.get("identifier") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!identifier || !password) {
    throw new Error("Please provide your email/phone and password.");
  }

  const db = getDb();
  const rows = await db.select().from(users).where(or(eq(users.email, identifier), eq(users.phone, identifier)));
  const account = rows[0];

  if (!account || !account.passwordHash || !account.role) {
    throw new Error("Invalid admin credentials.");
  }

  if (!canAccessAdminPanel(account.role)) {
    throw new Error("This account does not have admin access.");
  }

  const validPassword = await verifyPassword(password, account.passwordHash);

  if (!validPassword) {
    throw new Error("Invalid admin credentials.");
  }

  await writeAdminSession({
    userId: account.id,
    email: account.email,
    name: account.name ?? "Admin",
    role: account.role,
  });

  redirect("/admin");
}
