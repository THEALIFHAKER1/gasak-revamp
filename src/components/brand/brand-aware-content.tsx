"use client";

import Image from "next/image";
import { useBrand } from "@/components/providers/brand-provider";

/**
 * Brand-aware content components
 *
 * These components automatically display brand-specific content
 * based on the current brand configuration.
 */

interface BrandWelcomeProps {
  className?: string;
}

export function BrandWelcome({ className }: BrandWelcomeProps) {
  const { brand } = useBrand();

  return (
    <div className={className}>
      <h1 className="text-4xl font-bold">{brand.content.welcome.title}</h1>
      <p className="text-muted-foreground mt-2 text-xl">
        {brand.content.welcome.subtitle}
      </p>
      <p className="text-muted-foreground mt-4">
        {brand.content.welcome.description}
      </p>
    </div>
  );
}

interface BrandDashboardWelcomeProps {
  role?: "admin" | "leader" | "member" | "seller";
  className?: string;
}

export function BrandDashboardWelcome({
  role = "admin",
  className,
}: BrandDashboardWelcomeProps) {
  const { brand } = useBrand();

  const roleMessages = {
    admin: `Welcome back, Admin! 👋`,
    leader: `Welcome back, Team Leader! 🎯`,
    member: `Welcome back, Team Member! 🚀`,
    seller: `Welcome back, Seller! 🛍️`,
  };

  const roleDescriptions = {
    admin: `Manage your ${brand.metadata.tagline.toLowerCase()} organization and oversee all operations.`,
    leader: `Lead your team to victory and manage your squad effectively.`,
    member: `Stay updated with your tasks and team activities.`,
    seller: `Manage your products, track sales, and grow your business.`,
  };

  return (
    <div className={className}>
      <h1 className="text-3xl font-bold">{roleMessages[role]}</h1>
      <p className="text-muted-foreground mt-2">{roleDescriptions[role]}</p>
    </div>
  );
}

interface BrandAuthTitleProps {
  type: "login" | "signup" | "forgot-password";
  className?: string;
}

export function BrandAuthTitle({ type, className }: BrandAuthTitleProps) {
  const { brand } = useBrand();

  const titles = {
    login: brand.content.auth.loginTitle,
    signup: brand.content.auth.signupTitle,
    "forgot-password": brand.content.auth.forgotPasswordTitle,
  };

  const subtitles = {
    login: brand.content.auth.loginSubtitle,
    signup: brand.content.auth.signupSubtitle,
    "forgot-password": `Reset your ${brand.metadata.name} password`,
  };

  return (
    <div className={className}>
      <h1 className="text-center text-2xl font-semibold">{titles[type]}</h1>
      <p className="text-muted-foreground mt-2 text-center">
        {subtitles[type]}
      </p>
    </div>
  );
}

interface BrandFooterProps {
  className?: string;
}

export function BrandFooter({ className }: BrandFooterProps) {
  const { brand } = useBrand();

  return (
    <footer className={className}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="text-muted-foreground text-sm">
            {brand.content.footer.copyright}
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            {brand.content.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

interface BrandNameProps {
  className?: string;
}

export function BrandName({ className }: BrandNameProps) {
  const { brand } = useBrand();

  return <span className={className}>{brand.metadata.name}</span>;
}

interface BrandTaglineProps {
  className?: string;
}

export function BrandTagline({ className }: BrandTaglineProps) {
  const { brand } = useBrand();

  return <span className={className}>{brand.metadata.tagline}</span>;
}

interface BrandLogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "default" | "dark" | "small";
}

export function BrandLogo({
  width = 40,
  height = 40,
  className,
  variant = "default",
}: BrandLogoProps) {
  const { brand, getAssetUrl } = useBrand();

  const assetKey =
    variant === "dark" && brand.assets.logoDark
      ? "logoDark"
      : variant === "small"
        ? "logoSmall"
        : "logo";

  return (
    <Image
      src={getAssetUrl(assetKey)}
      alt={`${brand.metadata.name} Logo`}
      width={width}
      height={height}
      className={className}
    />
  );
}
