"use client";

import React from "react";
import { DashboardHeader } from "./dashboard-header";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export function DashboardContainer({
  children,
  scrollable = true,
}: DashboardContainerProps) {
  return (
    <>
      {/* Header */}
      <DashboardHeader />

      {/* Content */}
      {scrollable ? (
        <div className="bg-dashboard-surface h-[calc(100dvh-50px)] px-2 pb-2">
          <div className="border-dashboard-border bg-background h-full overflow-hidden rounded-lg border">
            <ScrollArea className="h-full">
              <div className="p-4">{children}</div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="bg-dashboard-surface h-[calc(100dvh-50px)] px-2 pb-2">
          <div className="border-dashboard-border bg-background h-full overflow-hidden rounded-lg border">
            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
