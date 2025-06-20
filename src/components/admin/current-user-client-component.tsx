"use client";

import { useState } from "react";
import useAuth from "@/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

/**
 * Client Component - Current User Profile
 * Fetches and displays current user data on the client-side with real-time updates
 */
export default function CurrentUserClientComponent() {
  const auth = useAuth();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  // Force refresh function
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    // In a real app, you might want to trigger a session update here
    window.location.reload();
  };

  // Handle loading state
  if (auth.isLoading) {
    return <CurrentUserLoadingSkeleton />;
  }

  // Handle unauthenticated state
  if (!auth.isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Current User Profile (Client-side)
            </h2>
            <p className="text-muted-foreground">
              User authentication required
            </p>
          </div>
          <Badge variant="secondary">Client Component</Badge>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Not Authenticated</CardTitle>
            <CardDescription>
              You must be logged in to view your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push("/login")}>Go to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle wrong role (not admin)
  if (!auth.hasRole("admin")) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Current User Profile (Client-side)
            </h2>
            <p className="text-muted-foreground">Admin access required</p>
          </div>
          <Badge variant="secondary">Client Component</Badge>
        </div>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="text-center">
            <CardTitle className="text-orange-600">
              Insufficient Permissions
            </CardTitle>
            <CardDescription>
              You need admin privileges to access this section
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {" "}
            <div className="space-y-2 text-center">
              <div className="text-muted-foreground text-sm">
                Current role: <Badge variant="outline">{auth.role}</Badge>
              </div>
              <div className="text-muted-foreground text-sm">
                Required role: <Badge variant="outline">admin</Badge>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
              <Button onClick={() => router.push(`/dashboard/${auth.role}`)}>
                Go to Your Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main content (user is authenticated and is admin)
  return (
    <div className="space-y-6" key={refreshKey}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Current User Profile (Client-side)
          </h2>
          <p className="text-muted-foreground">
            Your profile data with real-time updates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Badge variant="secondary">Client Component</Badge>
        </div>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={auth.image ?? ""} alt={auth.name ?? ""} />
              <AvatarFallback className="text-lg">
                {auth.name?.charAt(0).toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>{" "}
            <div>
              <CardTitle className="text-xl">
                {auth.name ?? "No name"}
              </CardTitle>
              <CardDescription>{auth.email}</CardDescription>
              <Badge
                variant={auth.role === "admin" ? "destructive" : "secondary"}
                className="mt-1"
              >
                {auth.role}
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
                    {auth.name ?? "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Email:</span>
                  <span className="text-sm font-medium">{auth.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Role:</span>
                  <Badge variant="outline" className="text-xs">
                    {auth.role}
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
                    {auth.ign ?? "Not set"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">User ID:</span>
                  <code className="bg-muted rounded px-1 py-0.5 text-xs">
                    {auth.id}
                  </code>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Auth State */}
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-semibold">
              AUTHENTICATION STATE (LIVE)
            </h4>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">
                  Authenticated
                </span>
                <span className="text-sm font-bold text-green-600">
                  {auth.isAuthenticated ? "✅ Yes" : "❌ No"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">Loading</span>
                <span className="text-sm font-bold">
                  {auth.isLoading ? "🔄 Yes" : "✅ No"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">Is Admin</span>
                <span className="text-sm font-bold">
                  {auth.hasRole("admin") ? "✅ Yes" : "❌ No"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded-lg p-3">
                <span className="text-muted-foreground text-xs">
                  Authorized
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {auth.isAuthorized("admin") ? "✅ Yes" : "❌ No"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Dynamic Role Checks */}
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-semibold">
              ROLE CHECKS
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-muted flex flex-col items-center rounded p-2">
                <span className="text-muted-foreground text-xs">Admin</span>
                <span className="text-sm font-bold">
                  {auth.hasRole("admin") ? "✅" : "❌"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded p-2">
                <span className="text-muted-foreground text-xs">Leader</span>
                <span className="text-sm font-bold">
                  {auth.hasRole("leader") ? "✅" : "❌"}
                </span>
              </div>
              <div className="bg-muted flex flex-col items-center rounded p-2">
                <span className="text-muted-foreground text-xs">Member</span>
                <span className="text-sm font-bold">
                  {auth.hasRole("member") ? "✅" : "❌"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Features */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Features</CardTitle>
          <CardDescription>
            Client-side features with real-time updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Button
              onClick={() =>
                alert(`Hello ${auth.name}! You are an ${auth.role}.`)
              }
              className="w-full"
            >
              Test Auth Data
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Full auth object:", auth);
                alert("Check console for full auth object");
              }}
              className="w-full"
            >
              Log Auth to Console
            </Button>
            <Button
              variant="outline"
              onClick={handleRefresh}
              className="w-full"
            >
              Force Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client-side Benefits */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">
            ⚡ Client-side Features
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Real-time Benefits:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Live auth state updates</li>
                <li>Interactive UI elements</li>
                <li>Dynamic role checking</li>
                <li>Custom loading states</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">User Experience:</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>No page redirects (smoother UX)</li>
                <li>Flexible error handling</li>
                <li>Real-time data refresh</li>
                <li>All auth utilities in one hook</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Loading skeleton component for better UX
 */
function CurrentUserLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-80" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="space-y-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <div className="space-y-1">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
