import type { Metadata } from "next";
import type { BrandConfiguration } from "@/types/brand";
import { getBrandById, getDefaultBrand } from "@/config/brands";
import { env } from "@/env";

/**
 * Brand Metadata Utilities
 *
 * Provides utilities for generating dynamic metadata based on brand configuration.
 * Used for SEO, social sharing, and browser metadata.
 */

/**
 * Get the current brand configuration
 */
function getCurrentBrand(): BrandConfiguration {
  const brandId = env.NEXT_PUBLIC_BRAND_ID;

  if (brandId) {
    const brand = getBrandById(brandId);
    if (brand) return brand;
  }

  return getDefaultBrand();
}

/**
 * Generate base metadata for the application
 */
export function generateBrandMetadata(overrides?: Partial<Metadata>): Metadata {
  const brand = getCurrentBrand();
  const { metadata, assets } = brand;

  const baseMetadata: Metadata = {
    metadataBase: new URL(metadata.url),
    title: {
      default: metadata.title,
      template: `%s | ${metadata.name}`,
    },
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: metadata.author }],
    creator: metadata.author,
    publisher: metadata.author,

    // Open Graph
    openGraph: {
      type: "website",
      locale: "en_US",
      url: metadata.url,
      title: metadata.title,
      description: metadata.description,
      siteName: metadata.name,
      images: [
        {
          url: assets.logo,
          width: 1200,
          height: 630,
          alt: `${metadata.name} Logo`,
        },
      ],
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [assets.logo],
      creator: metadata.social.twitter
        ? `@${metadata.social.twitter.split("/").pop()}`
        : undefined,
    },

    // Icons
    icons: {
      icon: assets.favicon,
      shortcut: assets.favicon,
      apple: assets.appleTouchIcon || assets.favicon,
    },

    // Manifest
    manifest: "/manifest.json",

    // Verification (can be overridden)
    verification: {
      google: undefined,
      yandex: undefined,
      yahoo: undefined,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  // Merge with overrides
  return {
    ...baseMetadata,
    ...overrides,
    // Deep merge for nested objects
    openGraph: {
      ...baseMetadata.openGraph,
      ...overrides?.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...overrides?.twitter,
    },
    icons: overrides?.icons || baseMetadata.icons,
  };
}

/**
 * Generate page-specific metadata
 */
export function generatePageMetadata(
  pageTitle: string,
  pageDescription?: string,
  overrides?: Partial<Metadata>,
): Metadata {
  const brand = getCurrentBrand();

  return generateBrandMetadata({
    title: pageTitle,
    description: pageDescription || brand.metadata.description,
    ...overrides,
  });
}

/**
 * Generate metadata for authentication pages
 */
export function generateAuthMetadata(
  pageType: "login" | "signup" | "forgot-password",
): Metadata {
  const brand = getCurrentBrand();
  const { content } = brand;

  const titles = {
    login: content.auth.loginTitle,
    signup: content.auth.signupTitle,
    "forgot-password": content.auth.forgotPasswordTitle,
  };

  const descriptions = {
    login: content.auth.loginSubtitle,
    signup: content.auth.signupSubtitle,
    "forgot-password": `Reset your ${brand.metadata.name} password`,
  };

  return generatePageMetadata(titles[pageType], descriptions[pageType], {
    robots: {
      index: false, // Don't index auth pages
      follow: false,
    },
  });
}

/**
 * Generate metadata for dashboard pages
 */
export function generateDashboardMetadata(pageTitle?: string): Metadata {
  const brand = getCurrentBrand();

  return generatePageMetadata(
    pageTitle || "Dashboard",
    `${brand.metadata.name} dashboard - manage your account and settings`,
    {
      robots: {
        index: false, // Don't index private dashboard pages
        follow: false,
      },
    },
  );
}

/**
 * Get brand-specific favicon URL
 */
export function getBrandFavicon(): string {
  const brand = getCurrentBrand();
  return brand.assets.favicon;
}

/**
 * Get brand-specific logo URL
 */
export function getBrandLogo(variant: "default" | "dark" = "default"): string {
  const brand = getCurrentBrand();

  if (variant === "dark" && brand.assets.logoDark) {
    return brand.assets.logoDark;
  }

  return brand.assets.logo;
}

/**
 * Get brand name
 */
export function getBrandName(): string {
  const brand = getCurrentBrand();
  return brand.metadata.name;
}

/**
 * Get brand tagline
 */
export function getBrandTagline(): string {
  const brand = getCurrentBrand();
  return brand.metadata.tagline;
}
