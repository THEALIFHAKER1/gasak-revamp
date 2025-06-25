"use client";
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaDescription,
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/ui/credenza";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { Icons } from "@/components/icons";

// Static user data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: null,
    role: "Admin" as const,
    ign: "JohnD123",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    image: null,
    role: "Leader" as const,
    ign: "JaneS456",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    image: null,
    role: "Member" as const,
    ign: "MikeJ789",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    image: null,
    role: "Seller" as const,
    ign: "SarahW101",
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex.brown@example.com",
    image: null,
    role: "Member" as const,
    ign: null,
    createdAt: new Date("2024-05-12"),
  },
];

// Helper functions
const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "Admin":
      return "destructive";
    case "Leader":
      return "default";
    case "Member":
      return "secondary";
    case "Seller":
      return "outline";
    default:
      return "secondary";
  }
};

export default function UserTable() {
  const filteredUsers = mockUsers;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-muted-foreground bg-muted tablet:grid hidden grid-cols-5 gap-4 rounded-t-lg border-b px-4 py-2 text-sm font-semibold">
        <div>User</div>
        <div>Role</div>
        <div>IGN</div>
        <div>Joined</div>
        <div className="text-right">Actions</div>
      </div>
      {/* Rows */}
      <div className="divide-muted-foreground/10 divide-y">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-background tablet:mb-0 tablet:grid tablet:grid-cols-5 tablet:rounded-none tablet:shadow-none mb-4 flex flex-col gap-4 rounded-lg px-4 py-4 shadow-sm"
          >
            {/* User */}
            <div className="tablet:col-span-1 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
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
              <span className="tablet:hidden mt-2 block text-xs text-gray-500">
                User
              </span>
            </div>
            {/* Role */}
            <div className="tablet:col-span-1 flex items-center">
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role}
              </Badge>
              <span className="tablet:hidden ml-2 block text-xs text-gray-500">
                Role
              </span>
            </div>
            {/* IGN */}
            <div className="tablet:col-span-1 flex items-center">
              {user.ign ? (
                <span className="font-mono text-sm">{user.ign}</span>
              ) : (
                <span className="text-muted-foreground text-sm">-</span>
              )}
              <span className="tablet:hidden ml-2 block text-xs text-gray-500">
                IGN
              </span>
            </div>
            {/* Joined */}
            <div className="tablet:col-span-1 flex items-center">
              <span className="text-muted-foreground text-sm">
                {user.createdAt.toLocaleDateString()}
              </span>
              <span className="tablet:hidden ml-2 block text-xs text-gray-500">
                Joined
              </span>
            </div>
            {/* Actions */}
            <div className="tablet:col-span-1 tablet:mt-0 mt-2 flex justify-end gap-1">
              {/* View User Credenza */}
              <Credenza>
                <CredenzaTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icons.user className="h-4 w-4" />
                  </Button>
                </CredenzaTrigger>
                <CredenzaContent className="tablet:w-[540px] w-[400px]">
                  <CredenzaHeader>
                    <CredenzaTitle>User Profile</CredenzaTitle>
                    <CredenzaDescription>
                      View detailed information about {user.name}
                    </CredenzaDescription>
                  </CredenzaHeader>
                  <CredenzaBody>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 flex-shrink-0">
                          {user.image ? (
                            <Image
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
                          <span className="text-sm font-medium">Role:</span>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">IGN:</span>
                          <span className="truncate font-mono text-sm">
                            {user.ign ?? "-"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Joined:</span>
                          <span className="text-sm">
                            {user.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CredenzaBody>
                </CredenzaContent>
              </Credenza>
              {/* Edit User Credenza */}
              <Credenza>
                <CredenzaTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icons.settings className="h-4 w-4" />
                  </Button>
                </CredenzaTrigger>
                <CredenzaContent className="tablet:w-[540px] w-[400px]">
                  <CredenzaHeader>
                    <CredenzaTitle>Edit User</CredenzaTitle>
                    <CredenzaDescription>
                      Update {user.name}&apos;s information and settings.
                    </CredenzaDescription>
                  </CredenzaHeader>
                  <CredenzaBody>
                    <div className="flex flex-col gap-4">
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
                            <DropdownMenuItem>Leader</DropdownMenuItem>
                            <DropdownMenuItem>Member</DropdownMenuItem>
                            <DropdownMenuItem>Seller</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CredenzaBody>
                  <CredenzaFooter className="flex flex-col gap-2">
                    <CredenzaClose asChild>
                      <Button variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </CredenzaClose>
                    <Button className="w-full">Save Changes</Button>
                  </CredenzaFooter>
                </CredenzaContent>
              </Credenza>
              {/* Delete User Credenza */}
              <Credenza>
                <CredenzaTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Icons.close className="h-4 w-4" />
                  </Button>
                </CredenzaTrigger>
                <CredenzaContent className="tablet:w-[540px] w-[400px]">
                  <CredenzaHeader>
                    <CredenzaTitle className="text-destructive">
                      Delete User
                    </CredenzaTitle>
                    <CredenzaDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {user.name}&apos;s account.
                    </CredenzaDescription>
                  </CredenzaHeader>
                  <CredenzaBody>
                    <div className="flex flex-col gap-6">
                      <div className="bg-destructive/10 border-destructive/20 flex items-center gap-4 rounded-lg border p-4">
                        <Icons.close className="text-destructive h-8 w-8 flex-shrink-0" />
                        <div>
                          <h4 className="text-destructive font-semibold">
                            Warning
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            Deleting this user will remove all their data and
                            cannot be recovered.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">User:</span>
                          <span className="text-sm">{user.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Email:</span>
                          <span className="truncate text-sm">{user.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Role:</span>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CredenzaBody>
                  <CredenzaFooter className="flex flex-col gap-2">
                    <CredenzaClose asChild>
                      <Button variant="outline" className="w-full">
                        Cancel
                      </Button>
                    </CredenzaClose>
                    <Button variant="destructive" className="w-full">
                      Delete User
                    </Button>
                  </CredenzaFooter>
                </CredenzaContent>
              </Credenza>
            </div>
            <span className="tablet:hidden mt-2 block text-xs text-gray-500">
              Actions
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
