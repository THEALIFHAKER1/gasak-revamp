"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import type { ReactNode } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownConfig {
  id: string;
  label: string;
  icon?: ReactNode | ((selected: Option) => ReactNode);
  options: Option[];
}

interface FilterProps {
  placeholder: string;
  dropdowns: DropdownConfig[];
}

export function Filter({ placeholder, dropdowns }: FilterProps) {
  const [search, setSearch] = useState("");
  const emptyOption: Option = { label: "", value: "" };
  const [selectedValues, setSelectedValues] = useState<Record<string, Option>>(
    () =>
      dropdowns.reduce(
        (acc, dropdown) => {
          acc[dropdown.id] = dropdown.options[0] ?? emptyOption;
          return acc;
        },
        {} as Record<string, Option>,
      ),
  );

  // Helper to always get a valid Option for a dropdown
  const getSelectedOption = (dropdown: DropdownConfig): Option => {
    return selectedValues[dropdown.id] ?? dropdown.options[0] ?? emptyOption;
  };

  return (
    <div className="flex w-full flex-row items-center justify-between gap-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs"
      />
      <div className="tablet:gap-4 flex gap-2">
        {dropdowns.map((dropdown) => (
          <DropdownMenu key={dropdown.id}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="tablet:w-auto tablet:h-9 tablet:px-4 tablet:min-w-[120px] flex h-9 w-9 min-w-0 items-center justify-center gap-2 p-2"
                aria-label={dropdown.label}
              >
                {typeof dropdown.icon === "function"
                  ? dropdown.icon(getSelectedOption(dropdown))
                  : (dropdown.icon ?? (
                      <Icons.chevronsUpDown className="h-4 w-4" />
                    ))}
                <span className="tablet:inline hidden">
                  {dropdown.label}: {getSelectedOption(dropdown).label}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {dropdown.options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => {
                    setSelectedValues((prev) => ({
                      ...prev,
                      [dropdown.id]: option,
                    }));
                  }}
                  aria-checked={
                    getSelectedOption(dropdown).value === option.value
                  }
                  className={
                    getSelectedOption(dropdown).value === option.value
                      ? "bg-muted font-bold"
                      : ""
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
}
