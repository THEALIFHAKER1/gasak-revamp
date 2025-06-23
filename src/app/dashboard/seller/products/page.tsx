import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { Icons } from "@/components/icons";
import { IconPackage, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function SellerProductsPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Products", href: "/dashboard/seller/products" },
        ]}
      />
      <DashboardPageHeading
        title="My Products"
        description="Manage your product listings and inventory."
        action={
          <Button>
            <IconPlus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        }
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconPackage className="h-5 w-5" />
            <span>Active Products</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground mb-4">
            Your active product listings will be displayed here in a table
            format with options to edit, delete, or manage inventory.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder product cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Product {i}</h3>
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                    Active
                  </span>
                </div>
                <p className="text-muted-foreground mb-2 text-sm">
                  Product description goes here...
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">$99.99</span>
                  <span className="text-muted-foreground text-xs">
                    Stock: 25
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
            <Icons.circle className="h-5 w-5" />
            <span>Draft Products</span>
          </div>
        }
        defaultOpen={false}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">
            Draft products that are not yet published will be displayed here.
          </p>
        </div>
      </CollapseSection>
    </>
  );
}
