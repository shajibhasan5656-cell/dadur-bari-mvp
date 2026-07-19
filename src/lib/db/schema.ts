import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role_type", [
  "OWNER",
  "SUPER_ADMIN",
  "MANAGER",
  "INVENTORY_STAFF",
  "CUSTOMER_SUPPORT",
  "MARKETING_MANAGER",
  "CONTENT_MANAGER",
  "CUSTOMER",
]);

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "active",
  "hidden",
  "out_of_stock",
  "coming_soon",
  "pre_order",
  "discontinued",
]);

export const availabilityEnum = pgEnum("availability_state", [
  "available",
  "low_stock",
  "pre_order",
  "sold_out",
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "verified",
  "failed",
  "refunded",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 50 }),
    passwordHash: varchar("password_hash", { length: 255 }),
    role: roleEnum("role").default("CUSTOMER"),
    status: varchar("status", { length: 50 }).default("active"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    phoneIdx: index("users_phone_idx").on(table.phone),
    createdAtIdx: index("users_created_at_idx").on(table.createdAt),
  }),
);

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    description: text("description"),
    isSystemRole: boolean("is_system_role").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    nameIdx: index("roles_name_idx").on(table.name),
  }),
);

export const permissions = pgTable(
  "permissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    nameIdx: index("permissions_name_idx").on(table.name),
  }),
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    roleId: uuid("role_id").notNull(),
    permissionId: uuid("permission_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    roleIdx: index("role_permissions_role_idx").on(table.roleId),
    permissionIdx: index("role_permissions_permission_idx").on(table.permissionId),
  }),
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    slugIdx: index("categories_slug_idx").on(table.slug),
  }),
);

export const collections = pgTable(
  "collections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    slugIdx: index("collections_slug_idx").on(table.slug),
  }),
);

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    status: productStatusEnum("status").default("draft"),
    availability: availabilityEnum("availability").default("pre_order"),
    categoryId: uuid("category_id"),
    collectionId: uuid("collection_id"),
    price: integer("price").default(0),
    description: text("description"),
    fabric: varchar("fabric", { length: 255 }),
    gsm: varchar("gsm", { length: 50 }),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    isFeatured: boolean("is_featured").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    slugIdx: index("products_slug_idx").on(table.slug),
    createdAtIdx: index("products_created_at_idx").on(table.createdAt),
  }),
);

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull(),
    size: varchar("size", { length: 50 }),
    color: varchar("color", { length: 100 }),
    quality: varchar("quality", { length: 50 }),
    fabric: varchar("fabric", { length: 255 }),
    gsm: varchar("gsm", { length: 50 }),
    price: integer("price").default(0),
    stock: integer("stock").default(0),
    sku: varchar("sku", { length: 100 }),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    productIdx: index("product_variants_product_idx").on(table.productId),
    skuIdx: index("product_variants_sku_idx").on(table.sku),
  }),
);

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull(),
    variantId: uuid("variant_id"),
    imageUrl: varchar("image_url", { length: 1024 }).notNull(),
    altText: varchar("alt_text", { length: 255 }),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    productIdx: index("product_images_product_idx").on(table.productId),
  }),
);

export const inventory = pgTable(
  "inventory",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id"),
    variantId: uuid("variant_id"),
    stock: integer("stock").default(0),
    lowStockThreshold: integer("low_stock_threshold").default(5),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    productIdx: index("inventory_product_idx").on(table.productId),
    variantIdx: index("inventory_variant_idx").on(table.variantId),
  }),
);

export const inventoryLogs = pgTable(
  "inventory_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id"),
    variantId: uuid("variant_id"),
    action: varchar("action", { length: 100 }).notNull(),
    quantity: integer("quantity").default(0),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    productIdx: index("inventory_logs_product_idx").on(table.productId),
  }),
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderNumber: varchar("order_number", { length: 100 }).notNull().unique(),
    customerId: uuid("customer_id"),
    status: orderStatusEnum("status").default("pending"),
    subtotal: integer("subtotal").default(0),
    deliveryCharge: integer("delivery_charge").default(0),
    total: integer("total").default(0),
    paymentMethod: varchar("payment_method", { length: 50 }),
    paymentStatus: paymentStatusEnum("payment_status").default("pending"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    customerIdx: index("orders_customer_idx").on(table.customerId),
    statusIdx: index("orders_status_idx").on(table.status),
    createdAtIdx: index("orders_created_at_idx").on(table.createdAt),
    orderNumberIdx: index("orders_order_number_idx").on(table.orderNumber),
  }),
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id").notNull(),
    productId: uuid("product_id"),
    variantId: uuid("variant_id"),
    quantity: integer("quantity").default(1),
    unitPrice: integer("unit_price").default(0),
    totalPrice: integer("total_price").default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    orderIdx: index("order_items_order_idx").on(table.orderId),
    productIdx: index("order_items_product_idx").on(table.productId),
  }),
);

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id"),
    provider: varchar("provider", { length: 50 }),
    transactionId: varchar("transaction_id", { length: 255 }),
    amount: integer("amount").default(0),
    status: paymentStatusEnum("status").default("pending"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    orderIdx: index("payments_order_idx").on(table.orderId),
    transactionIdx: index("payments_transaction_idx").on(table.transactionId),
  }),
);

