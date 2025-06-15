"use client";

import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="bg-background grid h-dvh w-dvw place-items-center">
      <div className="w-80 max-w-[80vw]">
        {/* Just the loading bar */}
        <div className="bg-muted h-1 overflow-hidden rounded-full">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </div>
  );
}
