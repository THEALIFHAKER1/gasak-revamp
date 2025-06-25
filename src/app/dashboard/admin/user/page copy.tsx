"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import type { UserRoleEnum } from "@/db/schema";

// Mock data for demonstration
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
  ign?: string;
  image?: string;
  createdAt: Date;
  status: "active" | "inactive" | "pending";
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    ign: "JohnGamer",
    image: "/avatars/john.jpg",
    createdAt: new Date("2024-01-15"),
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "leader",
    ign: "SarahLeader",
    image: "/avatars/sarah.jpg",
    createdAt: new Date("2024-02-20"),
    status: "active",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    role: "member",
    ign: "MikeChenGamer",
    createdAt: new Date("2024-03-10"),
    status: "active",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    role: "seller",
    ign: "EmilyStore",
    image: "/avatars/emily.jpg",
    createdAt: new Date("2024-03-25"),
    status: "inactive",
  },
  {
    id: "5",
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    role: "member",
    ign: "AlexT",
    createdAt: new Date("2024-04-05"),
    status: "pending",
  },
];

const getRoleBadgeVariant = (role: UserRoleEnum) => {
  switch (role) {
    case "admin":
      return "destructive";
    case "leader":
      return "default";
    case "seller":
      return "secondary";
    case "member":
    default:
      return "outline";
  }
};

const getStatusBadgeVariant = (status: User["status"]) => {
  switch (status) {
    case "active":
      return "default";
    case "inactive":
      return "secondary";
    case "pending":
      return "outline";
  }
};

