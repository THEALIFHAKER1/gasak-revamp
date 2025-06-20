import { compare } from "bcrypt-ts";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/lib/user";

import { LoginSchema } from "@/schema";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user?.password) return null;

          try {
            const passwordsMatch = await (
              compare as (password: string, hash: string) => Promise<boolean>
            )(password, user.password);
            if (passwordsMatch) return user;
          } catch (error) {
            console.error("Password comparison failed:", error);
            return null;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
