import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let client: postgres.Sql | null = null;
let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured. Set it in .env.local before using the database layer.");
  }

  if (!client) {
    client = postgres(process.env.DATABASE_URL, { ssl: "require", max: 1 });
  }

  if (!db) {
    db = drizzle(client);
  }

  return db;
}

export { drizzle };
export default getDb;
