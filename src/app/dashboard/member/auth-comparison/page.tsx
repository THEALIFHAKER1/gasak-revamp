import AuthComparisonPage from "@/components/shared/auth-comparison-page";

/**
 * Member auth comparison page
 */
export default function MemberAuthComparisonPage() {
  return (
    <AuthComparisonPage
      requiredRole="member"
      dashboardTitle="Member Dashboard"
      roleDisplayName="Team Member"
    />
  );
}
