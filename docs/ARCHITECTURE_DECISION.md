# Dadur Bari Architecture Decision

## 1. Current Project Status

The repository already contains a working Next.js App Router MVP for Dadur Bari with Tailwind CSS. The current implementation includes:

- A branded homepage with hero, quality collections, featured products, DTF section, and contact area
- A shop page with static product cards
- A product details page with size selection and purchase links
- A checkout page with customer information, delivery information, payment options, and order summary
- A Vercel-ready Next.js structure

This means the project already has a strong visual foundation, but it is still a static MVP and is not yet aligned with the full Dadur Bari SRS.

## 2. What Exists Now

### Present strengths

- Next.js App Router is already in place
- Tailwind CSS is already configured
- Brand colors and tone are already partially aligned with the SRS
- Core public pages already exist for homepage, shop, product, cart, checkout, and success flow
- The project is deployable and already works on Vercel

### Current limitations

- Product data is hardcoded in page components
- No persistent database exists
- No authentication or user accounts exist
- No admin panel exists
- No order persistence or payment workflow exists beyond a static form submission
- No inventory or variant logic exists beyond simple static content
- No SEO/admin/content management system exists
- No role-based permissions or audit system exists

## 3. What Is Missing for Final SRS

To meet the full specification, the project still needs:

- A real product catalog with categories, collections, variants, stock, and SKU support
- A database-backed content and commerce model
- Authentication and role-based access
- A full admin panel for products, orders, inventory, SEO, settings, and content
- A customer dashboard for orders, wishlist, profile, and support
- A real checkout and order workflow with payments and transaction tracking
- Notifications, analytics, and SEO tooling
- Security, performance, and deployment hardening

## 4. Recommended Final Architecture

### Recommended approach

Use a Next.js App Router monolith for the first production version, with API routes and server logic inside the same application.

### Why this is the best fit

- It preserves the current Vercel-friendly deployment model
- It matches the current project structure and reduces migration risk
- It allows the team to build the full commerce platform without introducing an unnecessary second backend too early
- It is easier to keep the brand experience and admin experience consistent in one codebase
- It is still scalable enough for the initial SRS implementation

### Architecture decision

- Frontend: Next.js App Router
- Backend/API: Next.js route handlers under /api/v1, plus server actions where appropriate
- Database: PostgreSQL via Neon
- ORM: Drizzle ORM
- Auth: JWT-based authentication with secure HTTP-only cookies and role-based permissions
- File storage: Cloudflare R2 for future media storage
- Admin panel: built inside the same application with role-based access control
- Customer dashboard: built inside the same application

### Why not a separate Express backend first

A separate Express backend is not recommended for the first implementation because:

- It adds deployment and infrastructure complexity
- It would create more migration work for the existing Vercel-based app
- The current MVP is already structured around Next.js
- The SRS can be met effectively with a well-structured Next.js backend

If the platform grows significantly later, the API layer can be split out cleanly from the app without changing the business model.

## 5. Recommended Technology Choices

### Next.js App Router

Use this for all public pages, app pages, layouts, SEO, and route-based rendering.

### Next.js API routes / server logic

Use route handlers under /api/v1 for:

- authentication
- products
- cart
- checkout
- orders
- customer management
- admin management
- analytics
- SEO
- settings

### PostgreSQL / Neon

Use Neon PostgreSQL as the production database.

### Drizzle ORM

Use Drizzle ORM for schema definition, migrations, and query handling.

### Authentication system

Use a secure auth system with:

- email or phone + password login
- password hashing with Argon2 or bcrypt
- JWT with secure HTTP-only cookies
- role-based permissions
- password reset flow
- audit logging

### Admin panel

Create an admin experience that allows the owner to manage the business without writing code. This must include:

- products
- categories
- collections
- orders
- inventory
- customers
- reviews
- coupons
- media
- SEO
- site content
- notifications
- settings

### Customer dashboard

Create a customer account area for:

- orders
- wishlist
- addresses
- profile
- security
- support
- reviews
- recently viewed items

