import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { getDb } from "../src/lib/db";
import { hashPassword } from "../src/lib/auth/password";
import { roles, users } from "../src/lib/db/schema";

config({ path: ".env.local" });

async function main() {
  const ownerPassword = process.env.OWNER_PASSWORD;

  if (!ownerPassword) {
    throw new Error("OWNER_PASSWORD is not configured. Set it in .env.local before creating the owner account.");
  }

  const db = getDb();
  const ownerRoleRows = await db.select().from(roles).where(eq(roles.name, "OWNER"));
  const ownerRole = ownerRoleRows[0];

  if (!ownerRole) {
    throw new Error("OWNER role not found. Seed the roles first.");
  }

  const existing = await db.select().from(users).where(eq(users.email, "owner@dadurbari.com"));

  if (existing[0]) {
    console.log("Owner account already exists.");
    return;
  }

  const passwordHash = await hashPassword(ownerPassword);

  await db.insert(users).values({
    name: "Dadur Bari Owner",
    email: "owner@dadurbari.com",
    phone: "01746212501",
    passwordHash,
    role: "OWNER",
    status: "active",
    isActive: true,
  });

  console.log("Owner account created successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
