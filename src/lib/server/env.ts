export const appConfig = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL ?? "",
  authSecret: process.env.AUTH_SECRET ?? "development-only-secret",
  jwtSecret: process.env.JWT_SECRET ?? "development-only-secret",
  isDatabaseReady: Boolean(process.env.DATABASE_URL),
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
