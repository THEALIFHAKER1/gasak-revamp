"use client";

import { getSidebarConfig, type DashboardRole } from "@/config/sidebar";
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { logout } from "@/actions/logout";
import type {
  SidebarData,
  SidebarConfig,
  SidebarNavItem,
  SidebarUser,
} from "@/types/sidebar";
import useAuth from "@/hooks/use-auth";
import { useBrand } from "@/components/providers/brand-provider";

interface DashboardSidebarProps {
  role: DashboardRole;
  className?: string;
  customData?: Partial<SidebarData>;
  customConfig?: Partial<SidebarConfig>;
}

// Brand-aware logo component
const BrandLogo = ({ className }: { className?: string }) => {
  const { brand, getAssetUrl } = useBrand();

  return (
    <Image
      src={getAssetUrl("logo")}
      alt={`${brand.metadata.name} Logo`}
      width={40}
      height={40}
      className={className}
    />
  );
};

// Custom SidebarBrand component
interface SidebarBrandProps {
  logo?: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
}

const SidebarBrand = ({ logo: Logo, title, subtitle }: SidebarBrandProps) => {
  const { state } = useSidebar();

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      {Logo && <Logo className="h-8 w-8 shrink-0" />}
      <div
        className={`flex flex-col transition-opacity duration-200 ${
          state === "collapsed"
            ? "opacity-0 group-data-[collapsible=icon]:opacity-0"
            : "opacity-100"
        }`}
      >
        <span className="text-sm font-semibold">{title}</span>
        {subtitle && (
          <span className="text-muted-foreground text-xs">{subtitle}</span>
        )}
      </div>
    </div>
  );
};

// Custom NavMain component
interface NavMainProps {
  items: SidebarNavItem[];
}

const NavMain = ({ items }: NavMainProps) => {
  const pathname = usePathname();
  const { isMobile, setOpenMobile, state, setOpen } = useSidebar();

  // Function to check if a route is active
  const isRouteActive = (url: string) => {
    // Exact match
    if (pathname === url) return true;

    // Check if this URL is a dashboard root route by looking at the sidebar items
    // Dashboard root routes are those that match the pattern /dashboard/[role] and are in the main nav
    const isDashboardRoot = items.some(
      (item) =>
        item.url === url &&
        /^\/dashboard\/[^\/]+$/.test(url) &&
        item.title.toLowerCase().includes("dashboard"),
    );

    if (isDashboardRoot) {
      // For dashboard root routes, also match their sub-paths
      // e.g., /dashboard/admin should be active when on /dashboard/admin/users
      return pathname.startsWith(url + "/");
    }

    // For non-dashboard routes, check if current path starts with the URL
    return pathname.startsWith(url + "/");
  };

  // Function to check if any sub-item is active
  const hasActiveSubItem = (subItems: { url: string }[]) => {
    return subItems.some((subItem) => isRouteActive(subItem.url));
  };

  // Handle navigation click
  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
    // Auto-collapse sidebar on mobile after navigation
    if (state === "expanded" && isMobile) {
      setOpen(false);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = isRouteActive(item.url);
            const hasSubItems = item.items && item.items.length > 0;
            const hasActiveSub = hasSubItems
              ? hasActiveSubItem(item.items!)
              : false;
            const shouldShowAsActive = isActive || hasActiveSub;

            if (hasSubItems) {
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={hasActiveSub}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={shouldShowAsActive}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <Icons.chevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items!.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isRouteActive(subItem.url)}
                            >
                              <Link href={subItem.url} onClick={handleNavClick}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={shouldShowAsActive}
                >
                  <Link href={item.url} onClick={handleNavClick}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

// Custom NavUser component
interface NavUserProps {
  user: SidebarUser;
}

const NavUser = ({ user }: NavUserProps) => {
  const { isMobile, state } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Close dropdown when sidebar collapses
  React.useEffect(() => {
    if (state === "collapsed") {
      setIsDropdownOpen(false);
    }
  }, [state]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSettings = () => {
    // Add settings logic here
    console.log("Opening settings...");
  };

  const handleProfile = () => {
    // Add profile logic here
    console.log("Opening profile...");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <Icons.chevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleProfile}>
              <Icons.user className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              <Icons.settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <Icons.logout className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export function DashboardSidebar({
  role,
  customData,
  customConfig,
}: DashboardSidebarProps) {
  const { user: loggedUser, isAuthenticated, isLoading } = useAuth();
  const { brand } = useBrand();

  const baseConfig = getSidebarConfig(role);
  const userData = React.useMemo(
    () =>
      isAuthenticated && loggedUser && loggedUser.name && loggedUser.email
        ? {
            name: loggedUser.name,
            email: loggedUser.email,
            image: loggedUser.image ?? null,
          }
        : null,
    [isAuthenticated, loggedUser],
  );
  const data = {
    ...baseConfig.data,
    user: userData,
    ...customData,
  };

  const config = customConfig
    ? { ...baseConfig.config, ...customConfig }
    : baseConfig.config;
  // Loading skeleton component for user section
  const UserSkeleton = () => (
    <div className="flex items-center gap-2 px-1 py-1.5">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="grid flex-1 gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );

  // Loading skeleton for navigation items
  const NavSkeleton = () => (
    <div className="space-y-2 p-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 px-2 py-1.5">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );

  return (
    <Sidebar collapsible={config.collapsible}>
      <SidebarHeader>
        <SidebarBrand
          logo={BrandLogo}
          title={brand.metadata.name}
          subtitle={brand.metadata.tagline}
        />
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <NavSkeleton />
        ) : (
          data.navMain && <NavMain items={data.navMain} />
        )}
      </SidebarContent>
      {config.showUser && (
        <SidebarFooter>
          {isLoading ? (
            <UserSkeleton />
          ) : (
            userData && <NavUser user={userData} />
          )}
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
