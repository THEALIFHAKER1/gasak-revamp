import { FormError } from "@/components/ui/form-error";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function ErrorCard() {
  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Oops! Something went wrong!
        </CardTitle>
        <CardDescription className="text-muted-foreground text-center">
          An unexpected error has occurred
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormError message="An error occurred. Please try again later." />
        <Link
          href="/login"
          className="text-muted-foreground hover:text-primary inline-flex w-full items-center justify-center gap-2 rounded-md border p-2 text-sm transition-colors"
        >
          ← Back to login
        </Link>
      </CardContent>
    </Card>
  );
}
