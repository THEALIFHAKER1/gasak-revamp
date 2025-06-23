import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { Icons } from "@/components/icons";
import { IconRefresh, IconShoppingCart } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function SellerReturnsPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Orders", href: "/dashboard/seller/orders" },
          { label: "Returns" },
        ]}
      />
      <DashboardPageHeading
        title="Returns & Refunds"
        description="Manage product returns and refund requests from customers."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconRefresh className="h-5 w-5" />
            <span>Pending Return Requests</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-blue-200 bg-blue-50 p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <IconShoppingCart className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        Return Request #{800 + i}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Original Order: #{1100 + i}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ${(Math.random() * 150 + 25).toFixed(2)}
                    </p>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                      Pending Review
                    </span>
                  </div>
                </div>

                <div className="mb-4 grid gap-2 laptop:grid-cols-3">
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Request Date
                    </label>
                    <p className="text-sm">
                      {new Date(
                        Date.now() - Math.random() * 86400000 * 7,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Reason
                    </label>
                    <p className="text-sm">
                      {["Defective", "Wrong Size", "Not as Described"][i % 3]}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground text-xs font-medium">
                      Customer
                    </label>
                    <p className="text-sm">Customer {i}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="text-muted-foreground text-xs font-medium">
                    Return Reason
                  </label>
                  <p className="mt-1 rounded border bg-white p-2 text-sm">
                    "The product arrived damaged and doesn't match the
                    description. I would like to return it for a full refund."
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Icons.check className="mr-1 h-4 w-4" />
                    Approve Return
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Customer
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Icons.close className="mr-1 h-4 w-4" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.check className="h-5 w-5" />
            <span>Processed Returns</span>
          </div>
        }
        defaultOpen={false}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">
            Previously processed returns and their outcomes will be displayed
            here.
          </p>
        </div>
      </CollapseSection>
    </>
  );
}
