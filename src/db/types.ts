import type { users, squads, squadMembers } from "./schema";

// Base select types - for basic queries
export type User = typeof users.$inferSelect;
export type Squad = typeof squads.$inferSelect;
export type SquadMember = typeof squadMembers.$inferSelect;

// Insert types - for creating new records (auto-generated fields optional)
export type UserInsert = typeof users.$inferInsert;
export type SquadInsert = typeof squads.$inferInsert;
export type SquadMemberInsert = typeof squadMembers.$inferInsert;

// Update types - for partial updates (all fields optional)
export type UserUpdate = Partial<UserInsert>;
export type SquadUpdate = Partial<SquadInsert>;
export type SquadMemberUpdate = Partial<SquadMemberInsert>;

// Relation types - for joined data queries
export type UserWithSquads = User & {
  squads: (SquadMember & { squad: Squad })[];
};

export type SquadWithMembers = Squad & {
  members: (SquadMember & { user: User })[];
  leader?: User | null;
};

export type SquadWithLeader = Squad & {
  leader: User | null;
};
