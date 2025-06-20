import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GenericCurrentUserServerComponent from "@/components/shared/generic-current-user-server-component";
import GenericCurrentUserClientComponent from "@/components/shared/generic-current-user-client-component";
import { Badge } from "@/components/ui/badge";
import { type UserRoleEnum } from "@/db/schema";

interface AuthComparisonPageProps {
  requiredRole: UserRoleEnum;
  dashboardTitle: string;
  roleDisplayName: string;
}

/**
 * Generic Auth Comparison Page for any dashboard role
 */
export default function AuthComparisonPage({
  requiredRole,
  dashboardTitle,
  roleDisplayName,
}: AuthComparisonPageProps) {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Current User Auth Comparison</h1>
        <p className="text-muted-foreground">
          Compare server-side vs client-side approaches for {roleDisplayName}{" "}
          dashboard authentication
        </p>
      </div>

      {/* Comparison Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication Comparison Overview</CardTitle>
          <CardDescription>
            Two different approaches to display current user authentication data
            for {roleDisplayName}s
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">Server Component</Badge>
                <h3 className="font-semibold">Server-side Fetching</h3>
              </div>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>✅ Secure (server-side only)</li>
                <li>✅ SEO-friendly</li>
                <li>✅ No loading states</li>
                <li>✅ Direct database access</li>
                <li>✅ Role verification server-side</li>
                <li>❌ No real-time updates</li>
                <li>❌ Less interactive</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Client Component</Badge>
                <h3 className="font-semibold">Client-side Fetching</h3>
              </div>
              <ul className="text-muted-foreground space-y-1 text-sm">
                <li>✅ Real-time updates</li>
                <li>✅ Interactive features</li>
                <li>✅ Custom loading states</li>
                <li>✅ Flexible error handling</li>
                <li>✅ Role-specific UI</li>
                <li>❌ Loading states required</li>
                <li>❌ Client-side auth checks</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-specific Information */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-800">
            🎯 {roleDisplayName} Dashboard Specifics
          </CardTitle>
        </CardHeader>
        <CardContent className="text-purple-700">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-semibold">Required Role:</h4>
              <Badge variant="outline" className="text-purple-800">
                {requiredRole}
              </Badge>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Dashboard Type:</h4>
              <p className="text-sm">{dashboardTitle}</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Access Level:</h4>
              <p className="text-sm">
                {requiredRole === "admin"
                  ? "Full System Access"
                  : requiredRole === "leader"
                    ? "Team Management"
                    : "Basic User Access"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Comparison */}
      <Tabs defaultValue="server" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="server" className="flex items-center gap-2">
            <Badge variant="destructive" className="text-xs">
              Server
            </Badge>
            Server-side Component
          </TabsTrigger>
          <TabsTrigger value="client" className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Client
            </Badge>
            Client-side Component
          </TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="mt-6">
          <GenericCurrentUserServerComponent
            requiredRole={requiredRole}
            dashboardTitle={dashboardTitle}
          />
        </TabsContent>

        <TabsContent value="client" className="mt-6">
          <GenericCurrentUserClientComponent
            requiredRole={requiredRole}
            dashboardTitle={dashboardTitle}
          />
        </TabsContent>
      </Tabs>

      {/* Implementation Notes */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">
            📝 Implementation Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-blue-700">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Server Component Uses:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>
                  <code>getCurrentUserData()</code> - Efficient single call
                </li>
                <li>Server-side rendering for security</li>
                <li>Direct authentication verification</li>
                <li>Role-based access control</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Client Component Uses:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>
                  <code>useAuth()</code> hook - Real-time auth state
                </li>
                <li>NextAuth session management</li>
                <li>Interactive UI elements</li>
                <li>Custom loading and error states</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-blue-100 p-4">
            <p className="text-sm">
              <strong>Best Practice for {roleDisplayName}s:</strong> Use server
              components for initial page loads and security-critical
              operations, and client components for interactive features and
              real-time updates specific to {requiredRole} role.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
