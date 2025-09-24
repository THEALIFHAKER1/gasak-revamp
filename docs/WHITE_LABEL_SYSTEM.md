# White-Label Brand System

This document describes the comprehensive white-label brand system implemented in this codebase. The system allows multiple brands to use the same application with different branding, colors, assets, and content.

## Overview

The white-label system consists of:

- **Brand Configuration**: TypeScript interfaces and configuration files for each brand
- **Dynamic Assets**: Brand-specific logos, favicons, and images
- **Color Schemes**: Brand-specific color palettes applied via CSS custom properties
- **Content Management**: Configurable text content and copy
- **Environment Control**: Brand selection via environment variables
- **React Context**: Brand provider for accessing brand data throughout the app

## Quick Start

### 1. Environment Setup

Add these environment variables to your `.env` file:

```bash
# Optional: Override the default brand
NEXT_PUBLIC_BRAND_ID=gasak

# Optional: Custom asset URL prefix
NEXT_PUBLIC_BRAND_ASSETS_URL=https://cdn.example.com
```

### 2. Brand Selection

The system automatically selects a brand in this priority order:
1. `NEXT_PUBLIC_BRAND_ID` environment variable
2. Default brand (`gasak`)

### 3. Using Brand Data

```tsx
import { useBrand } from '@/components/providers/brand-provider';

function MyComponent() {
  const { brand, getAssetUrl, getBrandColor } = useBrand();
  
  return (
    <div>
      <h1>{brand.metadata.name}</h1>
      <img src={getAssetUrl('logo')} alt={brand.metadata.name} />
      <div style={{ color: getBrandColor('primary') }}>
        {brand.content.welcome.title}
      </div>
    </div>
  );
}
```

## Brand Configuration

### Creating a New Brand

1. **Create Configuration File**

Create a new file in `src/config/brands/your-brand.ts`:

```typescript
import type { BrandConfiguration } from '@/types/brand';

export const yourBrand: BrandConfiguration = {
  id: 'your-brand',
  metadata: {
    title: 'Your Brand - Platform Name',
    description: 'Your brand description',
    name: 'Your Brand',
    tagline: 'Your Tagline',
    keywords: ['keyword1', 'keyword2'],
    author: 'Your Company',
    url: 'https://yourbrand.com',
    social: {
      twitter: 'https://twitter.com/yourbrand',
      // ... other social links
    }
  },
  assets: {
    logo: '/brands/your-brand/logo.png',
    favicon: '/brands/your-brand/favicon.ico',
    // ... other assets
  },
  colors: {
    primary: 'oklch(0.6 0.2 240)', // Your primary color
    primaryForeground: 'oklch(0.98 0 0)',
    // ... other colors
  },
  content: {
    welcome: {
      title: 'Welcome to Your Brand',
      subtitle: 'Your custom subtitle',
      description: 'Your custom description'
    },
    // ... other content
  },
  active: true,
  settings: {
    defaultTheme: 'light',
    enableThemeToggle: true
  }
};
```

2. **Register the Brand**

Add your brand to `src/config/brands/index.ts`:

```typescript
import { yourBrand } from './your-brand';

export const brandRegistry: Record<BrandId, BrandConfiguration> = {
  gasak: gasakBrand,
  example: exampleBrand,
  'your-brand': yourBrand, // Add your brand here
};
```

3. **Create Asset Directory**

Create the directory structure:
```
public/brands/your-brand/
├── logo.png
├── logo-dark.png (optional)
├── logo-small.png
├── favicon.ico
├── apple-touch-icon.png
└── backgrounds/
    ├── auth-bg.jpg
    ├── dashboard-bg.jpg
    └── landing-bg.jpg
```

## Asset Management

### Asset Structure

```
public/brands/
├── gasak/
│   ├── logo.png
│   ├── favicon.ico
│   └── ...
└── your-brand/
    ├── logo.png
    ├── favicon.ico
    └── ...
```

### Asset Loading

Assets are loaded dynamically using the `getAssetUrl` function:

