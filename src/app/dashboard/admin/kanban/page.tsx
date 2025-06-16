import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";

export default function AdminDashboardKanbanPage() {
  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Kanban Board" },
        ]}
      />

      <div>
        <h1>Admin Dashboard - Kanban</h1>
        <p>This page now shows breadcrumbs on desktop and title on mobile</p>
      </div>
    </>
  );
}
