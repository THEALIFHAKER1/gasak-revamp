import type { BrandConfiguration, BrandId } from "@/types/brand";
import { gasakBrand } from "./gasak";
import { exampleBrand } from "./example";

/**
 * Brand Registry
 *
 * This file manages all available brand configurations and provides
 * utilities for brand management and switching.
 */

// Registry of all available brands
export const brandRegistry: Record<BrandId, BrandConfiguration> = {
  gasak: gasakBrand,
  example: exampleBrand,
};

// Default brand ID (can be overridden by environment variable)
export const DEFAULT_BRAND_ID: BrandId = "gasak";

/**
 * Get all available brands
 */
export function getAllBrands(): BrandConfiguration[] {
  return Object.values(brandRegistry);
}

/**
 * Get all active brands
 */
export function getActiveBrands(): BrandConfiguration[] {
  return Object.values(brandRegistry).filter((brand) => brand.active);
}

/**
 * Get a specific brand by ID
 */
export function getBrandById(brandId: BrandId): BrandConfiguration | null {
  return brandRegistry[brandId] || null;
}

/**
 * Get the default brand configuration
 */
export function getDefaultBrand(): BrandConfiguration {
  const brand = getBrandById(DEFAULT_BRAND_ID);
  if (!brand) {
    throw new Error(
      `Default brand '${DEFAULT_BRAND_ID}' not found in registry`,
    );
  }
  return brand;
}

/**
 * Check if a brand exists
 */
export function brandExists(brandId: BrandId): boolean {
  return brandId in brandRegistry;
}

/**
 * Get brand IDs
 */
export function getBrandIds(): BrandId[] {
  return Object.keys(brandRegistry);
}

/**
 * Get active brand IDs
 */
export function getActiveBrandIds(): BrandId[] {
  return Object.entries(brandRegistry)
    .filter(([, brand]) => brand.active)
    .map(([id]) => id);
}

/**
 * Validate brand configuration
 */
export function validateBrandConfig(brand: BrandConfiguration): boolean {
  try {
    // Basic validation
    if (
      !brand.id ||
      !brand.metadata ||
      !brand.assets ||
      !brand.colors ||
      !brand.content
    ) {
      return false;
    }

    // Validate required metadata fields
    if (
      !brand.metadata.title ||
      !brand.metadata.name ||
      !brand.metadata.description
    ) {
      return false;
    }

    // Validate required asset fields
    if (!brand.assets.logo || !brand.assets.favicon) {
      return false;
    }

    // Validate required color fields
    if (!brand.colors.primary || !brand.colors.primaryForeground) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Register a new brand (useful for dynamic brand loading)
 */
export function registerBrand(brand: BrandConfiguration): boolean {
  if (!validateBrandConfig(brand)) {
    console.error(`Invalid brand configuration for brand '${brand.id}'`);
    return false;
  }

  if (brandExists(brand.id)) {
    console.warn(`Brand '${brand.id}' already exists. Overwriting...`);
  }

  brandRegistry[brand.id] = brand;
  return true;
}

/**
 * Unregister a brand
 */
export function unregisterBrand(brandId: BrandId): boolean {
  if (!brandExists(brandId)) {
    return false;
  }

  delete brandRegistry[brandId];
  return true;
}

// Export individual brands for direct import
export { gasakBrand, exampleBrand };
