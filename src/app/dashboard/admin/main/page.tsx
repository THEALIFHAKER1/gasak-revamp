import { HeaderBreadcrumbs } from "@/components/layouts/header-slot";

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

      <div>
        <h1>Admin Dashboard - Main</h1>
        <p>Welcome to the main admin dashboard!</p>
      </div>
    </>
  );
}
