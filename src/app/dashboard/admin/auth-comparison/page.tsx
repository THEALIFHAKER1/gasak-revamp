import AuthComparisonPage from "@/components/shared/auth-comparison-page";

/**
 * Admin auth comparison page
 */
export default function AdminUserComparisonPage() {
  return (
    <AuthComparisonPage
      requiredRole="admin"
      dashboardTitle="Admin Dashboard"
      roleDisplayName="Administrator"
    />
  );
}
