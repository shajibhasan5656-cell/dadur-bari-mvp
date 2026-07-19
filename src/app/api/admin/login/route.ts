import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { users } from "@/lib/db/schema";
import { canAccessAdminPanel } from "@/lib/auth/roles";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = String(body?.identifier ?? "").trim();
    const password = String(body?.password ?? "");

    if (!identifier || !password) {
      return NextResponse.json({ success: false, error: "Please provide your email/phone and password." }, { status: 400 });
    }

    const db = getDb();
    const rows = await db.select().from(users).where(or(eq(users.email, identifier), eq(users.phone, identifier)));
    const account = rows[0];

    if (!account || !account.passwordHash || !account.role) {
      return NextResponse.json({ success: false, error: "Invalid admin credentials." }, { status: 401 });
    }

    if (!canAccessAdminPanel(account.role)) {
      return NextResponse.json({ success: false, error: "This account does not have admin access." }, { status: 401 });
    }

    const validPassword = await verifyPassword(password, account.passwordHash);

    if (!validPassword) {
      return NextResponse.json({ success: false, error: "Invalid admin credentials." }, { status: 401 });
    }

    const value = Buffer.from(JSON.stringify({ userId: account.id, role: account.role })).toString("base64url");

    const response = NextResponse.json({ success: true, role: account.role });
    response.cookies.set({
      name: "dadur_bari_admin_session",
      value,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Admin login error", error);
    return NextResponse.json({ success: false, error: "Unable to sign in right now." }, { status: 500 });
  }
}
