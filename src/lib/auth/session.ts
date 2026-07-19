import type { AppRole } from "@/lib/auth/roles";

export interface AdminSession {
  userId: string;
  email: string;
  name: string;
  role: AppRole;
  isAdmin: boolean;
}

export function createPlaceholderSession(role: AppRole = "OWNER"): AdminSession {
  return {
    userId: "placeholder-owner-id",
    email: "owner@dadurbari.com",
    name: "Owner",
    role,
    isAdmin: true,
  };
}

export function getSessionFromRequest(): AdminSession | null {
  return null;
}
