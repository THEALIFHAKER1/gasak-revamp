import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardStats } from "@/components/layouts/dashboard/page/dashboard-stats";
import {
  IconShoppingCart,
  IconClock,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

export default function SellerOrdersPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Orders", href: "/dashboard/seller/orders" },
        ]}
      />
      <DashboardPageHeading
        title="Orders Management"
        description="Track and manage all your customer orders."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconShoppingCart className="h-5 w-5" />
            <span>Orders Overview</span>
          </div>
        }
        defaultOpen={true}
      >
        <DashboardStats
          stats={[
            {
              title: "Pending Orders",
              value: "12",
              icon: <IconClock className="h-4 w-4" />,
              trend: {
                value: "+3",
                isPositive: true,
                label: "new today",
              },
              description: "Orders awaiting processing",
            },
            {
              title: "Completed Orders",
              value: "156",
              icon: <IconCheck className="h-4 w-4" />,
              trend: {
                value: "+8",
                isPositive: true,
                label: "this week",
              },
              description: "Successfully delivered",
            },
            {
              title: "Cancelled Orders",
              value: "5",
              icon: <IconX className="h-4 w-4" />,
              trend: {
                value: "-2",
                isPositive: true,
                label: "vs last week",
              },
              description: "Cancelled by customers",
            },
          ]}
        />
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconClock className="h-5 w-5" />
            <span>Recent Orders</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground mb-4">
            Recent orders will be displayed in a table format with customer
            details, order status, and actions.
          </p>
          <div className="space-y-3">
            {/* Placeholder order items */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <IconShoppingCart className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-muted-foreground text-sm">
                      Customer Name {i}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    ${(Math.random() * 200 + 50).toFixed(2)}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      i % 3 === 0
                        ? "bg-yellow-100 text-yellow-800"
                        : i % 3 === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {i % 3 === 0
                      ? "Pending"
                      : i % 3 === 1
                        ? "Completed"
                        : "Processing"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapseSection>
    </>
  );
}
