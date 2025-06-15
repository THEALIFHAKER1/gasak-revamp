"use client";

import { motion } from "motion/react";

export default function Loader() {
  return (
    <div className="bg-background grid h-dvh w-dvw place-items-center">
      <div className="w-80 max-w-[80vw]">
        {/* Just the loading bar */}
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
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
