import type { AppRole } from "@/lib/auth/roles";

export const permissionCatalog = {
  viewDashboard: "viewDashboard",
  manageOrders: "manageOrders",
  manageProducts: "manageProducts",
  manageInventory: "manageInventory",
  manageCustomers: "manageCustomers",
  manageContent: "manageContent",
  manageSettings: "manageSettings",
  manageUsers: "manageUsers",
} as const;

export function hasPermission(
  role: AppRole | undefined,
  permission: keyof typeof permissionCatalog,
): boolean {
  if (!role) {
    return false;
  }

  if (role === "OWNER" || role === "SUPER_ADMIN") {
    return true;
  }

  const managerPermissions: Array<keyof typeof permissionCatalog> = [
    permissionCatalog.viewDashboard,
    permissionCatalog.manageOrders,
    permissionCatalog.manageProducts,
    permissionCatalog.manageInventory,
    permissionCatalog.manageContent,
  ];

  if (role === "MANAGER") {
    return managerPermissions.includes(permission);
  }

  return false;
}
