import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardStats } from "@/components/layouts/dashboard/page/dashboard-stats";
import { Icons } from "@/components/icons";
import { IconChartBar, IconEye, IconShoppingCart } from "@tabler/icons-react";

export default function SellerAnalyticsPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Analytics", href: "/dashboard/seller/analytics" },
        ]}
      />
      <DashboardPageHeading
        title="Sales Analytics"
        description="Analyze your sales performance and customer behavior."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconChartBar className="h-5 w-5" />
            <span>Performance Metrics</span>
          </div>
        }
        defaultOpen={true}
      >
        <DashboardStats
          stats={[
            {
              title: "Monthly Revenue",
              value: "$24,847",
              icon: <Icons.trendingUp className="h-4 w-4" />,
              trend: {
                value: "+18.2%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Total revenue this month",
            },
            {
              title: "Page Views",
              value: "12,458",
              icon: <IconEye className="h-4 w-4" />,
              trend: {
                value: "+25.3%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Product page visits",
            },
            {
              title: "Conversion Rate",
              value: "3.2%",
              icon: <IconShoppingCart className="h-4 w-4" />,
              trend: {
                value: "+0.8%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Visitor to customer rate",
            },
            {
              title: "Avg. Order Value",
              value: "$159.32",
              icon: <Icons.trendingUp className="h-4 w-4" />,
              trend: {
                value: "+12.5%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Average value per order",
            },
          ]}
        />
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconChartBar className="h-5 w-5" />
            <span>Sales Chart</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground mb-4">
            Interactive sales charts showing revenue trends, top-selling
            products, and customer analytics will be displayed here.
          </p>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
            <p className="text-gray-500">Sales Chart Placeholder</p>
          </div>
        </div>
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.crown className="h-5 w-5" />
            <span>Top Performing Products</span>
          </div>
        }
        defaultOpen={false}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground mb-4">
            Your best-selling products based on revenue and quantity sold.
          </p>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-sm font-bold text-blue-600">
                      #{i}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Product {i}</p>
                    <p className="text-muted-foreground text-sm">
                      {Math.floor(Math.random() * 100) + 20} sold
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(Math.random() * 5000 + 1000).toFixed(2)}
                  </p>
                  <p className="text-muted-foreground text-sm">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapseSection>
    </>
  );
}
