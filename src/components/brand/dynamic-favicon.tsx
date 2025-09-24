"use client";

import { useEffect } from "react";
import { useBrand } from "@/components/providers/brand-provider";

/**
 * Dynamic Favicon Component
 *
 * Updates the browser favicon based on the current brand configuration.
 * This component should be included in the root layout to ensure
 * the favicon is updated when the brand changes.
 */
export function DynamicFavicon() {
  const { getAssetUrl } = useBrand();

  useEffect(() => {
    // Update favicon
    const faviconUrl = getAssetUrl("favicon");
    updateFavicon(faviconUrl);

    // Update apple touch icon if available
    const appleTouchIconUrl = getAssetUrl("appleTouchIcon");
    if (appleTouchIconUrl) {
      updateAppleTouchIcon(appleTouchIconUrl);
    }
  }, [getAssetUrl]);

  return null; // This component doesn't render anything
}

/**
 * Update the browser favicon
 */
function updateFavicon(faviconUrl: string) {
  if (typeof document === "undefined") return;

  // Remove existing favicon links
  const existingFavicons = document.querySelectorAll('link[rel*="icon"]');
  existingFavicons.forEach((link) => link.remove());

  // Add new favicon
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/x-icon";
  link.href = faviconUrl;
  document.head.appendChild(link);

  // Add shortcut icon for older browsers
  const shortcutLink = document.createElement("link");
  shortcutLink.rel = "shortcut icon";
  shortcutLink.type = "image/x-icon";
  shortcutLink.href = faviconUrl;
  document.head.appendChild(shortcutLink);
}

/**
 * Update the Apple touch icon
 */
function updateAppleTouchIcon(appleTouchIconUrl: string) {
  if (typeof document === "undefined") return;

  // Remove existing apple touch icon
  const existingAppleIcons = document.querySelectorAll(
    'link[rel="apple-touch-icon"]',
  );
  existingAppleIcons.forEach((link) => link.remove());

  // Add new apple touch icon
  const link = document.createElement("link");
  link.rel = "apple-touch-icon";
  link.href = appleTouchIconUrl;
  document.head.appendChild(link);
}
