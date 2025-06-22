import { type UserRoleEnum, userRoleEnum } from "@/db/schema";

export const publicRoutes = ["/"];
export const authRoutes = ["/login", "/error"];
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Define role-based route patterns dynamically
export const roleBasedRoutes = Object.fromEntries(
  userRoleEnum.enumValues.map((role) => [role, `/dashboard/${role}`]),
) as Record<UserRoleEnum, string>;

/**
 * Check if a route is accessible for a given role
 */
export function isRouteAccessibleForRole(
  pathname: string,
  userRole: UserRoleEnum,
): boolean {
  return pathname.startsWith(roleBasedRoutes[userRole]);
}

/**
 * Get the default redirect URL for a user role
 */
export function getRoleBasedRedirect(role: UserRoleEnum): string {
  return roleBasedRoutes[role] ?? DEFAULT_LOGIN_REDIRECT;
}

/**
 * Check if a pathname is a protected dashboard route
 */
export function isProtectedRoute(pathname: string): boolean {
  return pathname.startsWith("/dashboard/");
}
