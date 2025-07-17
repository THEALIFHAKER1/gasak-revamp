import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

const roles = ["All", "Admin", "Leader", "Member", "Seller"];

export default function FilterUserTable() {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-2">
      {/* Left: Text Filter */}
      <Input
        type="text"
        placeholder="Search user..."
        className="max-w-xs"
        // value/onChange to be handled by parent
      />

      {/* Right: Sort & Type Dropdowns */}
      <div className="tablet:gap-4 flex gap-2">
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="tablet:w-auto tablet:h-9 tablet:px-4 tablet:min-w-[140px] flex h-9 w-9 min-w-0 items-center justify-center gap-2 p-2"
              aria-label="Sort"
            >
              {/* Icon always visible, text only on tablet+ */}
              <Icons.chevronsUpDown className="h-4 w-4" />
              <span className="tablet:inline hidden">
                Sort: Joined (Newest)
              </span>
              <span className="tablet:inline hidden">
                <Icons.chevronDown className="h-4 w-4" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>Joined (Newest)</DropdownMenuItem>
            <DropdownMenuItem>Joined (Oldest)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Type Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="tablet:w-auto tablet:h-9 tablet:px-4 tablet:min-w-[120px] flex h-9 w-9 min-w-0 items-center justify-center gap-2 p-2"
              aria-label="Type"
            >
              {/* Icon always visible, text only on tablet+ */}
              <Icons.users className="h-4 w-4" />
              <span className="tablet:inline hidden">Type: All</span>
              <span className="tablet:inline hidden">
                <Icons.chevronDown className="h-4 w-4" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {roles.map((role) => (
              <DropdownMenuItem key={role}>{role}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
