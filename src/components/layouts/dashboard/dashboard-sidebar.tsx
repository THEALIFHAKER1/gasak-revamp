"use client";

import { useSidebarConfig } from "@/hooks/use-sidebar-config";
import type { DashboardRole } from "@/config/sidebar";
import * as React from "react";
import { Building2 } from "lucide-react";
import { NavMain, NavUser } from "@/components/ui/sidebar";
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
          logo={Building2}
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
