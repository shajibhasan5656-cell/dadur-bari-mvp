# Dadur Bari Digital Commerce Platform

## 1. Product Overview

Dadur Bari is a premium digital commerce platform for custom printed T-shirts and apparel. The platform must feel elegant, modern, trustworthy, and premium rather than like a generic e-commerce template.

- Brand: Dadur Bari
- Tagline: Wear Your Identity.
- Business phone / payment number: 01746-212501
- Email: dadur.bari.cloths@gmail.com
- Address: Khetlal, Joypurhat, Rajshahi, Bangladesh

## 2. Brand Identity and Experience

The digital experience must reflect the following brand qualities:

- Premium
- Elegant
- Minimal
- Modern
- Trustworthy
- Comfortable
- Confident
- Timeless

### Brand Colors

- Primary Black: #111111
- Premium Gold: #C8A45D
- Heritage Green: #2E3A2F
- Warm Ivory: #F3EFE6
- White: #FFFFFF

### Typography

- Headings: Poppins
- Body text: Inter

### Visual Direction

The website must communicate quality, heritage, craftsmanship, and exclusivity. Every page should feel curated and brand-led rather than template-based.

## 3. Core Business Model

### Business Focus

- Primary product focus: premium custom printed T-shirts
- Printing technology: DTF Direct To Film
- Sales model: Pre Order and In Stock
- Pre Order must be the primary business strategy

### Product Categories

Products must support the following categories:

- Silver
- Gold
- Premium

Each category must support independent configuration for:

- Fabric
- GSM
- Price
- Description
- Features
- Stock
- Images

All category and business rules must be editable from the admin panel. No final implementation should rely on hardcoded business logic.

## 4. Delivery and Logistics

### Courier Partners

- Steadfast
- Sundarban

### Delivery Timeline

- Inside Joypurhat: 1–2 days
- Outside Joypurhat: 2–4 days

### Delivery Charges

- Inside Joypurhat: 100 BDT
- Outside Joypurhat: 150 BDT

### COD Rule

Cash on Delivery is supported only when the delivery charge is paid in advance.

## 5. Payment Methods

Supported payment options:

- bKash
- Nagad
- Rocket
- Cash on Delivery

All payment methods must use the same business number:

- 01746-212501

### Payment Workflow

- Admin manually verifies payment
- Future payment gateway readiness must include:
  - SSLCommerz
  - ShurjoPay
  - Stripe

## 6. Product Requirements

### Product Statuses

Products must support these statuses:

- Active
- Draft
- Hidden
- Out of Stock
- Coming Soon
- Pre Order
- Discontinued

### Availability States

- Available
- Low Stock
- Pre Order
- Sold Out

### Product Variants

Each product must support variants for:

- Size
- Color
- Category / quality
- Fabric
- GSM
- Price
- Stock
- SKU

### Initial Sizes

- M
- L
- XL
- XXL

### Product Page Requirements

The product detail page must include:

- Product gallery
- Product title
- Price
- Status
- Description
- Quality selection
- Size selection
- Quantity selector
- Add to cart
- Buy now
- Wishlist
- Delivery information
- Fabric information
- DTF information
- Specifications
- Trust badges
- Related products
- Reviews
- FAQ
- SEO metadata

## 7. Website Structure

### Core Public Pages

- Homepage
- Shop
- Collection pages
- Product details
- Cart
- Checkout
- Order success
- Track order
- Wishlist
- Customer dashboard
- Login
- Register
- Forgot password
- About
- Contact
- FAQ
- Privacy Policy
- Return Policy
- Shipping Policy
- Terms and Conditions
- 404 page

### Homepage Sections

The homepage must include:

- Announcement bar
- Sticky header
- Hero banner
- Featured collections
- Shop by category / quality
- Silver Collection
- Gold Collection
- Premium Collection
- Best Sellers
- New Arrivals
- Pre Order section
- DTF Printing story
- Brand story
- Why Dadur Bari
- Customer reviews
- Instagram feed
- Newsletter
- Footer

## 8. Shop and Catalog Experience

The shop experience must include:

- Product grid
- Search
- Filters for collection, category, price, availability, size, color
- Sort options for newest, most popular, best selling, price low to high, price high to low, highest rated, alphabetical
- Empty results state
- Quick view
- Wishlist support
- Pagination or load more behavior
- SEO-optimized collection pages

## 9. Cart, Checkout, Order, and Payment Experience

The commerce flow must support:

