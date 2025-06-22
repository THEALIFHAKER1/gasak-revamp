"use client";

import { useMemo } from "react";
import { getSidebarConfig, type DashboardRole } from "@/config/sidebar";
import type { SidebarData, SidebarConfig } from "@/types/sidebar";
import useAuth from "@/hooks/use-auth";

interface UseSidebarConfigOptions {
  role: DashboardRole;
  customData?: Partial<SidebarData>;
  customConfig?: Partial<SidebarConfig>;
}

export function useSidebarConfig({
  role,
  customData,
  customConfig,
}: UseSidebarConfigOptions) {
  const { user: loggedUser, isAuthenticated } = useAuth();

  return useMemo(() => {
    const baseConfig = getSidebarConfig(role);    // Use logged user data if available, otherwise fallback to static data
    const userData =
      isAuthenticated && loggedUser
        ? {
            name: loggedUser.name ?? "Unknown User",
            email: loggedUser.email ?? "unknown@gasak.com",
            image: loggedUser.image ?? "/avatars/default.jpg",
          }
        : baseConfig.data.user ?? {
            name: "Unknown User",
            email: "unknown@gasak.com", 
            image: "/avatars/default.jpg",
          };

    const data = {
      ...baseConfig.data,
      user: userData,
      ...customData,
    };

    return {
      data,
      config: customConfig
        ? { ...baseConfig.config, ...customConfig }
        : baseConfig.config,
    };
  }, [role, loggedUser, isAuthenticated, customData, customConfig]);
}