```tsx
const { getAssetUrl } = useBrand();

// Simple asset
<img src={getAssetUrl('logo')} alt="Logo" />

// Nested asset
<img src={getAssetUrl('backgrounds.auth')} alt="Background" />
```

## Color System

### Defining Colors

Colors should be defined in OKLCH format for better color consistency:

```typescript
colors: {
  primary: 'oklch(0.6 0.2 240)',        // Blue
  primaryForeground: 'oklch(0.98 0 0)',  // White
  secondary: 'oklch(0.95 0.01 240)',     // Light blue
  // ...
}
```

### Color Application

Colors are automatically applied to CSS custom properties when a brand is selected:

```css
:root {
  --primary: oklch(0.6 0.2 240);
  --primary-foreground: oklch(0.98 0 0);
  /* ... */
}
```

## Content Management

### Content Structure

All text content is configurable through the brand configuration:

```typescript
content: {
  welcome: {
    title: 'Welcome Message',
    subtitle: 'Subtitle',
    description: 'Description'
  },
  auth: {
    loginTitle: 'Sign in to Your Brand',
    loginSubtitle: 'Access your account',
    // ...
  },
  dashboard: {
    welcomeMessage: 'Welcome back!',
    navigationLabels: {
      dashboard: 'Dashboard',
      users: 'Users',
      // ...
    }
  }
}
```

### Using Content

```tsx
const { brand } = useBrand();

return (
  <div>
    <h1>{brand.content.welcome.title}</h1>
    <p>{brand.content.welcome.description}</p>
  </div>
);
```

## Metadata & SEO

### Dynamic Metadata

The system automatically generates metadata based on brand configuration:

```typescript
// In your page component
export const metadata = generatePageMetadata(
  'Page Title',
  'Page description'
);

// For auth pages
export const metadata = generateAuthMetadata('login');

// For dashboard pages
export const metadata = generateDashboardMetadata('Dashboard Title');
```

### Favicon Management

Favicons are automatically updated when brands change through the `DynamicFavicon` component.

## Environment Variables

### Available Variables

```bash
# Brand selection
NEXT_PUBLIC_BRAND_ID=your-brand-id

# Asset URL prefix (optional)
NEXT_PUBLIC_BRAND_ASSETS_URL=https://cdn.example.com

# Standard environment variables
AUTH_SECRET=your-auth-secret
DATABASE_URL=your-database-url
# ...
```

## Testing & Development

### Brand Demo Page

Visit `/brand-demo` to test brand switching and see all features in action.

### Brand Switcher Component

Use the `BrandSwitcher` component for development and testing:

```tsx
import { BrandSwitcher } from '@/components/brand/brand-switcher';

function DevTools() {
  return <BrandSwitcher />;
}
```

## Deployment

### Single Brand Deployment

Set the `NEXT_PUBLIC_BRAND_ID` environment variable:

```bash
NEXT_PUBLIC_BRAND_ID=your-brand
```

### Multi-Brand Deployment

Deploy multiple instances with different environment variables, or implement dynamic brand selection based on domain/subdomain.

## Best Practices

1. **Asset Optimization**: Optimize all brand assets for web (WebP, proper sizing)
2. **Color Consistency**: Use OKLCH color space for better consistency across themes
3. **Content Validation**: Validate all content strings for proper length and formatting
4. **Testing**: Test all brands thoroughly before deployment
5. **Performance**: Consider lazy loading for brand assets not immediately needed

## Troubleshooting

### Common Issues

1. **Assets not loading**: Check asset paths and directory structure
2. **Colors not applying**: Verify OKLCH format and CSS custom property names
3. **Brand not found**: Ensure brand is registered in the brand registry
4. **Environment variables**: Check that client-side variables have `NEXT_PUBLIC_` prefix

### Debug Tools

Use the `BrandInfo` component to debug current brand state:

```tsx
import { BrandInfo } from '@/components/brand/brand-switcher';

function DebugPage() {
  return <BrandInfo />;
}
```
