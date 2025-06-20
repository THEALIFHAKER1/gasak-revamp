import AuthComparisonPage from "@/components/shared/auth-comparison-page";

/**
 * Leader auth comparison page
 */
export default function LeaderAuthComparisonPage() {
  return (
    <AuthComparisonPage
      requiredRole="leader"
      dashboardTitle="Leader Dashboard"
      roleDisplayName="Team Leader"
    />
  );
}
