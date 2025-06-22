import { useSession } from "next-auth/react";
import { type UserRoleEnum } from "@/db/schema";

/**
 * Comprehensive client-side authentication hook
 * Uses User schema types for type safety through NextAuth session
 */
export default function useAuth() {
  const session = useSession();
  const user = session?.data?.user;
  const role = user?.role;

  return {
    // User data - complete User object from schema
    user,
    role,

    // Individual user properties for backwards compatibility
    id: user?.id,
    name: user?.name,
    email: user?.email,
    image: user?.image,
    ign: user?.ign,

    // Auth states
    isAuthenticated: !!user,
    isLoading: session.status === "loading",

    // Helper functions
    hasRole: (requiredRole: UserRoleEnum) => role === requiredRole,
    isAuthorized: (requiredRole: UserRoleEnum) =>
      !!user && role === requiredRole,
  };
}
