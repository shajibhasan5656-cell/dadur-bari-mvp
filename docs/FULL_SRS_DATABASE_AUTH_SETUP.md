# Dadur Bari SRS Database and Auth Setup

## Overview

This document captures the foundation required to move from the current MVP experience to the final Dadur Bari SRS implementation.

## Database Requirements

- Use Neon PostgreSQL for the production database.
- Keep the schema in src/lib/db/schema.ts.
- Use Drizzle ORM for schema definition and future migrations.
- The app does not require a live database connection during normal static builds.

## Required Environment Variables

Create the following environment variables before connecting the final auth and database layers:

- DATABASE_URL=postgresql://...
- AUTH_SECRET=strong-random-secret
- JWT_SECRET=strong-random-secret
- NEXT_PUBLIC_APP_URL=https://your-domain.com
- NEXT_PUBLIC_SITE_URL=https://your-domain.com

## Tables Created

The schema foundation includes:

- users
- roles
- permissions
- role_permissions
- products
- product_variants
- product_images
- categories
- collections
- inventory
- inventory_logs
- orders
- order_items
- payments
- addresses
- wishlists
- reviews
- coupons
- coupon_usage
- notifications
- support_tickets
- activity_logs
- site_settings
- seo_settings
- media_library

## Migration and Seed Commands

Run the following from the project root:

- npm run db:push
- npm run db:seed

If you prefer migrations:

- npm run db:generate
- npm run db:migrate

## Seed Data

The seed script creates:

- roles for OWNER, SUPER_ADMIN, MANAGER, INVENTORY_STAFF, CUSTOMER_SUPPORT, MARKETING_MANAGER, CONTENT_MANAGER, and CUSTOMER
- site settings for business info, payment number, delivery charges, and brand colors
- categories for Silver, Gold, and Premium
- collections for Oversized, Anime, and Minimal

## Final Protected Admin Login

- The admin login route is scaffolded at /admin-login.
- The production admin experience will be protected by auth middleware and role-based access once the database connection is live.
- Authentication is not implemented in this task.
