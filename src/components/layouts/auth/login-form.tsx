"use client";

import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Login } from "@/actions/login";
import { LoginSchema } from "@/schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { FormError } from "@/components/ui/form-error";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");

    startTransition(() => {
      Login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          // If data?.success exists, login was successful and redirect will happen
        })
        .catch((error) => {
          // Check if this is a redirect error (successful login)
          if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            // Don't show error message for redirects - this means login was successful
            return;
          }

          // Only show error for actual errors
          setError("Something went wrong, please try again.");
        });
    });
  }

  return (
    <div className="laptop:p-8 flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Welcome back!
          </CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Sign in to your GASAK Esport account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              autoComplete="off"
            >
              <div className="space-y-4">
                <FormInput
                  control={form.control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="john.doe@gasak.com"
                  autoComplete="off"
                />
                <FormInput
                  control={form.control}
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="********"
                  autoComplete="new-password"
                />
              </div>
              <FormError message={error} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full"
                size="lg"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <span>Sign in</span>
                )}
              </Button>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
                >
                  ← Back to homepage
                </Link>
                <Link
                  href="https://wa.me/60199393473?text=Hi,%20I%20need%20help%20with%20logging%20into%20my%20GASAK%20Esport%20account."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors"
                >
                  Need help?
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
