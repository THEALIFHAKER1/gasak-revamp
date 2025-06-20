import React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  type?: string;
  placeholder?: string;
  subLinkLabel?: string;
  subLinkHref?: string;
  autoComplete?: string;
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  subLinkLabel,
  subLinkHref,
  autoComplete,
}: FormInputProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>{label}</FormLabel>
            {subLinkLabel && subLinkHref && (
              <Link
                href={subLinkHref}
                className="text-muted-foreground hover:text-primary text-sm"
              >
                {subLinkLabel}
              </Link>
            )}
          </div>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              value={field.value ?? ""}
              autoComplete={autoComplete}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
