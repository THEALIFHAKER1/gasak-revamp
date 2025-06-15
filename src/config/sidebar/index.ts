import {
  BarChart3,
  Settings,
  UserCheck,
  CheckSquare,
  Calendar,
  MessageSquare,
  User,
  Users,
  Kanban,
} from "lucide-react";
import type { SidebarData, SidebarConfig } from "@/types/sidebar";

export type DashboardRole = "admin" | "leader" | "member";

// Unified sidebar configurations
export const sidebarConfigurations: Record<
  DashboardRole,
  {
    data: SidebarData;
    config: SidebarConfig;
  }
> = {
  admin: {
    data: {
      user: {
        name: "Admin User",
        email: "admin@gasak.com",
        avatar: "/avatars/admin.jpg",
      },
      navMain: [
        {
          title: "Main Dashboard",
          url: "/dashboard/admin/main",
          icon: BarChart3,
          isActive: true,
        },
        {
          title: "Kanban Board",
          url: "/dashboard/admin/kanban",
          icon: Kanban,
        },
        {
          title: "Squad Management",
          url: "/dashboard/admin/squad",
          icon: Users,
        },
        {
          title: "User Management",
          url: "/dashboard/admin/user",
          icon: UserCheck,
        },
      ],
    },
    config: {
      showUser: true,
      collapsible: "icon",
    },
  },
  leader: {
    data: {
      user: {
        name: "Team Leader",
        email: "leader@gasak.com",
        avatar: "/avatars/leader.jpg",
      },
      navMain: [
        {
          title: "Dashboard",
          url: "/dashboard/leader/main",
          icon: BarChart3,
          isActive: true,
        },
        {
          title: "Team Management",
          url: "/dashboard/leader/team",
          icon: Users,
          items: [
            {
              title: "Team Overview",
              url: "/dashboard/leader/team/overview",
            },
            {
              title: "Performance",
              url: "/dashboard/leader/team/performance",
            },
            {
              title: "Tasks",
              url: "/dashboard/leader/team/tasks",
            },
          ],
        },
        {
          title: "Schedule",
          url: "/dashboard/leader/schedule",
          icon: Calendar,
        },
        {
          title: "Communication",
          url: "/dashboard/leader/communication",
          icon: MessageSquare,
        },
        {
          title: "Settings",
          url: "/dashboard/leader/settings",
          icon: Settings,
        },
      ],
    },
    config: {
      showUser: true,
      collapsible: "icon",
    },
  },
  member: {
    data: {
      user: {
        name: "Team Member",
        email: "member@gasak.com",
        avatar: "/avatars/member.jpg",
      },
      navMain: [
        {
          title: "My Dashboard",
          url: "/dashboard/member/main",
          icon: BarChart3,
          isActive: true,
        },
        {
          title: "My Tasks",
          url: "/dashboard/member/tasks",
          icon: CheckSquare,
          items: [
            {
              title: "Active Tasks",
              url: "/dashboard/member/tasks/active",
            },
            {
              title: "Completed",
              url: "/dashboard/member/tasks/completed",
            },
            {
              title: "Pending Review",
              url: "/dashboard/member/tasks/review",
            },
          ],
        },
        {
          title: "Schedule",
          url: "/dashboard/member/schedule",
          icon: Calendar,
        },
        {
          title: "Messages",
          url: "/dashboard/member/messages",
          icon: MessageSquare,
        },
        {
          title: "Profile",
          url: "/dashboard/member/profile",
          icon: User,
        },
        {
          title: "Settings",
          url: "/dashboard/member/settings",
          icon: Settings,
        },
      ],
    },
    config: {
      showUser: true,
      collapsible: "icon",
    },
  },
};

// Helper function to get sidebar configuration by role
export function getSidebarConfig(role: DashboardRole) {
  return sidebarConfigurations[role];
}

// Export individual data for backward compatibility if needed
export const adminSidebarData = sidebarConfigurations.admin.data;
export const leaderSidebarData = sidebarConfigurations.leader.data;
export const memberSidebarData = sidebarConfigurations.member.data;
