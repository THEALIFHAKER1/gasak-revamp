"use client";

import { HeaderBreadcrumbs } from "@/components/layouts/dashboard/dashboard-header";
import { DashboardPageHeading } from "@/components/layouts/dashboard/page/dashboard-page-heading";
import { CollapseSection } from "@/components/layouts/dashboard/page/collapse-section";
import { DashboardStats } from "@/components/layouts/dashboard/page/dashboard-stats";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "@/components/ui/filter";
import {
  IconPlus,
  IconClock,
  IconProgress,
  IconCheck,
  IconAlertCircle,
  IconUser,
  IconCalendar,
  IconMessage,
} from "@tabler/icons-react";
// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    title: "Implement User Authentication",
    description: "Set up OAuth2 integration with Google and GitHub",
    assignee: "John Doe",
    priority: "high",
    category: "Development",
    dueDate: "2025-08-20",
    status: "todo",
    comments: 3,
  },
  {
    id: 2,
    title: "Design Landing Page",
    description: "Create wireframes and mockups for the new landing page",
    assignee: "Jane Smith",
    priority: "medium",
    category: "Design",
    dueDate: "2025-08-18",
    status: "in-progress",
    comments: 1,
  },
  {
    id: 3,
    title: "Database Optimization",
    description: "Optimize queries and add proper indexing",
    assignee: "Mike Johnson",
    priority: "high",
    category: "Development",
    dueDate: "2025-08-16",
    status: "in-progress",
    comments: 5,
  },
  {
    id: 4,
    title: "Write API Documentation",
    description: "Complete documentation for all REST endpoints",
    assignee: "Sarah Wilson",
    priority: "low",
    category: "Documentation",
    dueDate: "2025-08-25",
    status: "done",
    comments: 2,
  },
  {
    id: 5,
    title: "Setup CI/CD Pipeline",
    description: "Configure automated testing and deployment",
    assignee: "Alex Brown",
    priority: "high",
    category: "DevOps",
    dueDate: "2025-08-22",
    status: "todo",
    comments: 0,
  },
  {
    id: 6,
    title: "User Testing Session",
    description: "Conduct usability testing with 10 users",
    assignee: "Emily Davis",
    priority: "medium",
    category: "Research",
    dueDate: "2025-08-19",
    status: "review",
    comments: 4,
  },
];

const columns = [
  {
    id: "todo",
    title: "To Do",
    icon: <IconClock className="h-4 w-4" />,
    color: "bg-gray-100 text-gray-700",
    count: mockTasks.filter((task) => task.status === "todo").length,
  },
  {
    id: "in-progress",
    title: "In Progress",
    icon: <IconProgress className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-700",
    count: mockTasks.filter((task) => task.status === "in-progress").length,
  },
  {
    id: "review",
    title: "Review",
    icon: <IconAlertCircle className="h-4 w-4" />,
    color: "bg-yellow-100 text-yellow-700",
    count: mockTasks.filter((task) => task.status === "review").length,
  },
  {
    id: "done",
    title: "Done",
    icon: <IconCheck className="h-4 w-4" />,
    color: "bg-green-100 text-green-700",
    count: mockTasks.filter((task) => task.status === "done").length,
  },
];

