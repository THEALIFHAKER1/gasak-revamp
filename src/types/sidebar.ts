import type { Icon } from "@/components/icons";
import type { User } from "@/db/types";

export interface SidebarData {
  user?: Pick<User, "name" | "email" | "image">;
  navMain: SidebarNavItem[];
}

export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: Icon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

export interface SidebarConfig {
  showUser?: boolean;
  collapsible?: "icon" | "offcanvas" | "none";
}
