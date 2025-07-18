import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import type { ReactNode } from "react";

interface PaginationProps {
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  renderNumbers?: ReactNode;
}

export function Pagination({
  page = 1,
  totalPages = 10,
  onPageChange,
  renderNumbers,
}: PaginationProps) {
  // Presentational only, no logic
  return (
    <div className="flex w-full items-center justify-between gap-2">
      {/* Page numbers left */}
      <div className="bg-background flex gap-1 rounded-lg p-2">
        {renderNumbers ?? (
          <>
            <Button variant="outline" size="sm" className="bg-muted font-bold">
              1
            </Button>
            <Button variant="ghost" size="sm">
              2
            </Button>
            <Button variant="ghost" size="sm">
              3
            </Button>
            <span className="text-muted-foreground flex items-center px-2 text-xs">
              ...
            </span>
            <Button variant="ghost" size="sm">
              {totalPages}
            </Button>
          </>
        )}
      </div>
      {/* Arrows right */}
      <div className="bg-background flex gap-1 rounded-lg p-2">
        <Button
          variant="outline"
          size="sm"
          aria-label="Previous page"
          onClick={() => onPageChange?.(page - 1)}
        >
          <Icons.chevronRight className="h-4 w-4 rotate-180" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          aria-label="Next page"
          onClick={() => onPageChange?.(page + 1)}
        >
          <Icons.chevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
