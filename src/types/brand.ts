/**
 * Brand Configuration Types
 *
 * This file defines the TypeScript interfaces and types for the white-label brand system.
 * Each brand can have its own configuration including metadata, colors, assets, and content.
 */

export interface BrandMetadata {
  /** Application title */
  title: string;
  /** Application description for SEO */
  description: string;
  /** Application name (used in various places) */
  name: string;
  /** Short tagline or subtitle */
  tagline: string;
  /** Keywords for SEO */
  keywords: string[];
  /** Author information */
  author: string;
  /** Website URL */
  url: string;
  /** Social media links */
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    discord?: string;
    twitch?: string;
  };
}

export interface BrandAssets {
  /** Main logo (light theme) */
  logo: string;
  /** Logo for dark theme (optional, falls back to main logo) */
  logoDark?: string;
  /** Small logo/icon */
  logoSmall: string;
  /** Favicon path */
  favicon: string;
  /** Apple touch icon */
  appleTouchIcon: string;
  /** Default avatar/placeholder image */
  defaultAvatar: string;
  /** Background images */
  backgrounds: {
    auth?: string;
    dashboard?: string;
    landing?: string;
  };
}

export interface BrandColors {
  /** Primary brand color (OKLCH format) */
  primary: string;
  /** Primary foreground color */
  primaryForeground: string;
  /** Secondary brand color */
  secondary?: string;
  /** Secondary foreground color */
  secondaryForeground?: string;
  /** Accent color */
  accent?: string;
  /** Accent foreground color */
  accentForeground?: string;
  /** Destructive/error color */
  destructive?: string;
  /** Success color */
  success?: string;
  /** Warning color */
  warning?: string;
  /** Info color */
  info?: string;
}

export interface BrandContent {
  /** Welcome messages */
  welcome: {
    title: string;
    subtitle: string;
    description: string;
  };
  /** Authentication related text */
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    signupTitle: string;
    signupSubtitle: string;
    forgotPasswordTitle: string;
  };
  /** Dashboard related text */
  dashboard: {
    welcomeMessage: string;
    navigationLabels: {
      dashboard: string;
      users: string;
      settings: string;
      analytics: string;
    };
  };
  /** Footer content */
  footer: {
    copyright: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
}

export interface BrandConfiguration {
  /** Unique brand identifier */
  id: string;
  /** Brand metadata */
  metadata: BrandMetadata;
  /** Brand assets */
  assets: BrandAssets;
  /** Brand colors */
  colors: BrandColors;
  /** Brand content/copy */
  content: BrandContent;
  /** Whether this brand is active */
  active: boolean;
  /** Brand-specific settings */
  settings: {
    /** Default theme (light/dark/system) */
    defaultTheme: "light" | "dark" | "system";
    /** Enable theme switching */
    enableThemeToggle: boolean;
    /** Custom CSS class prefix */
    cssPrefix?: string;
    /** Custom font family */
    fontFamily?: string;
  };
}

export type BrandId = string;

export interface BrandContextValue {
  /** Current brand configuration */
  brand: BrandConfiguration;
  /** Available brands */
  availableBrands: BrandConfiguration[];
  /** Switch to a different brand */
  switchBrand: (brandId: BrandId) => void;
  /** Get asset URL for current brand */
  getAssetUrl: (assetKey: keyof BrandAssets | string) => string;
  /** Get brand color */
  getBrandColor: (colorKey: keyof BrandColors) => string;
}
