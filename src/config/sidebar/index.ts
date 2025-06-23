import { Icons } from "@/components/icons";
import type { SidebarData, SidebarConfig } from "@/types/sidebar";
import type { UserRoleEnum } from "@/db/schema";

export type DashboardRole = UserRoleEnum;

type SidebarConfigMap = Record<
  UserRoleEnum,
  {
    data: SidebarData;
    config: SidebarConfig;
  }
>;

export const sidebarConfigurations: SidebarConfigMap = {
  admin: {
    data: {
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
      ],
    },
    config: {
      showUser: true,
      collapsible: "icon",
    },
  },
  leader: {
    data: {
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
      ],
    },
    config: {
      showUser: true,
      collapsible: "icon",
    },
  },
  member: {
    data: {
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
      ],
    },
    config: {
      showUser: true,
      collapsible: "icon",
    },
  },
  seller: {
    data: {
      navMain: [
        {
          title: "Sales Dashboard",
          url: "/dashboard/seller",
          icon: Icons.dashboard,
        },
        {
          title: "My Products",
          url: "/dashboard/seller/products",
          icon: Icons.building,
        },
        {
          title: "Orders",
          url: "/dashboard/seller/orders",
          icon: Icons.checkSquare,
          items: [
            {
              title: "Pending Orders",
              url: "/dashboard/seller/orders/pending",
            },
            {
              title: "Completed",
              url: "/dashboard/seller/orders/completed",
            },
            {
              title: "Returns",
              url: "/dashboard/seller/orders/returns",
            },
          ],
        },
        {
          title: "Inventory",
          url: "/dashboard/seller/inventory",
          icon: Icons.users,
        },
        {
          title: "Analytics",
          url: "/dashboard/seller/analytics",
          icon: Icons.trendingUp,
        },
        {
          title: "Profile",
          url: "/dashboard/seller/profile",
          icon: Icons.user,
        },
      ],
    },
    config: {
      showUser: true,
      collapsible: "icon",
    },
  },
};

export function getSidebarConfig(role: DashboardRole) {
  return sidebarConfigurations[role];
}