export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    fullName: varchar("full_name", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    district: varchar("district", { length: 255 }),
    area: varchar("area", { length: 255 }),
    street: text("street"),
    deliveryNote: text("delivery_note"),
    isDefault: boolean("is_default").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    userIdx: index("addresses_user_idx").on(table.userId),
  }),
);

export const wishlists = pgTable(
  "wishlists",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    productId: uuid("product_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdx: index("wishlists_user_idx").on(table.userId),
    productIdx: index("wishlists_product_idx").on(table.productId),
  }),
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    productId: uuid("product_id").notNull(),
    rating: integer("rating").default(5),
    title: varchar("title", { length: 255 }),
    body: text("body"),
    isApproved: boolean("is_approved").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    productIdx: index("reviews_product_idx").on(table.productId),
    userIdx: index("reviews_user_idx").on(table.userId),
  }),
);

export const coupons = pgTable(
  "coupons",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: varchar("code", { length: 100 }).notNull().unique(),
    discountType: varchar("discount_type", { length: 50 }).default("fixed"),
    discountValue: integer("discount_value").default(0),
    isActive: boolean("is_active").default(true),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    codeIdx: index("coupons_code_idx").on(table.code),
  }),
);

export const couponUsage = pgTable(
  "coupon_usage",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    couponId: uuid("coupon_id").notNull(),
    userId: uuid("user_id"),
    orderId: uuid("order_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    couponIdx: index("coupon_usage_coupon_idx").on(table.couponId),
    orderIdx: index("coupon_usage_order_idx").on(table.orderId),
  }),
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    recipientId: uuid("recipient_id"),
    title: varchar("title", { length: 255 }).notNull(),
    body: text("body"),
    isRead: boolean("is_read").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    recipientIdx: index("notifications_recipient_idx").on(table.recipientId),
    createdAtIdx: index("notifications_created_at_idx").on(table.createdAt),
  }),
);

export const supportTickets = pgTable(
  "support_tickets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id"),
    subject: varchar("subject", { length: 255 }).notNull(),
    message: text("message"),
    status: varchar("status", { length: 50 }).default("open"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    userIdx: index("support_tickets_user_idx").on(table.userId),
    statusIdx: index("support_tickets_status_idx").on(table.status),
  }),
);

export const activityLogs = pgTable(
  "activity_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorId: uuid("actor_id"),
    action: varchar("action", { length: 255 }).notNull(),
    entityType: varchar("entity_type", { length: 100 }),
    entityId: uuid("entity_id"),
    meta: jsonb("meta"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    actorIdx: index("activity_logs_actor_idx").on(table.actorId),
    createdAtIdx: index("activity_logs_created_at_idx").on(table.createdAt),
  }),
);

export const siteSettings = pgTable(
  "site_settings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: varchar("key", { length: 255 }).notNull().unique(),
    value: text("value"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    keyIdx: index("site_settings_key_idx").on(table.key),
  }),
);

export const seoSettings = pgTable(
  "seo_settings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    entityType: varchar("entity_type", { length: 100 }),
    entityId: uuid("entity_id"),
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),
    canonicalUrl: varchar("canonical_url", { length: 1024 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    entityIdx: index("seo_settings_entity_idx").on(table.entityType),
  }),
);

export const mediaLibrary = pgTable(
  "media_library",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileUrl: varchar("file_url", { length: 1024 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }),
    sizeBytes: integer("size_bytes").default(0),
    altText: varchar("alt_text", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
  },
  (table) => ({
    fileNameIdx: index("media_library_file_name_idx").on(table.fileName),
  }),
);

export const schema = {
  users,
  roles,
  permissions,
  rolePermissions,
  categories,
  collections,
  products,
  productVariants,
  productImages,
  inventory,
  inventoryLogs,
  orders,
  orderItems,
  payments,
  addresses,
  wishlists,
  reviews,
  coupons,
  couponUsage,
  notifications,
  supportTickets,
  activityLogs,
  siteSettings,
  seoSettings,
  mediaLibrary,
};

export type AppSchema = typeof schema;
