import { useSession } from "next-auth/react";
import { type UserRoleEnum, userRoleEnum } from "@/db/schema";

/**
 * Comprehensive client-side authentication hook
 * Provides all auth states and role checks in one place
 */
export default function useAuth() {
  const session = useSession();
  const user = session?.data?.user;
  const role = user?.role;
  return {
    // User data
    user,
    role,

    // User profile info
    id: user?.id,
    name: user?.name,
    email: user?.email,
    image: user?.image,
    ign: user?.ign, // In-game name

    // Auth states
    isAuthenticated: !!user,
    isLoading: session.status === "loading",

    // Dynamic role checks - automatically supports any role from UserRoleEnum
    ...Object.fromEntries(
      userRoleEnum.enumValues.map((r) => [
        `is${r.charAt(0).toUpperCase() + r.slice(1)}`,
        role === r,
      ]),
    ),

    // Helper functions
    hasRole: (requiredRole: UserRoleEnum) => role === requiredRole,
    isAuthorized: (requiredRole: UserRoleEnum) =>
      !!user && role === requiredRole,
  };
}
