import type { Icon } from "@/components/icons";
import type { User } from "@/db/types";

export type SidebarUser = Pick<User, "name" | "email" | "image">;

export interface SidebarData {
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
