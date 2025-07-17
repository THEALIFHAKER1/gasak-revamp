"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";

import Loader from "./loader";
import { useMounted } from "@/hooks/use-mounted";
import useFirstload from "@/hooks/use-firstload";
interface SplashWrapperProps {
  children: React.ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const mounted = useMounted();
  const { isFirstLoadComplete } = useFirstload("splashscreen");

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {!isFirstLoadComplete ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Loader />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
