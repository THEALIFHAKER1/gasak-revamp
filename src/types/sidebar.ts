import type { LucideIcon } from "lucide-react";

export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
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
