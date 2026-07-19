import { cookies } from "next/headers";
import type { AppRole } from "@/lib/auth/roles";

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: AppRole;
}

const SESSION_COOKIE_NAME = "dadur-bari-admin-session";

export function createAdminSessionCookie(payload: AdminSessionPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function parseAdminSessionCookie(value: string | undefined): AdminSessionPayload | null {
  if (!value) {
    return null;
  }

  try {
    const decoded = Buffer.from(value, "base64url").toString("utf-8");
    return JSON.parse(decoded) as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function readAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return parseAdminSessionCookie(sessionValue);
}

export async function writeAdminSession(payload: AdminSessionPayload): Promise<void> {
  const cookieStore = await cookies();
  const value = createAdminSessionCookie(payload);
  cookieStore.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
