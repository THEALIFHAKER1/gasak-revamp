import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { Icons } from "@/components/icons";
import { IconUser, IconSettings, IconShieldCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function SellerProfilePage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/seller" },
          { label: "Profile", href: "/dashboard/seller/profile" },
        ]}
      />
      <DashboardPageHeading
        title="Seller Profile"
        description="Manage your seller account information and preferences."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconUser className="h-5 w-5" />
            <span>Profile Information</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <div className="mb-6 flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <IconUser className="h-10 w-10 text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-muted-foreground">Seller since March 2024</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                  Verified Seller
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                  Premium
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 laptop:grid-cols-2">
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Email
              </label>
              <p className="font-medium">john.doe@example.com</p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Phone
              </label>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Store Name
              </label>
              <p className="font-medium">John's Electronics Store</p>
            </div>
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Business Type
              </label>
              <p className="font-medium">Electronics & Gadgets</p>
            </div>
          </div>

          <div className="mt-6">
            <Button>
              <IconSettings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconShieldCheck className="h-5 w-5" />
            <span>Seller Verification</span>
          </div>
        }
        defaultOpen={true}
      >
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Icons.check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Email Verification</p>
                  <p className="text-muted-foreground text-sm">
                    Email address verified
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                Verified
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Icons.check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Business License</p>
                  <p className="text-muted-foreground text-sm">
                    Valid business registration
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                Verified
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <Icons.check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Payment Information</p>
                  <p className="text-muted-foreground text-sm">
                    Bank account verified
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                Verified
              </span>
            </div>
          </div>
        </div>
      </CollapseSection>

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.settings className="h-5 w-5" />
            <span>Account Settings</span>
          </div>
        }
        defaultOpen={false}
      >
        <div className="bg-card rounded-lg border p-6">
          <p className="text-muted-foreground">
            Account settings, notification preferences, and privacy options will
            be available here.
          </p>
        </div>
      </CollapseSection>
    </>
  );
}
