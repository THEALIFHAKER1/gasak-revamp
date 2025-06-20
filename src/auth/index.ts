import NextAuth, { type DefaultSession, type Session } from "next-auth";

import { db } from "@/db";

import authConfig from "./config";
import { getUserById } from "@/lib/user";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type UserRoleEnum } from "@/db/schema";
import { type JWT } from "@auth/core/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRoleEnum;
  ign?: string | null;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: UserRoleEnum;
  ign?: string | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRoleEnum;
    image?: string | null;
    ign?: string | null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ token, session }: { token?: JWT; session: Session }) {
      if (token?.sub && session.user) session.user.id = token.sub;
      if (token?.role && session.user) session.user.role = token.role;
      if (session.user) {
        session.user.image = token?.image ?? null;
        session.user.name = token?.name ?? null;
        session.user.email = token?.email ?? null;
        session.user.ign = token?.ign ?? null;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      try {
        const existingUser = await getUserById(token.sub);
        if (!existingUser) return token;

        token.image = existingUser.image;
        token.name = existingUser.name;
        token.email = existingUser.email;
        token.role = existingUser.role;
        token.ign = existingUser.ign;
      } catch (error) {
        console.error("Database error in JWT callback:", error);
      }

      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
