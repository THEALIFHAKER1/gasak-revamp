import { DashboardSidebar } from "@/components/layouts/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardLayoutProvider } from "@/contexts/dashboard-layout-context";
import { DashboardContainer } from "@/components/layouts/dashboard/dashboard-container";
import { requireRole } from "@/lib/auth";

interface MemberDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function MemberDashboardLayout({
  children,
}: MemberDashboardLayoutProps) {
  // Verify member role before rendering
  await requireRole("member");

  return (
    <DashboardLayoutProvider>
      <section className="bg-dashboard-surface max-h-dvh min-h-dvh overflow-hidden">
        <SidebarProvider>
          <DashboardSidebar role="member" />
          <SidebarInset>
            <DashboardContainer>{children}</DashboardContainer>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </DashboardLayoutProvider>
  );
}
