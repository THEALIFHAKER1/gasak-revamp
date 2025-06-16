import { StatsCard } from "@/components/ui/stats-card";
import React from "react";

interface DashboardStatsProps {
  stats: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend: {
      value: string;
      isPositive: boolean;
      label: string;
    };
    description: string;
  }[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="tablet:grid-cols-3 tablet:gap-4 desktop:gap-6 grid grid-cols-1 gap-2">
      {stats.map((stat, index) => (
        <StatsCard
          key={`${stat.title}-${index}`}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          description={stat.description}
          isHover={true}
        />
      ))}
    </div>
  );
}
