"use client";

import { useSidebarConfig } from "@/hooks/use-sidebar-config";
import type { DashboardRole } from "@/config/sidebar";
import * as React from "react";
import { NavMain, NavUser } from "@/components/ui/sidebar";
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
  const { data, config } = useSidebarConfig({
    role,
    customData,
    customConfig,
  });

  return (
    <Sidebar collapsible={config.collapsible}>
      <SidebarHeader>
        <SidebarBrand
          logo={GasakLogo}
          title="GASAK"
          subtitle="Dashboard Management"
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain && <NavMain items={data.navMain} />}
      </SidebarContent>
      {config.showUser && data.user && (
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
