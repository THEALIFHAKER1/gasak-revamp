import type { Icon } from "@/components/icons";

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
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

export interface SidebarData {
  user: SidebarUser;
  navMain: SidebarNavItem[];
}

export interface SidebarConfig {
  showUser?: boolean;
  collapsible?: "icon" | "offcanvas" | "none";
}