- Guest checkout
- Logged-in checkout
- Customer information capture
- Delivery address capture
- Courier selection
- Payment method selection
- Payment instructions
- Order summary
- Clear COD information
- Transaction ID entry
- Optional payment screenshot upload
- Order success page
- Order tracking

## 10. Customer Account Requirements

The customer dashboard must provide:

- Overview cards
- My orders
- Order details
- Order timeline
- Wishlist
- Address book
- Coupons
- Notifications
- Profile
- Change password
- Account security
- Support center
- Returns and exchanges
- Invoice access
- Reviews
- Recently viewed

## 11. Admin Panel Requirements

The admin panel must allow the business owner to run the business without writing any code. It must include:

- Dashboard
- Products
- Orders
- Customers
- Categories
- Collections
- Inventory
- Reviews
- Coupons
- Analytics
- Reports
- Media library
- SEO
- Website content
- Notifications
- Support tickets
- Settings
- Roles and permissions
- Activity logs
- Security dashboard
- System health

## 12. Data and Database Requirements

The system must use PostgreSQL as the primary database. Drizzle ORM is preferred.

### Required Data Entities

- users
- roles
- permissions
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
- transactions
- addresses
- wishlists
- reviews
- coupons
- coupon_usage
- notifications
- support_tickets
- activity_logs
- seo_settings
- site_settings
- media_library
- banners
- faqs
- blogs future

### Data Handling Rules

- Soft delete where needed
- Index the following fields:
  - email
  - phone
  - slug
  - sku
  - order_number
  - transaction_id
  - created_at

The architecture must be future-ready for:

- AI features
- Mobile app integration
- Multi-language support
- Multi-currency support

## 13. Backend and API Requirements

The backend must expose a REST API under /api/v1 with modules for:

- Authentication
- Products
- Cart
- Checkout
- Orders
- Customers
- Admin
- Analytics
- Inventory
- Media
- SEO
- Settings

### API Response Format

Each API response must follow a consistent structure:

- success: true or false
- message
- data
- errors

## 14. Security Requirements

The platform must enforce:

- Email and phone plus password authentication
- Argon2 preferred; bcrypt as alternative
- JWT with secure HTTP-only cookies
- Role-based authorization
- Roles including Owner, Super Admin, Manager, Inventory Staff, Customer Support, Marketing Manager, Content Manager, and Customer
- Rate limiting
- CSRF protection
- XSS protection
- SQL injection protection
- Secure file upload
- Audit logs
- HTTPS only
- Security headers

## 15. Performance and Quality Requirements

The final platform must meet the following targets:

- Homepage under 2 seconds
- Product page under 2 seconds
- Checkout under 2 seconds
- API reads below 300ms
- Lighthouse performance 95+
- Accessibility 95+
- Best practices 100
- SEO 100

Additional expectations:

- Image optimization
- Lazy loading
- CDN readiness
- Caching
- Monitoring

## 16. SEO Requirements

The platform must support:

- Meta titles
- Meta descriptions
- Canonical URLs
- Open Graph tags
- Twitter cards
- Structured data
- Product schema
- Organization schema
- Website schema
- Breadcrumb schema
- FAQ schema
- XML sitemap
- robots.txt
- SEO admin dashboard

## 17. Analytics and Notifications

The system must support analytics across:

- Sales
- Products
- Customers
- Orders
- Inventory
- Revenue
- Payments
- Marketing
- Conversion funnel
- Cart abandonment

Notification support must include:

- Website notifications
- Email notifications
- SMS future readiness
- WhatsApp future readiness
- Push future readiness
- Order updates
- Payment updates
- Security alerts
- Marketing notifications
- Admin notifications
- Notification preferences

## 18. Testing and Release Requirements

The platform must be validated through:

- Functional testing
- UI testing
- Responsive testing
- UX testing
- Performance testing
- Security testing
- Payment testing
- Order workflow testing
- SEO testing
- Accessibility testing
- API testing
- Admin testing
- Regression testing

## 19. Deployment Requirements

### Recommended Delivery Stack

- Frontend: Vercel
- Backend: Railway or Render, or Next.js API routes depending on final architecture decision
- Database: Neon PostgreSQL
- Storage: Cloudflare R2
- CI/CD: GitHub Actions
- SSL: Required
- Backups: Required
- Rollback plan: Required
- Go-live checklist: Required

## 20. Final Product Intent

The final Dadur Bari platform must be a complete, scalable, premium commerce system that supports both business operations and customer experience. It must be configurable through admin tools, future-ready for growth, and aligned with the Dadur Bari brand identity.
