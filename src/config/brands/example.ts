import type { BrandConfiguration } from "@/types/brand";

/**
 * Example Brand Configuration
 *
 * This is an example brand configuration showing how to create
 * a different brand with custom colors, content, and assets.
 */
export const exampleBrand: BrandConfiguration = {
  id: "example",
  metadata: {
    title: "GameHub - Gaming Community Platform",
    description:
      "Connect, compete, and grow with the ultimate gaming community platform",
    name: "GameHub",
    tagline: "Gaming Community Platform",
    keywords: [
      "gaming",
      "community",
      "social gaming",
      "game tournaments",
      "gaming platform",
      "multiplayer",
      "gaming network",
    ],
    author: "GameHub Team",
    url: "https://gamehub.com",
    social: {
      twitter: "https://twitter.com/gamehub",
      discord: "https://discord.gg/gamehub",
      twitch: "https://twitch.tv/gamehub",
    },
  },
  assets: {
    logo: "/brands/example/logo.png",
    logoDark: "/brands/example/logo-dark.png",
    logoSmall: "/brands/example/logo-small.png",
    favicon: "/brands/example/favicon.ico",
    appleTouchIcon: "/brands/example/apple-touch-icon.png",
    defaultAvatar: "/brands/example/default-avatar.png",
    backgrounds: {
      auth: "/brands/example/auth-bg.jpg",
      dashboard: "/brands/example/dashboard-bg.jpg",
      landing: "/brands/example/landing-bg.jpg",
    },
  },
  colors: {
    // Purple/Blue theme
    primary: "oklch(0.6 0.25 270)",
    primaryForeground: "oklch(0.98 0 0)",
    secondary: "oklch(0.95 0.01 270)",
    secondaryForeground: "oklch(0.2 0.01 270)",
    accent: "oklch(0.85 0.05 270)",
    accentForeground: "oklch(0.15 0.01 270)",
    destructive: "oklch(0.65 0.2 15)",
    success: "oklch(0.7 0.15 140)",
    warning: "oklch(0.8 0.15 60)",
    info: "oklch(0.65 0.2 220)",
  },
  content: {
    welcome: {
      title: "Welcome to GameHub",
      subtitle: "Your Gaming Community Awaits",
      description:
        "Connect with gamers worldwide, join tournaments, and build your gaming legacy.",
    },
    auth: {
      loginTitle: "Sign in to GameHub",
      loginSubtitle: "Access your gaming community",
      signupTitle: "Join GameHub",
      signupSubtitle: "Create your gaming profile",
      forgotPasswordTitle: "Reset your GameHub password",
    },
    dashboard: {
      welcomeMessage: "Welcome back, gamer!",
      navigationLabels: {
        dashboard: "Home",
        users: "Community",
        settings: "Profile Settings",
        analytics: "Gaming Stats",
      },
    },
    footer: {
      copyright: "© 2024 GameHub. All rights reserved.",
      links: [
        { label: "Community Guidelines", href: "/guidelines" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Help Center", href: "/help" },
      ],
    },
  },
  active: false, // Not active by default
  settings: {
    defaultTheme: "system",
    enableThemeToggle: true,
    cssPrefix: "gamehub",
    fontFamily: "var(--font-geist-sans)",
  },
};
