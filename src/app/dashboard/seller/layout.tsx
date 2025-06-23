import { DashboardSidebar } from "@/components/layouts/dashboard/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardLayoutProvider } from "@/contexts/dashboard-layout-context";
import { DashboardContainer } from "@/components/layouts/dashboard/dashboard-container";
import { requireRole } from "@/lib/auth";

interface SellerDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function SellerDashboardLayout({
  children,
}: SellerDashboardLayoutProps) {
  // Verify seller role before rendering
  await requireRole("seller");

  return (
    <DashboardLayoutProvider>
      <section className="bg-dashboard-surface max-h-dvh min-h-dvh overflow-hidden">
        <SidebarProvider>
          <DashboardSidebar role="seller" />
          <SidebarInset>
            <DashboardContainer>{children}</DashboardContainer>
          </SidebarInset>
        </SidebarProvider>
      </section>
    </DashboardLayoutProvider>
  );
}
