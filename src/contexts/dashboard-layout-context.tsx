"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface DashboardLayoutContextType {
  headerSlot: ReactNode;
  setHeaderSlot: (content: ReactNode) => void;
}

const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(
  undefined
);

export function DashboardLayoutProvider({ children }: { children: ReactNode }) {
  const [headerSlot, setHeaderSlot] = React.useState<ReactNode>(null);

  return (
    <DashboardLayoutContext.Provider value={{ headerSlot, setHeaderSlot }}>
      {children}
    </DashboardLayoutContext.Provider>
  );
}

export function useDashboardLayout() {
  const context = useContext(DashboardLayoutContext);
  if (context === undefined) {
    throw new Error("useDashboardLayout must be used within DashboardLayoutProvider");
  }
  return context;
}
