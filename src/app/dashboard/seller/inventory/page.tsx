import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardStats } from "@/components/layouts/dashboard/page/dashboard-stats";
import { Icons } from "@/components/icons";
import {
  IconPackage,
  IconAlertTriangle,
  IconTrendingDown,
} from "@tabler/icons-react";

export default function SellerInventoryPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Inventory", href: "/dashboard/seller/inventory" },
        ]}
      />
      <DashboardPageHeading
        title="Inventory Management"
        description="Monitor your stock levels and manage inventory."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconPackage className="h-5 w-5" />
            <span>Inventory Overview</span>
          </div>
        }
        defaultOpen={true}
      >
        <DashboardStats
          stats={[
            {
              title: "Total Products",
              value: "43",
              icon: <IconPackage className="h-4 w-4" />,
              trend: {
                value: "+3",
                isPositive: true,
                label: "new this month",
              },
              description: "Products in inventory",
            },
            {
              title: "Low Stock Alert",
              value: "7",
              icon: <IconAlertTriangle className="h-4 w-4" />,
              trend: {
                value: "+2",
                isPositive: false,
                label: "vs last week",
              },
              description: "Products with low stock",
            },
            {
              title: "Out of Stock",
              value: "3",
              icon: <IconTrendingDown className="h-4 w-4" />,
              trend: {
                value: "+1",
                isPositive: false,
                label: "vs last week",
              },
              description: "Products currently unavailable",
            },
          ]}
        />
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconAlertTriangle className="h-5 w-5" />
            <span>Low Stock Alerts</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground mb-4">
            Products that are running low on stock and need restocking.
          </p>
          <div className="space-y-3">
            {/* Placeholder low stock items */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <IconAlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Product {i}</p>
                    <p className="text-muted-foreground text-sm">
                      SKU: PRD-{1000 + i}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-orange-600">
                    {Math.floor(Math.random() * 5) + 1} units left
                  </span>
                  <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800">
                    Low Stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.building className="h-5 w-5" />
            <span>All Inventory</span>
          </div>
        }
        defaultOpen={false}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">
            Complete inventory list with stock levels, pricing, and management
            options will be displayed here.
          </p>
        </div>
      </CollapseSection>
    </>
  );
}