export default function AdminDashboardUserPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRoleEnum | "all">("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isUsersTableOpen, setIsUsersTableOpen] = useState(true);
  const [isStatsOpen, setIsStatsOpen] = useState(true);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ign?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      {/* Header */}
      <div className="tablet:gap-4 laptop:flex-row laptop:items-center laptop:justify-between flex flex-col gap-3">
        <div>
          <h1 className="tablet:text-3xl text-2xl font-bold tracking-tight">
            User Management
          </h1>
          <p className="text-muted-foreground tablet:text-base text-sm">
            Manage all users and their roles in the system
          </p>
        </div>

        {/* Add User Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="laptop:w-auto w-full">
              <Icons.plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </SheetTrigger>
          <SheetContent className="tablet:w-[400px] laptop:w-[540px] w-full overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Add New User</SheetTitle>
              <SheetDescription>
                Create a new user account with role and permissions.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="tablet:grid tablet:grid-cols-4 tablet:items-center tablet:gap-4 tablet:space-y-0 space-y-2">
                <label
                  htmlFor="name"
                  className="tablet:text-right text-sm font-medium"
                >
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="tablet:col-span-3"
                />
              </div>
              <div className="tablet:grid tablet:grid-cols-4 tablet:items-center tablet:gap-4 tablet:space-y-0 space-y-2">
                <label
                  htmlFor="email"
                  className="tablet:text-right text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="tablet:col-span-3"
                />
              </div>
              <div className="tablet:grid tablet:grid-cols-4 tablet:items-center tablet:gap-4 tablet:space-y-0 space-y-2">
                <label
                  htmlFor="ign"
                  className="tablet:text-right text-sm font-medium"
                >
                  IGN
                </label>
                <Input
                  id="ign"
                  placeholder="JohnGamer"
                  className="tablet:col-span-3"
                />
              </div>
              <div className="tablet:grid tablet:grid-cols-4 tablet:items-center tablet:gap-4 tablet:space-y-0 space-y-2">
                <label
                  htmlFor="password"
                  className="tablet:text-right text-sm font-medium"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  className="tablet:col-span-3"
                />
              </div>
              <div className="tablet:grid tablet:grid-cols-4 tablet:items-center tablet:gap-4 tablet:space-y-0 space-y-2">
                <label
                  htmlFor="role"
                  className="tablet:text-right text-sm font-medium"
                >
                  Role
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="tablet:col-span-3 w-full justify-start"
                    >
                      Select role
                      <Icons.chevronDown className="ml-auto h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem>Admin</DropdownMenuItem>
                    <DropdownMenuItem>Leader</DropdownMenuItem>
                    <DropdownMenuItem>Member</DropdownMenuItem>
                    <DropdownMenuItem>Seller</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <SheetFooter>
              <Button type="submit" className="w-full">
                Create User
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Statistics Widget */}
      <Collapsible open={isStatsOpen} onOpenChange={setIsStatsOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <div className="tablet:p-6 hover:bg-muted/50 flex cursor-pointer items-center justify-between p-4 transition-colors">
              <div className="flex items-center gap-2">
                <Icons.trendingUp className="tablet:h-5 tablet:w-5 text-muted-foreground h-4 w-4" />
                <h2 className="tablet:text-lg text-base font-semibold">
                  User Statistics
                </h2>
              </div>
              <Icons.chevronDown
                className={`h-4 w-4 transition-transform ${isStatsOpen ? "rotate-180" : ""}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="tablet:px-6 tablet:pb-6 px-4 pb-4">
              <div className="tablet:gap-4 laptop:grid-cols-2 desktop:grid-cols-4 grid grid-cols-2 gap-3">
                <Card className="tablet:p-4 p-3">
                  <div className="flex items-center gap-2">
                    <Icons.users className="tablet:h-4 tablet:w-4 text-muted-foreground h-3 w-3" />
                    <span className="tablet:text-sm text-xs font-medium">
                      Total Users
                    </span>
                  </div>
                  <div className="tablet:text-2xl text-lg font-bold">
                    {mockUsers.length}
                  </div>
                </Card>
                <Card className="tablet:p-4 p-3">
                  <div className="flex items-center gap-2">
                    <Icons.crown className="tablet:h-4 tablet:w-4 text-muted-foreground h-3 w-3" />
                    <span className="tablet:text-sm text-xs font-medium">
                      Admins
                    </span>
                  </div>
                  <div className="tablet:text-2xl text-lg font-bold">
                    {mockUsers.filter((u) => u.role === "admin").length}
                  </div>
                </Card>
                <Card className="tablet:p-4 p-3">
                  <div className="flex items-center gap-2">
                    <Icons.userCheck className="tablet:h-4 tablet:w-4 text-muted-foreground h-3 w-3" />
                    <span className="tablet:text-sm text-xs font-medium">
                      Leaders
                    </span>
                  </div>
                  <div className="tablet:text-2xl text-lg font-bold">
                    {mockUsers.filter((u) => u.role === "leader").length}
                  </div>
                </Card>
                <Card className="tablet:p-4 p-3">
                  <div className="flex items-center gap-2">
                    <Icons.check className="tablet:h-4 tablet:w-4 text-muted-foreground h-3 w-3" />
                    <span className="tablet:text-sm text-xs font-medium">
                      Active Users
                    </span>
                  </div>
                  <div className="tablet:text-2xl text-lg font-bold">
                    {mockUsers.filter((u) => u.status === "active").length}
                  </div>
                </Card>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Filters Widget */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <div className="tablet:p-6 hover:bg-muted/50 flex cursor-pointer items-center justify-between p-4 transition-colors">
              <div className="flex items-center gap-2">
                <Icons.settings className="tablet:h-5 tablet:w-5 text-muted-foreground h-4 w-4" />
                <h2 className="tablet:text-lg text-base font-semibold">
                  Search & Filters
                </h2>
              </div>
              <Icons.chevronDown
                className={`h-4 w-4 transition-transform ${isFiltersOpen ? "rotate-180" : ""}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="tablet:px-6 tablet:pb-6 px-4 pb-4">
              <div className="tablet:gap-4 laptop:flex-row laptop:items-center flex flex-col gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Search users by name, email, or IGN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="tablet:max-w-tablet w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="laptop:w-auto w-full"
                      >
                        <Icons.users className="mr-2 h-4 w-4" />
                        <span className="truncate">
                          {roleFilter === "all" ? "All Roles" : roleFilter}
                        </span>
                        <Icons.chevronDown className="ml-2 h-4 w-4 flex-shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                        All Roles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRoleFilter("admin")}>
                        Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRoleFilter("leader")}>
                        Leader
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRoleFilter("member")}>
                        Member
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRoleFilter("seller")}>
                        Seller
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Users Table Widget */}
      <Collapsible open={isUsersTableOpen} onOpenChange={setIsUsersTableOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <div className="tablet:p-6 hover:bg-muted/50 flex cursor-pointer items-center justify-between p-4 transition-colors">
              <div className="flex min-w-0 items-center gap-2">
                <Icons.users className="tablet:h-5 tablet:w-5 text-muted-foreground h-4 w-4 flex-shrink-0" />
                <h2 className="tablet:text-lg text-base font-semibold">
                  Users Table
                </h2>
                <Badge variant="secondary" className="text-xs">
                  {filteredUsers.length} users
                </Badge>
              </div>
              <Icons.chevronDown
                className={`h-4 w-4 flex-shrink-0 transition-transform ${isUsersTableOpen ? "rotate-180" : ""}`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {/* Mobile Card View */}
            <div className="tablet:hidden space-y-3 p-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="bg-muted flex h-full w-full items-center justify-center">
                          <Icons.user className="h-6 w-6" />
                        </div>
                      )}
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-medium">{user.name}</h3>
                          <p className="text-muted-foreground truncate text-sm">
                            {user.email}
                          </p>
                        </div>
                        <div className="ml-2 flex gap-1">
                          {/* Mobile Action Buttons */}
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Icons.user className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle>User Profile</SheetTitle>
                                <SheetDescription>
                                  View detailed information about {user.name}
                                </SheetDescription>
                              </SheetHeader>
                              <div className="flex flex-col gap-6 py-4">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16 flex-shrink-0">
                                    {user.image ? (
                                      <img
                                        src={user.image}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <div className="bg-muted flex h-full w-full items-center justify-center">
                                        <Icons.user className="h-8 w-8" />
                                      </div>
                                    )}
                                  </Avatar>
                                  <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-lg font-semibold">
                                      {user.name}
                                    </h3>
                                    <p className="text-muted-foreground truncate text-sm">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Role:
                                    </span>
                                    <Badge
                                      variant={getRoleBadgeVariant(user.role)}
                                    >
                                      {user.role}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Status:
                                    </span>
                                    <Badge
                                      variant={getStatusBadgeVariant(
                                        user.status,
                                      )}
                                    >
                                      {user.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      IGN:
                                    </span>
                                    <span className="truncate font-mono text-sm">
                                      {user.ign ?? "-"}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Joined:
                                    </span>
                                    <span className="text-sm">
                                      {user.createdAt.toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>

                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Icons.settings className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle>Edit User</SheetTitle>
                                <SheetDescription>
                                  Update {user.name}&apos;s information and
                                  settings.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="flex flex-col gap-4 py-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    Name
                                  </label>
                                  <Input defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    Email
                                  </label>
                                  <Input defaultValue={user.email} />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    IGN
                                  </label>
                                  <Input defaultValue={user.ign ?? ""} />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    Role
                                  </label>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                      >
                                        {user.role}
                                        <Icons.chevronDown className="ml-auto h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                      <DropdownMenuItem>Admin</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Leader
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Member
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Seller
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">
                                    Status
                                  </label>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start"
                                      >
                                        {user.status}
                                        <Icons.chevronDown className="ml-auto h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                      <DropdownMenuItem>
                                        Active
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Inactive
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Pending
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <SheetFooter className="flex flex-col gap-2">
                                <Button variant="outline" className="w-full">
                                  Cancel
                                </Button>
                                <Button className="w-full">Save Changes</Button>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>

                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Icons.close className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle className="text-destructive">
                                  Delete User
                                </SheetTitle>
                                <SheetDescription>
                                  This action cannot be undone. This will
                                  permanently delete {user.name}&apos;s account.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="flex flex-col gap-6 py-4">
                                <div className="bg-destructive/10 border-destructive/20 flex items-center gap-4 rounded-lg border p-4">
                                  <Icons.close className="text-destructive h-8 w-8 flex-shrink-0" />
                                  <div>
                                    <h4 className="text-destructive font-semibold">
                                      Warning
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                      Deleting this user will remove all their
                                      data and cannot be recovered.
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                      User:
                                    </span>
                                    <span className="text-sm">{user.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                      Email:
                                    </span>
                                    <span className="truncate text-sm">
                                      {user.email}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                      Role:
                                    </span>
                                    <Badge
                                      variant={getRoleBadgeVariant(user.role)}
                                    >
                                      {user.role}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <SheetFooter className="flex flex-col gap-2">
                                <Button variant="outline" className="w-full">
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="w-full"
                                >
                                  Delete User
                                </Button>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge
                          variant={getRoleBadgeVariant(user.role)}
                          className="text-xs"
                        >
                          {user.role}
                        </Badge>
                        <Badge
                          variant={getStatusBadgeVariant(user.status)}
                          className="text-xs"
                        >
                          {user.status}
                        </Badge>
                      </div>
                      <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span>IGN: {user.ign ?? "-"}</span>
                        <span>
                          Joined: {user.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="tablet:block hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>IGN</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            {user.image ? (
                              <img
                                src={user.image}
                                alt={user.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="bg-muted flex h-full w-full items-center justify-center">
                                <Icons.user className="h-4 w-4" />
                              </div>
                            )}
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-muted-foreground text-sm">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.ign ? (
                          <span className="font-mono text-sm">{user.ign}</span>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            -
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground text-sm">
                          {user.createdAt.toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {/* View User Sheet */}
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Icons.user className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="tablet:w-[540px] w-[400px] overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle>User Profile</SheetTitle>
                                <SheetDescription>
                                  View detailed information about {user.name}
                                </SheetDescription>
                              </SheetHeader>
                              <div className="flex flex-col gap-6 py-4">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16 flex-shrink-0">
                                    {user.image ? (
                                      <img
                                        src={user.image}
                                        alt={user.name}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <div className="bg-muted flex h-full w-full items-center justify-center">
                                        <Icons.user className="h-8 w-8" />
                                      </div>
                                    )}
                                  </Avatar>
                                  <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-lg font-semibold">
                                      {user.name}
                                    </h3>
                                    <p className="text-muted-foreground truncate text-sm">
                                      {user.email}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Role:
                                    </span>
                                    <Badge
                                      variant={getRoleBadgeVariant(user.role)}
                                    >
                                      {user.role}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Status:
                                    </span>
                                    <Badge
                                      variant={getStatusBadgeVariant(
                                        user.status,
                                      )}
                                    >
                                      {user.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      IGN:
                                    </span>
                                    <span className="truncate font-mono text-sm">
                                      {user.ign ?? "-"}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      Joined:
                                    </span>
                                    <span className="text-sm">
                                      {user.createdAt.toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>

                          {/* Edit User Sheet */}
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Icons.settings className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="tablet:w-[540px] w-[400px] overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle>Edit User</SheetTitle>
                                <SheetDescription>
                                  Update {user.name}&apos;s information and
                                  settings.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="flex flex-col gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Name
                                  </label>
                                  <Input
                                    defaultValue={user.name}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Email
                                  </label>
                                  <Input
                                    defaultValue={user.email}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    IGN
                                  </label>
                                  <Input
                                    defaultValue={user.ign ?? ""}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Role
                                  </label>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="col-span-3 justify-start"
                                      >
                                        {user.role}
                                        <Icons.chevronDown className="ml-auto h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                      <DropdownMenuItem>Admin</DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Leader
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Member
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Seller
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label className="text-right text-sm font-medium">
                                    Status
                                  </label>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="col-span-3 justify-start"
                                      >
                                        {user.status}
                                        <Icons.chevronDown className="ml-auto h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full">
                                      <DropdownMenuItem>
                                        Active
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Inactive
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        Pending
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <SheetFooter className="flex flex-col gap-2">
                                <Button variant="outline" className="w-full">
                                  Cancel
                                </Button>
                                <Button className="w-full">Save Changes</Button>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>

                          {/* Delete User Sheet */}
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                              >
                                <Icons.close className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="tablet:w-[540px] w-[400px] overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle className="text-destructive">
                                  Delete User
                                </SheetTitle>
                                <SheetDescription>
                                  This action cannot be undone. This will
                                  permanently delete {user.name}&apos;s account.
                                </SheetDescription>
                              </SheetHeader>
                              <div className="flex flex-col gap-6 py-4">
                                <div className="bg-destructive/10 border-destructive/20 flex items-center gap-4 rounded-lg border p-4">
                                  <Icons.close className="text-destructive h-8 w-8 flex-shrink-0" />
                                  <div>
                                    <h4 className="text-destructive font-semibold">
                                      Warning
                                    </h4>
                                    <p className="text-muted-foreground text-sm">
                                      Deleting this user will remove all their
                                      data and cannot be recovered.
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                      User:
                                    </span>
                                    <span className="text-sm">{user.name}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                      Email:
                                    </span>
                                    <span className="truncate text-sm">
                                      {user.email}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm font-medium">
                                      Role:
                                    </span>
                                    <Badge
                                      variant={getRoleBadgeVariant(user.role)}
                                    >
                                      {user.role}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <SheetFooter className="flex flex-col gap-2">
                                <Button variant="outline" className="w-full">
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  className="w-full"
                                >
                                  Delete User
                                </Button>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Icons.users className="text-muted-foreground mb-4 h-12 w-12" />
                <h3 className="text-lg font-semibold">No users found</h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </>
  );
}
