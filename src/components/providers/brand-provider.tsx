"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import type {
  BrandConfiguration,
  BrandContextValue,
  BrandId,
} from "@/types/brand";
import {
  getBrandById,
  getDefaultBrand,
  getAllBrands,
  brandExists,
  DEFAULT_BRAND_ID,
} from "@/config/brands";
import { env } from "@/env";

/**
 * Brand Context
 *
 * Provides brand configuration throughout the application.
 * Handles brand switching, asset URL generation, and color management.
 */

const BrandContext = createContext<BrandContextValue | null>(null);

interface BrandProviderProps {
  children: React.ReactNode;
  /** Override the default brand ID */
  defaultBrandId?: BrandId;
}

export function BrandProvider({
  children,
  defaultBrandId,
}: BrandProviderProps) {
  // Determine the initial brand ID from environment or props
  const initialBrandId = useMemo(() => {
    // Priority: prop > environment variable > default
    if (defaultBrandId && brandExists(defaultBrandId)) {
      return defaultBrandId;
    }

    if (env.NEXT_PUBLIC_BRAND_ID && brandExists(env.NEXT_PUBLIC_BRAND_ID)) {
      return env.NEXT_PUBLIC_BRAND_ID;
    }

    return DEFAULT_BRAND_ID;
  }, [defaultBrandId]);

  const [currentBrandId, setCurrentBrandId] = useState<BrandId>(initialBrandId);
  const [currentBrand, setCurrentBrand] = useState<BrandConfiguration>(() => {
    return getBrandById(initialBrandId) ?? getDefaultBrand();
  });

  // Update brand when brand ID changes
  useEffect(() => {
    const brand = getBrandById(currentBrandId);
    if (brand) {
      setCurrentBrand(brand);

      // Update CSS custom properties for brand colors
      updateBrandColors(brand);

      // Update document title
      if (typeof document !== "undefined") {
        document.title = brand.metadata.title;
      }
    }
  }, [currentBrandId]);

  // Switch to a different brand
  const switchBrand = (brandId: BrandId) => {
    if (brandExists(brandId)) {
      setCurrentBrandId(brandId);

      // Store in localStorage for persistence
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("selectedBrandId", brandId);
      }
    } else {
      console.warn(`Brand '${brandId}' does not exist`);
    }
  };

  // Get asset URL for current brand
  const getAssetUrl = (
    assetKey: keyof BrandConfiguration["assets"] | string,
  ): string => {
    const baseUrl = env.NEXT_PUBLIC_BRAND_ASSETS_URL || "";

    // Handle nested asset keys (e.g., 'backgrounds.auth')
    if (assetKey.includes(".")) {
      const keys = assetKey.split(".");
      let value: any = currentBrand.assets;

      for (const key of keys) {
        value = value?.[key];
        if (!value) break;
      }

      if (typeof value === "string") {
        return baseUrl + value;
      }
    }

    // Handle direct asset keys
    const assetValue =
      currentBrand.assets[assetKey as keyof BrandConfiguration["assets"]];
    if (typeof assetValue === "string") {
      return baseUrl + assetValue;
    }

    // Fallback to the key itself (might be a full URL)
    return baseUrl + assetKey;
  };

  // Get brand color
  const getBrandColor = (
    colorKey: keyof BrandConfiguration["colors"],
  ): string => {
    return currentBrand.colors[colorKey] || "";
  };

  // Get all available brands
  const availableBrands = useMemo(() => getAllBrands(), []);

  const contextValue: BrandContextValue = {
    brand: currentBrand,
    availableBrands,
    switchBrand,
    getAssetUrl,
    getBrandColor,
  };

  return (
    <BrandContext.Provider value={contextValue}>
      {children}
    </BrandContext.Provider>
  );
}

/**
 * Hook to use brand context
 */
export function useBrand(): BrandContextValue {
  const context = useContext(BrandContext);

  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }

  return context;
}

/**
 * Update CSS custom properties with brand colors
 */
function updateBrandColors(brand: BrandConfiguration) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const colors = brand.colors;

  // Update CSS custom properties
  if (colors.primary) root.style.setProperty("--primary", colors.primary);
  if (colors.primaryForeground)
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
  if (colors.secondary) root.style.setProperty("--secondary", colors.secondary);
  if (colors.secondaryForeground)
    root.style.setProperty(
      "--secondary-foreground",
      colors.secondaryForeground,
    );
  if (colors.accent) root.style.setProperty("--accent", colors.accent);
  if (colors.accentForeground)
    root.style.setProperty("--accent-foreground", colors.accentForeground);
  if (colors.destructive)
    root.style.setProperty("--destructive", colors.destructive);
  if (colors.success) root.style.setProperty("--chart-2", colors.success);
  if (colors.warning) root.style.setProperty("--chart-3", colors.warning);
  if (colors.info) root.style.setProperty("--chart-1", colors.info);
}

/**
 * Hook to get brand-specific asset URL
 */
export function useBrandAsset(
  assetKey: keyof BrandConfiguration["assets"] | string,
): string {
  const { getAssetUrl } = useBrand();
  return getAssetUrl(assetKey);
}

/**
 * Hook to get brand color
 */
export function useBrandColor(
  colorKey: keyof BrandConfiguration["colors"],
): string {
  const { getBrandColor } = useBrand();
  return getBrandColor(colorKey);
}
