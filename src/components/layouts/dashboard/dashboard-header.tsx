"use client";

import React, { useEffect } from "react";
import { useDashboardLayout } from "@/contexts/dashboard-layout-context";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface HeaderSlotProps {
  children?: React.ReactNode;
}

export function HeaderSlot({ children }: HeaderSlotProps) {
  const { setHeaderSlot } = useDashboardLayout();

  useEffect(() => {
    setHeaderSlot(children);
    return () => setHeaderSlot(null); // Cleanup when component unmounts
  }, [children, setHeaderSlot]);

  return null; // This component doesn't render anything itself
}

// Convenience components for common header patterns
interface HeaderTitleProps {
  children: React.ReactNode;
}

export function HeaderTitle({ children }: HeaderTitleProps) {
  return (
    <HeaderSlot>
      <h1 className="text-dashboard-surface-foreground text-lg font-semibold">
        {children}
      </h1>
    </HeaderSlot>
  );
}

interface HeaderBreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export function HeaderBreadcrumbs({ items }: HeaderBreadcrumbsProps) {
  if (!items.length) return null;

  const lastItem = items[items.length - 1]!; // We know it exists because we checked length

  return (
    <HeaderSlot>
      {/* Mobile: Show only title */}
      <h1 className="text-dashboard-surface-foreground tablet:hidden text-lg font-semibold">
        {lastItem.label}
      </h1>

      {/* Desktop: Show full breadcrumbs */}
      <Breadcrumb className="tablet:block hidden">
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink
                    href={item.href}
                    className="text-dashboard-surface-foreground hover:text-sidebar-accent-foreground"
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-dashboard-surface-foreground">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && (
                <BreadcrumbSeparator className="text-dashboard-surface-foreground" />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </HeaderSlot>
  );
}

export function DashboardHeader() {
  const { headerSlot } = useDashboardLayout();

  return (
    <header className="bg-dashboard-surface flex h-[50px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {headerSlot}
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
