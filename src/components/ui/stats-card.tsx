import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  icon?: React.ReactNode;
  className?: string;
  isHover?: boolean;
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  icon,
  className,
  isHover = true,
}: StatsCardProps) {
  const hoverClasses = isHover
    ? "group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    : "group";
  return (
    <Card className={`${hoverClasses} ${className}`}>
      {/* Mobile: 2x2 Grid Layout, Tablet+: Vertical Layout */}
      <div className="tablet:block tablet:h-auto grid h-16 grid-cols-5 grid-rows-2">
        {/* Mobile: Large icon - left side (1 column, 2 rows) */}
        {icon && (
          <div className="tablet:hidden from-primary/10 to-primary/5 text-primary row-span-2 flex items-center justify-center rounded-l-lg bg-gradient-to-br">
            <div className="text-2xl">{icon}</div>
          </div>
        )}
        {/* Mobile: Title and Value - top right (4 columns, 1 row) */}
        <div className="tablet:hidden col-span-4 flex items-center justify-between px-3">
          <div>
            <CardDescription className="text-xs font-bold">
              <span className="truncate">{title}</span>
            </CardDescription>
          </div>
          <div>
            <CardTitle className="group-hover:text-primary text-right text-base font-semibold tabular-nums transition-colors">
              {value}
            </CardTitle>
          </div>
        </div>
        {/* Mobile: Footer and Badge - bottom right (4 columns, 1 row) */}
        <div className="tablet:hidden col-span-4 flex items-center justify-between px-3">
          <div className="flex flex-col gap-0.5">
            {description && (
              <div className="text-muted-foreground text-xs font-medium break-words">
                {description}
              </div>
            )}
          </div>
          <div>
            {trend && (
              <Badge
                variant="outline"
                className={`px-1 py-0.5 text-xs transition-all duration-200 ${
                  trend.isPositive
                    ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                } `}
              >
                {trend.isPositive ? (
                  <IconTrendingUp className="mr-0.5 h-2 w-2" />
                ) : (
                  <IconTrendingDown className="mr-0.5 h-2 w-2" />
                )}
                <span className="text-xs font-medium">{trend.value}</span>
              </Badge>
            )}
          </div>
        </div>
        {/* Tablet+: Reimagined horizontal layout */}
        <div className="tablet:block tablet:p-6 hidden">
          {/* Header section with icon and title */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="from-primary/10 to-primary/5 text-primary flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br">
                  <div className="text-2xl">{icon}</div>
                </div>
              )}
              <div>
                <CardDescription className="text-muted-foreground mb-1 text-sm font-medium">
                  {title}
                </CardDescription>
                <CardTitle className="group-hover:text-primary desktop:text-4xl text-3xl leading-none font-bold tabular-nums transition-colors">
                  {value}
                </CardTitle>
              </div>
            </div>

            {/* Trend badge in top right */}
            {trend && (
              <Badge
                variant="outline"
                className={`px-2 py-1 text-xs transition-all duration-200 ${
                  trend.isPositive
                    ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                } `}
              >
                {trend.isPositive ? (
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <IconTrendingDown className="mr-1 h-3 w-3" />
                )}
                <span className="text-xs font-medium">{trend.value}</span>
              </Badge>
            )}
          </div>

          {/* Footer with description */}
          {description && (
            <div className="border-border/50 border-t pt-3">
              <div className="text-muted-foreground text-sm font-medium">
                {description}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
