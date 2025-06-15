"use client"

import { useMemo } from "react"
import { getSidebarConfig, type DashboardRole } from "@/config/sidebar"
import type { SidebarData, SidebarConfig } from "@/types/sidebar"

interface UseSidebarConfigOptions {
  role: DashboardRole
  customData?: Partial<SidebarData>
  customConfig?: Partial<SidebarConfig>
}

export function useSidebarConfig({ 
  role, 
  customData, 
  customConfig 
}: UseSidebarConfigOptions) {
  return useMemo(() => {
    const baseConfig = getSidebarConfig(role)
    
    return {
      data: customData ? { ...baseConfig.data, ...customData } : baseConfig.data,
      config: customConfig ? { ...baseConfig.config, ...customConfig } : baseConfig.config,
    }
  }, [role, customData, customConfig])
}