function TaskCard({ task }: { task: (typeof mockTasks)[0] }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date();

  return (
    <Card className="group mb-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Task Title and Priority */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm leading-tight font-semibold">
              {task.title}
            </h3>
            <Badge
              variant="outline"
              className={`text-xs ${getPriorityColor(task.priority)} flex-shrink-0`}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
          </div>

          {/* Task Description */}
          <p className="text-muted-foreground line-clamp-2 text-xs">
            {task.description}
          </p>

          {/* Category Badge */}
          <Badge variant="secondary" className="text-xs">
            {task.category}
          </Badge>

          {/* Task Meta Information */}
          <div className="space-y-2">
            {/* Assignee */}
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <IconUser className="h-3 w-3" />
              <span>{task.assignee}</span>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 text-xs">
              <IconCalendar className="h-3 w-3" />
              <span
                className={
                  isOverdue
                    ? "font-medium text-red-600"
                    : "text-muted-foreground"
                }
              >
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
              {isOverdue && (
                <Badge variant="destructive" className="px-1 py-0 text-xs">
                  Overdue
                </Badge>
              )}
            </div>

            {/* Comments */}
            {task.comments > 0 && (
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <IconMessage className="h-3 w-3" />
                <span>
                  {task.comments} comment{task.comments !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({ column }: { column: (typeof columns)[0] }) {
  const tasksInColumn = mockTasks.filter((task) => task.status === column.id);

  return (
    <div className="flex flex-col">
      {/* Column Header */}
      <div className="mb-4">
        <Card>
          <CardHeader className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {column.icon}
                <CardTitle className="text-sm font-semibold">
                  {column.title}
                </CardTitle>
                <Badge className={`text-xs ${column.color}`}>
                  {column.count}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <IconPlus className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Column Tasks */}
      <div className="flex-1 space-y-0">
        {tasksInColumn.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {/* Add Task Button */}
        <Button
          variant="ghost"
          className="border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/50 text-muted-foreground h-16 w-full border-2 border-dashed"
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
    </div>
  );
}

export default function AdminDashboardKanbanPage() {
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(
    (task) => task.status === "done",
  ).length;
  const inProgressTasks = mockTasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const overdueTasks = mockTasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== "done",
  ).length;

  return (
    <>
      <HeaderBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Kanban Board" },
        ]}
      />

      <DashboardPageHeading
        title="Project Kanban Board 📋"
        description="Manage and track project tasks across different stages of completion."
      />

      {/* Stats Overview */}
      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.kanban className="h-5 w-5" />
            <span>Task Overview</span>
          </div>
        }
        defaultOpen={true}
      >
        <DashboardStats
          stats={[
            {
              title: "Total Tasks",
              value: totalTasks.toString(),
              icon: <Icons.checkSquare className="h-4 w-4" />,
              trend: {
                value: "+5",
                isPositive: true,
                label: "this week",
              },
              description: "All tasks in the project",
            },
            {
              title: "In Progress",
              value: inProgressTasks.toString(),
              icon: <IconProgress className="h-4 w-4" />,
              trend: {
                value: "+2",
                isPositive: true,
                label: "vs last week",
              },
              description: "Currently being worked on",
            },
            {
              title: "Completed",
              value: completedTasks.toString(),
              icon: <IconCheck className="h-4 w-4" />,
              trend: {
                value: "+3",
                isPositive: true,
                label: "this week",
              },
              description: "Successfully completed tasks",
            },
            {
              title: "Overdue",
              value: overdueTasks.toString(),
              icon: <IconAlertCircle className="h-4 w-4" />,
              trend: {
                value: "-1",
                isPositive: true,
                label: "vs last week",
              },
              description: "Tasks past due date",
            },
          ]}
        />
      </CollapseSection>

      {/* Kanban Board */}
      <CollapseSection
        title={
          <div className="flex items-center gap-2">
            <Icons.kanban className="h-5 w-5" />
            <span>Task Board</span>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Icons.settings className="mr-2 h-4 w-4" />
              Board Settings
            </Button>
            <Button variant="default" size="sm">
              <IconPlus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        }
        defaultOpen={true}
      >
        <Card className="p-4">
          {/* Filters */}
          <div className="mb-6">
            <Filter
              placeholder="Search tasks..."
              dropdowns={[
                {
                  label: "Category",
                  icon: <Icons.building className="h-4 w-4" />,
                  options: [
                    { label: "All Categories", value: "all" },
                    { label: "Development", value: "development" },
                    { label: "Design", value: "design" },
                    { label: "Documentation", value: "documentation" },
                    { label: "DevOps", value: "devops" },
                    { label: "Research", value: "research" },
                  ],
                  id: "category",
                },
                {
                  label: "Priority",
                  icon: <IconAlertCircle className="h-4 w-4" />,
                  options: [
                    { label: "All Priorities", value: "all" },
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" },
                  ],
                  id: "priority",
                },
                {
                  label: "Assignee",
                  icon: <IconUser className="h-4 w-4" />,
                  options: [
                    { label: "All Assignees", value: "all" },
                    { label: "John Doe", value: "john" },
                    { label: "Jane Smith", value: "jane" },
                    { label: "Mike Johnson", value: "mike" },
                    { label: "Sarah Wilson", value: "sarah" },
                    { label: "Alex Brown", value: "alex" },
                    { label: "Emily Davis", value: "emily" },
                  ],
                  id: "assignee",
                },
              ]}
            />
          </div>

          {/* Kanban Columns */}
          <div className="tablet:grid-cols-2 desktop:grid-cols-4 grid grid-cols-1 gap-6">
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
          </div>
        </Card>
      </CollapseSection>
    </>
  );
}
