# Next Agent Tasks for Dadur Bari

## Purpose

These tasks are designed for the next implementation stages. They are intentionally small, safe, and documentation-driven so that the next agent can build incrementally without changing the current MVP unexpectedly.

## Stage 3: Shared Brand System and Layout

### Task

Create a shared design foundation for the current MVP without changing page behavior.

### Scope

- Define a reusable brand system for colors, typography, spacing, buttons, cards, and sections
- Create shared layout primitives for header, footer, and page shell
- Keep existing pages functional while aligning them visually with the SRS

### Acceptance criteria

- Brand tokens are defined in one place
- Shared layout components exist
- Existing pages continue to render correctly

## Stage 4: Product Data Structure

### Task

Replace hardcoded product arrays with a structured data model plan.

### Scope

- Define product fields for title, slug, status, availability, category, price, fabric, GSM, images, and variants
- Define initial sample data for Silver, Gold, and Premium collections
- Prepare the data shape for future database integration

### Acceptance criteria

- Product data structure is documented and ready for implementation
- Product fields match the SRS requirements
- Product variants and availability states are represented

## Stage 5: Public Pages Enhancement

### Task

Enhance the public experience while preserving the current page routes.

### Scope

- Improve homepage sections to match the SRS structure
- Add collection and content sections for Silver, Gold, Premium, pre-order, story, reviews, and newsletter
- Ensure SEO metadata structure is prepared for future implementation

### Acceptance criteria

- Homepage includes the required major sections in plan form
- Public pages are aligned with the SRS content structure
- Existing routes remain intact

## Stage 6: Cart and Checkout Improvement

### Task

Improve the cart and checkout experience without breaking the existing MVP flow.

### Scope

- Add clearer cart summary and checkout structure
- Introduce delivery charge and COD messaging in a structured way
- Prepare payment method and transaction fields aligned with the SRS

### Acceptance criteria

- Checkout flow reflects the business rules from the SRS
- COD and delivery charge messaging is explicit
- The current flow remains functional and safe to extend

## Stage 7: Admin Foundation

### Task

Create the groundwork for an admin panel.

### Scope

- Define the admin route structure
- Create a basic dashboard shell and navigation modules
- Prepare modules for products, orders, inventory, settings, content, and media

### Acceptance criteria

- Admin route structure is documented and scaffolded
- Core modules are planned and ready for implementation
- Role-based administration is accounted for

## Stage 8: Database/Auth Foundation

### Task

Set up the foundation for persistence and secure user access.

### Scope

- Create the initial PostgreSQL schema plan using Drizzle ORM
- Define core tables for users, products, variants, orders, payments, addresses, and settings
- Prepare authentication and role permission structure

### Acceptance criteria

- Database schema plan exists
- Auth and role model are documented
- Environment variables and secrets are listed

## Stage 9: Orders/Payment

### Task

Prepare the order and payment workflow for the final platform.

### Scope

- Define order creation flow
- Define transaction handling and payment verification rules
- Support COD and digital payment methods according to the SRS
- Document how admin verification will work

### Acceptance criteria

- Order lifecycle is documented
- Payment workflow supports manual verification and future gateway integration
- COD rules are preserved

## Stage 10: Final QA/Deploy

### Task

Prepare the project for release quality checks and deployment.

### Scope

- Validate design, content, performance, accessibility, and SEO readiness
- Prepare production environment and deployment checklist
- Review security, backup, and rollback considerations

### Acceptance criteria

- QA checklist exists
- Deployment checklist exists
- Production readiness is documented
