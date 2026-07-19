# Dadur Bari SRS Database and Auth Setup

## Overview

This document captures the foundation required to move from the current MVP experience to the final Dadur Bari SRS implementation.

## Database Requirements

- Use Neon PostgreSQL for the production database.
- Keep the schema definitions in src/lib/db/schema.ts.
- Use Drizzle ORM for schema definition and future migrations.
- Do not require DATABASE_URL during static build if the app is being previewed without a live database connection.

## Required Environment Variables

Create the following environment variables before connecting the final auth and database layers:

- DATABASE_URL=postgresql://...
- AUTH_SECRET=strong-random-secret
- JWT_SECRET=strong-random-secret
- NEXT_PUBLIC_APP_URL=https://your-domain.com
- NEXT_PUBLIC_SITE_URL=https://your-domain.com

## Owner and Admin Seed Plan

- Create an owner account first.
- Use a secure password and store a hash rather than plaintext.
- Seed the initial role hierarchy with OWNER, SUPER_ADMIN, MANAGER, INVENTORY_STAFF, CUSTOMER_SUPPORT, MARKETING_MANAGER, CONTENT_MANAGER, and CUSTOMER.

## Migration Plan

1. Create PostgreSQL tables for users, roles, permissions, products, variants, categories, collections, orders, payments, inventory, coupons, notifications, activity logs, and site settings.
2. Generate migrations with Drizzle.
3. Seed initial categories, collections, and site settings.

## Final Protected Admin Login

- The admin login route is now scaffolded at /admin-login.
- The production admin experience will be protected by auth middleware and role-based access once the database connection is live.
- Until then, the route is intentionally a UI foundation and should not be treated as a complete secure login.
