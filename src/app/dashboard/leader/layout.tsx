import { DashboardSidebar } from "@/components/layouts/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardLayoutProvider } from "@/contexts/dashboard-layout-context";
import { DashboardContainer } from "@/components/layouts/dashboard/dashboard-container";
import { requireLeader } from "@/lib/auth";

interface LeaderDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function LeaderDashboardLayout({
  children,
}: LeaderDashboardLayoutProps) {
  // Verify leader role before rendering
  await requireLeader();

  return (
    <DashboardLayoutProvider>
      <section className="bg-dashboard-surface max-h-dvh min-h-dvh overflow-hidden">
        <SidebarProvider>
          <DashboardSidebar role="leader" />
          <SidebarInset>
            <DashboardContainer>{children}</DashboardContainer>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </DashboardLayoutProvider>
  );
}
