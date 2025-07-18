"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Pagination } from "@/components/ui/pagination";

// Static user data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin" as const,
    ign: "JohnD123",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Leader" as const,
    ign: "JaneS456",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "Member" as const,
    ign: "MikeJ789",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "Seller" as const,
    ign: "SarahW101",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    name: "Alex Brown",
    email: "alex.brown@example.com",
    role: "Member" as const,
    ign: null,
    createdAt: "2024-05-12",
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
      return "secondary";
    default:
      return "secondary";
  }
};

function UserInfo({
  user,
  className = "",
}: {
  user: (typeof mockUsers)[0];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <span className="tablet:text-base text-sm font-medium">{user.name}</span>
      <span className="text-muted-foreground text-xs">{user.email}</span>
    </div>
  );
}

function UserActions() {
  return (
    <>
      <Button variant="ghost" size="sm" aria-label="View User">
        <Icons.user className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Edit User">
        <Icons.settings className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        aria-label="Delete User"
        className="text-destructive hover:text-destructive"
      >
        <Icons.close className="h-4 w-4" />
      </Button>
    </>
  );
}

export default function UserTable() {
  return (
    <div className="space-y-2">
      {/* Mobile Card List */}
      <div className="tablet:hidden flex flex-col gap-2">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="bg-background flex flex-col gap-2 rounded-lg border p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <UserInfo user={user} className="!text-base" />
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs">
              <div>
                <span className="font-semibold">IGN: </span>
                {user.ign ? (
                  <span className="font-mono">{user.ign}</span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </div>
              <div>
                <span className="font-semibold">Joined: </span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="mt-2 flex justify-end gap-1">
              <UserActions />
            </div>
          </div>
        ))}
      </div>

      {/* Tablet & Desktop Table */}
      <div className="bg-background tablet:block hidden rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>IGN</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <UserInfo user={user} />
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.ign ? (
                    <span className="font-mono text-xs">{user.ign}</span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-muted-foreground text-xs">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <UserActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination />
    </div>
  );
}
