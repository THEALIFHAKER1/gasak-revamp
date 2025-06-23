import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { Icons } from "@/components/icons";
import { IconClock, IconShoppingCart } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function SellerPendingOrdersPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Orders", href: "/dashboard/seller/orders" },
          { label: "Pending Orders" },
        ]}
      />
      <DashboardPageHeading
        title="Pending Orders"
        description="Process and manage orders that require your attention."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconClock className="h-5 w-5" />
            <span>Orders Awaiting Processing</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-orange-200 bg-orange-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                      <IconShoppingCart className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Order #{1000 + i}</h3>
                      <p className="text-muted-foreground text-sm">
                        Customer: John Doe {i}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(Math.random() * 200 + 50).toFixed(2)}
                    </p>
                    <span className="rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="mb-4 grid gap-2 laptop:grid-cols-3">
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Order Date
                    </label>
                    <p className="text-sm">
                      {new Date(
                        Date.now() - Math.random() * 86400000 * 3,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Items
                    </label>
                    <p className="text-sm">
                      {Math.floor(Math.random() * 3) + 1} item(s)
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Payment
                    </label>
                    <p className="text-sm">Card ending in {1000 + i}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Icons.check className="mr-1 h-4 w-4" />
                    Process Order
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Icons.close className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapseSection>
    </>
  );
}
