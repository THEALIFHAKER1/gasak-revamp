import { Icons } from "@/components/icons";
import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { Button } from "@/components/ui/button";
import UserTable from "./table-user";
import FilterUserTable from "./filter-table-user";
import { Card } from "@/components/ui/card";

export default function AdminDashboardUserPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Admin Panel", href: "/dashboard/admin" },
          { label: "User Management" },
        ]}
      />
      <DashboardPageHeading
        title="User Management"
        description="Manage all users and their roles in the system"
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.user className="h-5 w-5" />
            <span>User Table</span>
          </div>
        }
        actions={
          <Button variant="default" size="sm">
            <Icons.Plus className="h-4 w-4" />
            Add User
          </Button>
        }
        defaultOpen={true}
      >
        <Card className="space-y-2 p-2">
          <FilterUserTable />
          <UserTable />
        </Card>
      </CollapseSection>
    </>
  );
}