## 6. Required Environment Variables

The following environment variables should be prepared before implementation:

- NODE_ENV=development|production
- NEXT_PUBLIC_APP_URL=https://your-domain.com
- NEXT_PUBLIC_SITE_URL=https://your-domain.com
- DATABASE_URL=postgresql://...
- AUTH_SECRET=strong-random-secret
- JWT_SECRET=strong-random-secret
- JWT_EXPIRES_IN=7d
- RESEND_API_KEY=optional
- SMTP_HOST=optional
- SMTP_PORT=optional
- SMTP_USER=optional
- SMTP_PASS=optional
- EMAIL_FROM=dadur.bari.cloths@gmail.com
- FORMSPREE_ID=temporary-contact-form-id
- R2_ACCESS_KEY_ID=future
- R2_SECRET_ACCESS_KEY=future
- R2_BUCKET=future
- R2_ENDPOINT=future
- R2_PUBLIC_URL=future
- UPLOAD_SECRET=future

## 7. Required Future Services

### Neon PostgreSQL

Required for production data storage and future scalability.

### Vercel

Required for frontend deployment and Next.js hosting.

### Cloudflare R2

Required in the future for media storage and image delivery.

### Email or notification service

Use Formspree temporarily for contact or simple form submissions if needed, but the final platform should move to a real notification service such as Resend, SendGrid, or SMTP-based email delivery.

## 8. Risks

### Major risks

- The current MVP is still largely static and hardcoded, so replacing it with database-driven logic will require careful migration
- The current checkout form is only a placeholder and does not yet support real order persistence
- The current product pages do not yet reflect full variant and inventory logic
- The SRS requires a large number of modules, so implementation should be staged and verified
- Business rules such as COD, delivery charges, and pre-order behavior must remain configurable and not be hardcoded in a fragile way

### Mitigation strategy

- Preserve the current MVP until replacement is approved
- Introduce shared data models early
- Build the foundation in stages
- Keep the brand system and layout stable as the platform evolves
- Verify each stage before continuing

## 9. Step-by-Step Migration Plan from MVP to Final SRS Platform

### Phase 1: Stabilize the current experience

- Keep current pages intact as the visual baseline
- Introduce a shared layout and reusable design system
- Define a single source of truth for brand colors, typography, spacing, and UI components

### Phase 2: Introduce structured product data

- Replace hardcoded arrays with structured product data
- Add categories, collections, variants, pricing, and availability fields
- Support pre-order and in-stock states

### Phase 3: Create the data foundation

- Set up PostgreSQL and Drizzle schema
- Create tables for users, products, variants, collections, orders, payments, addresses, and settings
- Add seed data for initial categories and products

### Phase 4: Add authentication and authorization

- Implement registration, login, and password reset
- Add role-based access for admin and customer roles
- Protect admin routes and customer account routes

### Phase 5: Build the admin foundation

- Create the admin shell and dashboards
- Add product, order, customer, inventory, and settings management
- Make business rules configurable where possible

### Phase 6: Build the customer experience

- Add customer dashboard pages
- Add wishlist, order history, address book, and profile support
- Connect public pages to dynamic data

### Phase 7: Implement commerce workflows

- Connect cart and checkout to persistent order creation
- Support courier selection, payment method selection, and order summary
- Add transaction ID and payment verification flow

### Phase 8: Add analytics, notifications, and SEO

- Add analytics events and reporting views
- Add notifications for order and payment updates
- Add SEO metadata, sitemap, and schema support

### Phase 9: Hardening and deployment

- Improve performance, accessibility, and security
- Test checkout flow, admin workflows, and SEO
- Deploy to Vercel with production database and environment configuration

## 10. Final Recommendation

The best path is to keep the existing Next.js App Router project as the foundation and evolve it into a full-stack Next.js commerce platform with PostgreSQL, Drizzle ORM, role-based auth, and a comprehensive admin and customer experience. This approach is the most practical, least disruptive, and best aligned with the current repository.
