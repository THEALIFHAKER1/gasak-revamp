"use client";

import { getSidebarConfig, type DashboardRole } from "@/config/sidebar";
import * as React from "react";
import { NavMain, NavUser } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { SidebarData, SidebarConfig } from "@/types/sidebar";
import useAuth from "@/hooks/use-auth";

interface DashboardSidebarProps {
  role: DashboardRole;
  className?: string;
  customData?: Partial<SidebarData>;
  customConfig?: Partial<SidebarConfig>;
}

// Custom logo component for GASAK
const GasakLogo = ({ className }: { className?: string }) => (
  <Image
    src="/logo.png"
    alt="GASAK Logo"
    width={40}
    height={40}
    className={className}
  />
);

export function DashboardSidebar({
  role,
  customData,
  customConfig,
}: DashboardSidebarProps) {
  const { user: loggedUser, isAuthenticated, isLoading } = useAuth();

  const baseConfig = getSidebarConfig(role);
  const userData = React.useMemo(
    () =>
      isAuthenticated && loggedUser && loggedUser.name && loggedUser.email
        ? {
            name: loggedUser.name,
            email: loggedUser.email,
            image: loggedUser.image ?? null,
          }
        : null,
    [isAuthenticated, loggedUser],
  );
  const data = {
    ...baseConfig.data,
    user: userData,
    ...customData,
  };

  const config = customConfig
    ? { ...baseConfig.config, ...customConfig }
    : baseConfig.config;
  // Loading skeleton component for user section
  const UserSkeleton = () => (
    <div className="flex items-center gap-2 px-1 py-1.5">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="grid flex-1 gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );

  // Loading skeleton for navigation items
  const NavSkeleton = () => (
    <div className="space-y-2 p-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1.5">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );

  return (
    <Sidebar collapsible={config.collapsible}>
      <SidebarHeader>
        <SidebarBrand
          logo={GasakLogo}
          title="GASAK"
          subtitle="Dashboard Management"
        />{" "}
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <NavSkeleton />
        ) : (
          data.navMain && <NavMain items={data.navMain} />
        )}
      </SidebarContent>{" "}
      {config.showUser && (
        <SidebarFooter>
          {isLoading ? (
            <UserSkeleton />
          ) : (
            userData && <NavUser user={userData} />
          )}
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
