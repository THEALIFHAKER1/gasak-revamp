"use server";

import { signIn } from "@/auth";
import { getRoleBasedRedirect } from "@/routes";
import { LoginSchema } from "@/schema/login";
import { compare } from "bcrypt-ts";
import { AuthError } from "next-auth";
import type * as z from "zod";
import { getUserByEmail } from "@/lib/user";

export async function Login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.password) {
    return { error: "Email does not exist!" };
  }

  // Validate password
  try {
    const passwordIsValid = await compare(password, existingUser.password);
    if (!passwordIsValid) {
      return { error: "Incorrect password!" };
    }
  } catch {
    return { error: "Authentication failed!" };
  }

  // Sign-in attempt
  try {
    // Determine redirect URL based on user role or use callback URL
    const redirectUrl = callbackUrl ?? getRoleBasedRedirect(existingUser.role);

    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectUrl,
    });

    // If we reach here, the sign-in was successful
    return { success: "Login successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
