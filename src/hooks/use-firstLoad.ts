"use client";

import { useSessionStorage } from "./use-session-storage";
import { useEffect, useState } from "react";

/**
 * Custom hook to determine if the app has performed its first load for a specific feature.
 * Stores a session flag with the provided key and delays marking as loaded.
 * @param key Unique storage key (e.g., 'splashscreen', 'tutorial', 'onboarding')
 * @param delay milliseconds to wait before marking first load complete
 */
export default function useFirstLoad(key: string, delay: number = 2000) {
  const storageKey = `firstload_${key}`;
  const [hasLoaded, setHasLoaded] = useSessionStorage<boolean>(
    storageKey,
    false
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted && !hasLoaded) {
      const timer = setTimeout(() => {
        setHasLoaded(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isMounted, hasLoaded, setHasLoaded, delay]);

  return {
    isFirstLoadComplete: hasLoaded,
    isMounted,
  };
}
