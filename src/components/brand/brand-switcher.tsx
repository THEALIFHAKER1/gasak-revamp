"use client";

import React from "react";
import { useBrand } from "@/components/providers/brand-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Brand Switcher Component
 *
 * Allows switching between different brand configurations.
 * Useful for testing and demonstration purposes.
 * In production, brand switching might be controlled by environment variables
 * or user permissions.
 */
export function BrandSwitcher() {
  const { brand, availableBrands, switchBrand } = useBrand();

  const handleBrandChange = (brandId: string) => {
    switchBrand(brandId);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Brand:</span>
      <Select value={brand.id} onValueChange={handleBrandChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select brand" />
        </SelectTrigger>
        <SelectContent>
          {availableBrands.map((brandOption) => (
            <SelectItem key={brandOption.id} value={brandOption.id}>
              <div className="flex items-center gap-2">
                <span>{brandOption.metadata.name}</span>
                {brandOption.active && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Brand Info Display Component
 *
 * Shows current brand information for debugging/testing purposes.
 */
export function BrandInfo() {
  const { brand, getAssetUrl, getBrandColor } = useBrand();

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Current Brand Info</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <strong>ID:</strong> {brand.id}
        </div>
        <div>
          <strong>Name:</strong> {brand.metadata.name}
        </div>
        <div>
          <strong>Tagline:</strong> {brand.metadata.tagline}
        </div>
        <div>
          <strong>Active:</strong> {brand.active ? "Yes" : "No"}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Colors:</h4>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border"
              style={{ backgroundColor: getBrandColor("primary") }}
            />
            <span className="text-xs">Primary</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border"
              style={{ backgroundColor: getBrandColor("secondary") }}
            />
            <span className="text-xs">Secondary</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded border"
              style={{ backgroundColor: getBrandColor("accent") }}
            />
            <span className="text-xs">Accent</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Assets:</h4>
        <div className="space-y-1 text-xs">
          <div>
            <strong>Logo:</strong> {getAssetUrl("logo")}
          </div>
          <div>
            <strong>Favicon:</strong> {getAssetUrl("favicon")}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Brand Demo Component
 *
 * Combines brand switcher and info for easy testing.
 */
export function BrandDemo() {
  return (
    <div className="space-y-4">
      <BrandSwitcher />
      <BrandInfo />
    </div>
  );
}
