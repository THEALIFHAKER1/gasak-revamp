import { getCurrentUserData } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { type UserRoleEnum } from "@/db/schema";

interface GenericCurrentUserServerComponentProps {
  requiredRole: UserRoleEnum;
  dashboardTitle: string;
}

/**
 * Generic Server Component - Current User Profile
 * Works for any role (admin, leader, member)
 */
export default async function GenericCurrentUserServerComponent({
  requiredRole,
  dashboardTitle,
}: GenericCurrentUserServerComponentProps) {
  // Get all current user data in one efficient call
  const userData = await getCurrentUserData();
  const { user } = userData;

  // Check if user is authenticated
  if (!user) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-800">No user data found</p>
        </CardContent>
      </Card>
    );
  }

  // Check if user has the required role
  const hasRequiredRole = user.role === requiredRole;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Current User Profile (Server-side)
          </h2>
          <p className="text-muted-foreground">
            Your profile data fetched server-side for {dashboardTitle}
          </p>
        </div>
        <Badge variant="destructive">Server Component</Badge>
      </div>

      {/* Role Verification Alert */}
      {!hasRequiredRole && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">⚠️ Role Mismatch</CardTitle>
            <CardDescription>
              This dashboard requires {requiredRole} role, but you have{" "}
              {user.role} role
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* User Profile Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
              <AvatarFallback className="text-lg">
                {user.name?.charAt(0).toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">
                {user.name ?? "No name"}
              </CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <Badge
                variant={
                  user.role === "admin"
                    ? "destructive"
                    : user.role === "leader"
                      ? "default"
                      : "secondary"
                }
                className="mt-1"
              >
                {user.role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />

          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-semibold">
                BASIC INFORMATION
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Full Name:</span>
                  <span className="text-sm font-medium">
                    {user.name ?? "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Email:</span>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Current Role:</span>
                  <Badge variant="outline" className="text-xs">
                    {user.role}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Required Role:</span>
                  <Badge variant="outline" className="text-xs">
                    {requiredRole}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-semibold">
                GAMING INFO
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">In-Game Name:</span>
                  <span className="text-sm font-medium">
                    {user.ign ?? "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">User ID:</span>
                  <code className="bg-muted rounded px-1 py-0.5 text-xs">
                    {user.id}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Auth State */}
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-semibold">
              AUTHENTICATION STATE
            </h4>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">
                  Authenticated
                </span>
                <span className="text-sm font-bold text-green-600">
                  {userData.isAuthenticated ? "✅ Yes" : "❌ No"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">
                  Correct Role
                </span>
                <span className="text-sm font-bold">
                  {hasRequiredRole ? "✅ Yes" : "❌ No"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">
                  Has Session
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {userData.session ? "✅ Yes" : "❌ No"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">
                  Profile Complete
                </span>
                <span className="text-sm font-bold">
                  {user.name && user.ign ? "✅ Yes" : "⚠️ Partial"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Server-side Features */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">
            🔒 Server-side Features
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Security Benefits:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Data fetched server-side (secure)</li>
                <li>Cannot be bypassed by client manipulation</li>
                <li>SEO-friendly content rendering</li>
                <li>Role verification server-side</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Performance Benefits:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>No loading states needed</li>
                <li>Faster initial page load</li>
                <li>Efficient single auth call</li>
                <li>Server-side rendered content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
