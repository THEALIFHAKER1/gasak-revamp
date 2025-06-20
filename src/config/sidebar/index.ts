import { Icons } from "@/components/icons";
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
          url: "/dashboard/admin",
          icon: Icons.dashboard,
        },
        {
          title: "Kanban Board",
          url: "/dashboard/admin/kanban",
          icon: Icons.kanban,
        },
        {
          title: "Squad Management",
          url: "/dashboard/admin/squad",
          icon: Icons.users,
        },
        {
          title: "User Management",
          url: "/dashboard/admin/user",
          icon: Icons.userCheck,
        },
        {
          title: "Auth Comparison",
          url: "/dashboard/admin/auth-comparison",
          icon: Icons.checkSquare,
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
          url: "/dashboard/leader",
          icon: Icons.dashboard,
        },
        {
          title: "Team Management",
          url: "/dashboard/leader/team",
          icon: Icons.users,
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
          icon: Icons.calendar,
        },
        {
          title: "Communication",
          url: "/dashboard/leader/communication",
          icon: Icons.messageSquare,
        },
        {
          title: "Settings",
          url: "/dashboard/leader/settings",
          icon: Icons.settings,
        },
        {
          title: "Auth Comparison",
          url: "/dashboard/leader/auth-comparison",
          icon: Icons.checkSquare,
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
          url: "/dashboard/member",
          icon: Icons.dashboard,
        },
        {
          title: "My Tasks",
          url: "/dashboard/member/tasks",
          icon: Icons.checkSquare,
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
          icon: Icons.calendar,
        },
        {
          title: "Messages",
          url: "/dashboard/member/messages",
          icon: Icons.messageSquare,
        },
        {
          title: "Profile",
          url: "/dashboard/member/profile",
          icon: Icons.user,
        },
        {
          title: "Settings",
          url: "/dashboard/member/settings",
          icon: Icons.settings,
        },
        {
          title: "Auth Comparison",
          url: "/dashboard/member/auth-comparison",
          icon: Icons.checkSquare,
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
