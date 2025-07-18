import { Icons } from "@/components/icons";
import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GridSquad from "./grid-squad";
import { Filter } from "@/components/ui/filter";

export default function AdminDashboardSquadPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Admin Panel", href: "/dashboard/admin" },
          { label: "Squad Management" },
        ]}
      />
      <DashboardPageHeading
        title="Squad Management"
        description="Manage all squads and their members in the system"
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.squad className="h-5 w-5" />
            <span>Squad Table</span>
          </div>
        }
        actions={
          <Button variant="default" size="sm">
            <Icons.Plus className="h-4 w-4" />
            Add Squad
          </Button>
        }
        defaultOpen={true}
      >
        <Card className="space-y-2 p-2">
          <Filter
            placeholder={"Search squad..."}
            dropdowns={[
              {
                label: "Type",
                icon: <Icons.squad className="h-4 w-4" />,
                options: [
                  { label: "All Types", value: "all" },
                  { label: "Alpha", value: "alpha" },
                  { label: "Bravo", value: "bravo" },
                  { label: "Charlie", value: "charlie" },
                ],
                id: "type",
              },
              {
                label: "Status",
                icon: <Icons.check className="h-4 w-4" />,
                options: [
                  { label: "All Statuses", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                ],
                id: "status",
              },
            ]}
          />
          <GridSquad />
        </Card>
      </CollapseSection>
    </>
  );
}
