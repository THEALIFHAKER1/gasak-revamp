import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CurrentUserServerComponent from "@/components/admin/current-user-server-component";
import CurrentUserClientComponent from "@/components/admin/current-user-client-component";
import { Badge } from "@/components/ui/badge";

/**
 * Admin page to compare server-side vs client-side current user data fetching
 */
export default function AdminUserComparisonPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Current User Data Comparison</h1>
        <p className="text-muted-foreground">
          Compare server-side vs client-side approaches for displaying current
          user data
        </p>
      </div>

      {/* Comparison Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Comparison Overview</CardTitle>
          <CardDescription>
            Two different approaches to display the same current user data
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
                <li>✅ Automatic redirects</li>
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
                <li>❌ Loading states required</li>
                <li>❌ Client-side auth checks</li>
              </ul>
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
          <CurrentUserServerComponent />
        </TabsContent>

        <TabsContent value="client" className="mt-6">
          <CurrentUserClientComponent />
        </TabsContent>
      </Tabs>

      {/* Implementation Notes */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-800">
            📝 Implementation Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-purple-700">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Server Component Uses:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>
                  <code>requireAdmin()</code> - Auto redirect if not admin
                </li>
                <li>
                  <code>getCurrentUserData()</code> - Efficient single call
                </li>
                <li>Server-side rendering for security</li>
                <li>Direct database access</li>
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

          <div className="mt-4 rounded-lg bg-purple-100 p-4">
            <p className="text-sm">
              <strong>Best Practice:</strong> Use server components for initial
              page loads and security-critical operations, and client components
              for interactive features and real-time updates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
