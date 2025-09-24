import { BrandDemo } from "@/components/brand/brand-switcher";
import {
  BrandWelcome,
  BrandAuthTitle,
  BrandFooter,
} from "@/components/brand/brand-aware-content";
import { generatePageMetadata } from "@/lib/brand-metadata";

export const metadata = generatePageMetadata(
  "Brand Demo",
  "Test and demonstrate the white-label brand system",
);

export default function BrandDemoPage() {
  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">White-Label Brand System Demo</h1>
        <p className="text-muted-foreground text-lg">
          This page demonstrates the white-label brand system. Switch between
          different brands to see how the entire application adapts.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <BrandDemo />
      </div>

      <div className="space-y-8">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-2xl font-semibold">Brand Welcome Content</h2>
          <BrandWelcome />
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-2xl font-semibold">Auth Page Content</h2>
          <div className="space-y-4">
            <BrandAuthTitle type="login" />
            <BrandAuthTitle type="signup" />
            <BrandAuthTitle type="forgot-password" />
          </div>
        </div>
      </div>

      <BrandFooter className="mt-12 border-t" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4 rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Dynamic Metadata</h3>
          <p className="text-muted-foreground text-sm">
            Page titles, descriptions, and SEO metadata automatically update
            based on the selected brand.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Brand Assets</h3>
          <p className="text-muted-foreground text-sm">
            Logos, favicons, and other assets are dynamically loaded from
            brand-specific directories.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Color Schemes</h3>
          <p className="text-muted-foreground text-sm">
            CSS custom properties are updated in real-time to reflect
            brand-specific color palettes.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Content & Copy</h3>
          <p className="text-muted-foreground text-sm">
            All text content, including navigation labels and welcome messages,
            adapts to the brand.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Environment Control</h3>
          <p className="text-muted-foreground text-sm">
            Brand selection can be controlled via environment variables for
            different deployments.
          </p>
        </div>

        <div className="space-y-4 rounded-lg border p-6">
          <h3 className="text-xl font-semibold">Extensible System</h3>
          <p className="text-muted-foreground text-sm">
            Easy to add new brands by creating configuration files and asset
            directories.
          </p>
        </div>
      </div>
    </div>
  );
}
