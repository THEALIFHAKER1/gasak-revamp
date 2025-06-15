"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/theme-toggle";
import { useDashboardLayout } from "@/contexts/dashboard-layout-context";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export function DashboardContainer({
  children,
  scrollable = true,
}: DashboardContainerProps) {
  const { headerSlot } = useDashboardLayout();

  return (
    <>
      {/* Header */}
      <header className="flex h-[50px] shrink-0 items-center gap-2 bg-dashboard-surface transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {headerSlot}
        </div>
        <div className="ml-auto flex items-center gap-2 px-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      {scrollable ? (
        <div className="px-2 pb-2 h-[calc(100%-50px)] bg-dashboard-surface">
          <div className="border-dashboard-border border rounded-lg h-full overflow-hidden bg-background">
            <ScrollArea className="h-full">
              <div className="p-4">{children}</div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="px-2 pb-2 h-[calc(100%-50px)] bg-dashboard-surface">
          <div className="border-dashboard-border border rounded-lg h-full overflow-hidden bg-background">
            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
