import { DashboardSidebar } from "@/components/layouts/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardLayoutProvider } from "@/contexts/dashboard-layout-context";
import { DashboardContainer } from "@/components/layouts/dashboard/dashboard-container";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <DashboardLayoutProvider>
      <section className="min-h-dvh max-h-dvh bg-dashboard-surface overflow-hidden">
        <SidebarProvider>
          <DashboardSidebar role="admin" />
          <SidebarInset>
            <DashboardContainer>{children}</DashboardContainer>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </DashboardLayoutProvider>
  );
}
