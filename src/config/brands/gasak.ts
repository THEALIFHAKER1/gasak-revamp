import type { BrandConfiguration } from "@/types/brand";

/**
 * GASAK Brand Configuration
 *
 * This is the default brand configuration for GASAK.
 * This serves as the reference implementation for other brands.
 */
export const gasakBrand: BrandConfiguration = {
  id: "gasak",
  metadata: {
    title: "GASAK - Esports Platform",
    description:
      "Professional esports platform for teams, tournaments, and community management",
    name: "GASAK",
    tagline: "Esports Platform",
    keywords: [
      "esports",
      "gaming",
      "tournaments",
      "teams",
      "competitive gaming",
      "gaming platform",
      "esports management",
    ],
    author: "GASAK Team",
    url: "https://gasak.com",
    social: {
      twitter: "https://twitter.com/gasak",
      facebook: "https://facebook.com/gasak",
      instagram: "https://instagram.com/gasak",
      youtube: "https://youtube.com/gasak",
    },
  },
  assets: {
    logo: "/brands/gasak/logo.png",
    logoDark: "/brands/gasak/logo-dark.png",
    logoSmall: "/brands/gasak/logo-small.png",
    favicon: "/brands/gasak/favicon.ico",
    appleTouchIcon: "/brands/gasak/apple-touch-icon.png",
    defaultAvatar: "/brands/gasak/default-avatar.png",
    backgrounds: {
      auth: "/brands/gasak/auth-bg.jpg",
      dashboard: "/brands/gasak/dashboard-bg.jpg",
      landing: "/brands/gasak/landing-bg.jpg",
    },
  },
  colors: {
    primary: "oklch(0.795 0.184 86.047)",
    primaryForeground: "oklch(0.421 0.095 57.708)",
    secondary: "oklch(0.967 0.001 286.375)",
    secondaryForeground: "oklch(0.21 0.006 285.885)",
    accent: "oklch(0.967 0.001 286.375)",
    accentForeground: "oklch(0.21 0.006 285.885)",
    destructive: "oklch(0.577 0.245 27.325)",
    success: "oklch(0.696 0.17 162.48)",
    warning: "oklch(0.769 0.188 70.08)",
    info: "oklch(0.488 0.243 264.376)",
  },
  content: {
    welcome: {
      title: "Welcome to GASAK",
      subtitle: "Your Ultimate Esports Platform",
      description:
        "Manage your esports teams, tournaments, and community all in one place.",
    },
    auth: {
      loginTitle: "Sign in to GASAK",
      loginSubtitle: "Access your esports dashboard",
      signupTitle: "Join GASAK",
      signupSubtitle: "Create your esports account",
      forgotPasswordTitle: "Reset your GASAK password",
    },
    dashboard: {
      welcomeMessage: "Welcome back to your GASAK dashboard",
      navigationLabels: {
        dashboard: "Dashboard",
        users: "Team Members",
        settings: "Settings",
        analytics: "Analytics",
      },
    },
    footer: {
      copyright: "© 2024 GASAK. All rights reserved.",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Support", href: "/support" },
        { label: "About", href: "/about" },
      ],
    },
  },
  active: true,
  settings: {
    defaultTheme: "dark",
    enableThemeToggle: true,
    cssPrefix: "gasak",
    fontFamily: "var(--font-geist-sans)",
  },
};
