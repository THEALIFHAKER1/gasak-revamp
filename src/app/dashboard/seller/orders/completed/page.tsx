import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { Icons } from "@/components/icons";
import { IconCheck, IconShoppingCart } from "@tabler/icons-react";

export default function SellerCompletedOrdersPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Orders", href: "/dashboard/seller/orders" },
          { label: "Completed Orders" },
        ]}
      />
      <DashboardPageHeading
        title="Completed Orders"
        description="View all successfully completed and delivered orders."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconCheck className="h-5 w-5" />
            <span>Successfully Completed Orders</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-green-200 bg-green-50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <IconShoppingCart className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Order #{900 + i}</h3>
                      <p className="text-muted-foreground text-sm">
                        Customer: Jane Smith {i}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(Math.random() * 300 + 75).toFixed(2)}
                    </p>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      Delivered
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 md:grid-cols-4">
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Order Date
                    </label>
                    <p className="text-sm">
                      {new Date(
                        Date.now() - Math.random() * 86400000 * 30,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Delivered Date
                    </label>
                    <p className="text-sm">
                      {new Date(
                        Date.now() - Math.random() * 86400000 * 7,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Items
                    </label>
                    <p className="text-sm">
                      {Math.floor(Math.random() * 4) + 1} item(s)
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Rating
                    </label>
                    <p className="text-sm">
                      ⭐ {(Math.random() * 2 + 3).toFixed(1)}/5
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapseSection>
    </>
  );
}
