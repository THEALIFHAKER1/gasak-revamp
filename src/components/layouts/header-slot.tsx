"use client";

import React, { useEffect } from "react";
import { useDashboardLayout } from "@/contexts/dashboard-layout-context";
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
  return (
    <HeaderSlot>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem className="tablet:block hidden">
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
                <BreadcrumbSeparator className="tablet:block text-dashboard-surface-foreground hidden" />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </HeaderSlot>
  );
}
