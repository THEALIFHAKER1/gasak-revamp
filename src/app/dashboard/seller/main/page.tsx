import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardStats } from "@/components/layouts/dashboard/page/dashboard-stats";
import { Icons } from "@/components/icons";
import {
  IconShoppingCart,
  IconPackage,
  IconTrendingUp,
} from "@tabler/icons-react";

export default function SellerDashboardMainPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Seller Portal", href: "/dashboard/seller" },
          { label: "Main Dashboard" },
        ]}
      />
      <DashboardPageHeading
        title="Welcome back, Seller! 🛍️"
        description="Manage your products, track sales, and grow your business."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconTrendingUp className="h-5 w-5" />
            <span>Sales Overview</span>
          </div>
        }
        defaultOpen={true}
      >
        <DashboardStats
          stats={[
            {
              title: "Total Revenue",
              value: "$24,847",
              icon: <Icons.trendingUp className="h-4 w-4" />,
              trend: {
                value: "+18.2%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Total sales revenue this month",
            },
            {
              title: "Orders",
              value: "156",
              icon: <IconShoppingCart className="h-4 w-4" />,
              trend: {
                value: "+12.5%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Total orders processed",
            },
            {
              title: "Products Listed",
              value: "43",
              icon: <IconPackage className="h-4 w-4" />,
              trend: {
                value: "+3",
                isPositive: true,
                label: "new this month",
              },
              description: "Active product listings",
            },
            {
              title: "Conversion Rate",
              value: "3.2%",
              icon: <Icons.trendingUp className="h-4 w-4" />,
              trend: {
                value: "+0.8%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Visitor to customer rate",
            },
          ]}
        />
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconShoppingCart className="h-5 w-5" />
            <span>Recent Orders</span>
          </div>
        }
        defaultOpen={false}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">
            Recent orders will be displayed here. This section will show the
            latest customer orders with details like order ID, customer name,
            total amount, and status.
          </p>
        </div>
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconPackage className="h-5 w-5" />
            <span>Inventory Status</span>
          </div>
        }
        defaultOpen={false}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">
            Inventory status overview will be displayed here. This section will
            show low stock alerts, out-of-stock items, and overall inventory
            health.
          </p>
        </div>
      </CollapseSection>
    </>
  );
}
