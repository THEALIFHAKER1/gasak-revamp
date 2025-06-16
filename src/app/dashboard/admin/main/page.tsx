import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardStats } from "@/components/layouts/dashboard/page/dashboard-stats";
import { Icons } from "@/components/icons";
import { IconChartBar } from "@tabler/icons-react";

export default function AdminDashboardMainPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Admin Panel", href: "/dashboard/admin" },
          { label: "Main Dashboard" },
        ]}
      />
      <DashboardPageHeading
        title="Welcome back, Admin! 👋"
        description="Manage your esports organization and oversee all operations."
      />

      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <IconChartBar className="h-5 w-5" />
            <span>Statistics Overview</span>
          </div>
        }
        defaultOpen={true}
      >
        <DashboardStats
          stats={[
            {
              title: "Total Users",
              value: "2,847",
              icon: <Icons.users className="h-4 w-4" />,
              trend: {
                value: "+12.5%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Leaders and members (excluding admins)",
            },
            {
              title: "Team Leaders",
              value: "324",
              icon: <Icons.crown className="h-4 w-4" />,
              trend: {
                value: "+8.3%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Active team leaders",
            },
            {
              title: "Team Members",
              value: "2,523",
              icon: <Icons.user className="h-4 w-4" />,
              trend: {
                value: "+13.2%",
                isPositive: true,
                label: "vs last month",
              },
              description: "Active team members",
            },
          ]}
        />
      </CollapseSection>
    </>
  );
}
