export const adminRoles = {
  OWNER: "OWNER",
  SUPER_ADMIN: "SUPER_ADMIN",
  MANAGER: "MANAGER",
  INVENTORY_STAFF: "INVENTORY_STAFF",
  CUSTOMER_SUPPORT: "CUSTOMER_SUPPORT",
  MARKETING_MANAGER: "MARKETING_MANAGER",
  CONTENT_MANAGER: "CONTENT_MANAGER",
  CUSTOMER: "CUSTOMER",
} as const;

export type AppRole = (typeof adminRoles)[keyof typeof adminRoles];

export const adminRoleHierarchy: Record<AppRole, AppRole[]> = {
  OWNER: ["SUPER_ADMIN", "MANAGER", "INVENTORY_STAFF", "CUSTOMER_SUPPORT", "MARKETING_MANAGER", "CONTENT_MANAGER", "CUSTOMER"],
  SUPER_ADMIN: ["MANAGER", "INVENTORY_STAFF", "CUSTOMER_SUPPORT", "MARKETING_MANAGER", "CONTENT_MANAGER", "CUSTOMER"],
  MANAGER: ["INVENTORY_STAFF", "CUSTOMER_SUPPORT", "MARKETING_MANAGER", "CONTENT_MANAGER", "CUSTOMER"],
  INVENTORY_STAFF: ["CUSTOMER"],
  CUSTOMER_SUPPORT: ["CUSTOMER"],
  MARKETING_MANAGER: ["CUSTOMER"],
  CONTENT_MANAGER: ["CUSTOMER"],
  CUSTOMER: [],
};

export function isAdminRole(role?: string): role is AppRole {
  return role !== undefined && Object.values(adminRoles).includes(role as AppRole);
}

export function canAccessAdminPanel(role?: string): boolean {
  return isAdminRole(role) && role !== adminRoles.CUSTOMER;
}
