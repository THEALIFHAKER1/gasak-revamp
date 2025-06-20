import NextAuth from "next-auth";
import { type NextAuthRequest } from "next-auth";

import authConfig from "@/auth/config";
import {
  apiAuthPrefix,
  authRoutes,
  getRoleBasedRedirect,
  publicRoutes,
  isProtectedRoute,
  isRouteAccessibleForRole,
} from "@/routes";

const { auth } = NextAuth(authConfig);

function createRedirectUrl(baseUrl: string, nextUrl: URL): Response {
  return Response.redirect(new URL(baseUrl, nextUrl));
}

function createLoginRedirect(
  pathname: string,
  search: string,
  nextUrl: URL,
): Response {
  let callbackUrl = pathname;
  if (search) callbackUrl += search;

  const encodedUrl = encodeURIComponent(callbackUrl);
  return createRedirectUrl(`/login?callbackUrl=${encodedUrl}`, nextUrl);
}

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const { pathname, search } = nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Allow API auth routes
  if (pathname.startsWith(apiAuthPrefix)) return;

  // Allow public routes
  if (publicRoutes.includes(pathname)) return;

  // Handle auth routes (login, error)
  if (authRoutes.includes(pathname)) {
    if (isLoggedIn && userRole) {
      const redirectUrl = getRoleBasedRedirect(userRole);
      return createRedirectUrl(redirectUrl, nextUrl);
    }
    return;
  }

  // Redirect unauthenticated users to login
  if (!isLoggedIn) {
    return createLoginRedirect(pathname, search, nextUrl);
  }

  // Handle protected dashboard routes
  if (isProtectedRoute(pathname)) {
    // Check role-based access
    if (userRole && !isRouteAccessibleForRole(pathname, userRole)) {
      const redirectUrl = getRoleBasedRedirect(userRole);
      return createRedirectUrl(redirectUrl, nextUrl);
    }
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
