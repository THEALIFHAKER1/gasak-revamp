import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/theme-toggle";

interface DashboardHeaderProps {
  title?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export function DashboardHeader({ title, breadcrumbs }: DashboardHeaderProps) {
  return (
    <header className="bg-dashboard-surface flex h-[50px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem className="tablet:block hidden">
                    {crumb.href ? (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="text-dashboard-surface-foreground hover:text-sidebar-accent-foreground"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-dashboard-surface-foreground">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="tablet:block text-dashboard-surface-foreground hidden" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          title && (
            <h1 className="text-dashboard-surface-foreground text-lg font-semibold">
              {title}
            </h1>
          )
        )}
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
