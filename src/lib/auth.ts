// SERVER SIDE ONLY ie. server components, api routes, server actions
import { auth } from "@/auth";
import { type UserRoleEnum } from "@/db/schema";
import { redirect } from "next/navigation";
import { getRoleBasedRedirect } from "@/routes";

/**
 * Get the current user with role verification
 * Redirects to login if not authenticated, redirects to appropriate dashboard if wrong role
 */
export async function requireRole(requiredRole: UserRoleEnum) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  if (user.role !== requiredRole) {
    const redirectUrl = getRoleBasedRedirect(user.role);
    redirect(redirectUrl);
  }

  return user;
}

// ========================================
// UNUSED FUNCTIONS (commented out)
// ========================================

// export async function currentUser() {
//   const session = await auth();
//   return session?.user;
// }

// export async function currentRole() {
//   const session = await auth();
//   return session?.user?.role;
// }

// /**
//  * Get current user's ID (server-side)
//  */
// export async function currentUserId() {
//   const session = await auth();
//   return session?.user?.id;
// }

// /**
//  * Get current user's email (server-side)
//  */
// export async function currentUserEmail() {
//   const session = await auth();
//   return session?.user?.email;
// }

// /**
//  * Get current user's name (server-side)
//  */
// export async function currentUserName() {
//   const session = await auth();
//   return session?.user?.name;
// }

// /**
//  * Get current user's IGN (server-side)
//  */
// export async function currentUserIGN() {
//   const session = await auth();
//   return session?.user?.ign;
// }

// /**
//  * Get current user's image (server-side)
//  */
// export async function currentUserImage() {
//   const session = await auth();
//   return session?.user?.image;
// }

// /**
//  * Check if current user has specific role (server-side)
//  * Returns boolean instead of redirecting
//  */
// export async function hasRole(requiredRole: UserRoleEnum) {
//   const session = await auth();
//   return session?.user?.role === requiredRole;
// }

// /**
//  * Check if user is authenticated (server-side)
//  */
// export async function isAuthenticated() {
//   const session = await auth();
//   return !!session?.user;
// }

// /**
//  * Check if current user is authorized for a specific role (server-side)
//  * Returns boolean, combination of authentication + role check
//  */
// export async function isAuthorized(requiredRole: UserRoleEnum) {
//   const session = await auth();
//   const user = session?.user;
//   return !!user && user.role === requiredRole;
// }

// /**
//  * Get current session (server-side)
//  * Useful when you need both user and session data
//  */
// export async function currentSession() {
//   return await auth();
// }

// /**
//  * Dynamic role requirement functions - automatically supports any role
//  * Creates functions like requireAdmin, requireLeader, requireMember
//  */
// export const requireRoleFunctions = Object.fromEntries(
//   userRoleEnum.enumValues.map((role) => [
//     `require${role.charAt(0).toUpperCase() + role.slice(1)}`,
//     () => requireRole(role),
//   ]),
// );

// /**
//  * Dynamic role check functions - automatically supports any role
//  * Creates functions like isAdmin, isLeader, isMember (server-side)
//  */
// export const roleCheckFunctions = Object.fromEntries(
//   userRoleEnum.enumValues.map((role) => [
//     `is${role.charAt(0).toUpperCase() + role.slice(1)}`,
//     () => hasRole(role),
//   ]),
// );

// /**
//  * Require authentication without role check
//  * Redirects to login if not authenticated, returns user if authenticated
//  */
// export async function requireAuth() {
//   const session = await auth();
//   const user = session?.user;

//   if (!user) {
//     redirect("/login");
//   }

//   return user;
// }

// /**
//  * Check if current user has any of the specified roles (server-side)
//  */
// export async function hasAnyRole(roles: UserRoleEnum[]) {
//   const session = await auth();
//   const userRole = session?.user?.role;
//   return !!userRole && roles.includes(userRole);
// }

// /**
//  * Check if current user has all of the specified roles (server-side)
//  * Note: In your current schema, a user can only have one role, so this will only return true for single-role arrays
//  */
// export async function hasAllRoles(roles: UserRoleEnum[]) {
//   if (roles.length !== 1) return false; // Users can only have one role in your schema
//   const role = roles[0];
//   if (!role) return false;
//   return hasRole(role);
// }
