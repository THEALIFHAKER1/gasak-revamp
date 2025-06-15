import {
  // Sidebar Navigation Icons
  IconChartBar,
  IconSettings,
  IconUserCheck,
  IconSquareCheck,
  IconCalendar,
  IconMessage,
  IconUser,
  IconUsers,
  IconLayoutKanban,

  // UI Component Icons
  IconLayoutSidebarLeftCollapse,
  IconSelector,
  IconLogout,
  IconChevronRight,
  IconChevronDown,
  IconPlus,
  IconBuilding,
  IconDots,
  IconCheck,
  IconCircle,
  IconX,
} from "@tabler/icons-react";
import type { IconProps } from "@tabler/icons-react";

export type Icon = React.ComponentType<IconProps>;

export const Icons = {
  // Dashboard and Navigation
  dashboard: IconChartBar,
  settings: IconSettings,
  userCheck: IconUserCheck,
  checkSquare: IconSquareCheck,
  calendar: IconCalendar,
  messageSquare: IconMessage,
  user: IconUser,
  users: IconUsers,
  kanban: IconLayoutKanban,

  // UI Controls
  panelLeft: IconLayoutSidebarLeftCollapse,
  chevronsUpDown: IconSelector,
  logout: IconLogout,
  chevronRight: IconChevronRight,
  chevronDown: IconChevronDown,
  plus: IconPlus,
  building: IconBuilding,
  moreHorizontal: IconDots,
  check: IconCheck,
  circle: IconCircle,
  close: IconX,
};
