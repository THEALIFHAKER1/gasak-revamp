import {
  pgTableCreator,
  text,
  timestamp,
  uuid,
  pgEnum,
  index,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `gasak_${name}`);

export const userRoleEnum = pgEnum("role", [
  "admin",
  "leader",
  "member",
  "seller",
]);

export type UserRoleEnum = (typeof userRoleEnum.enumValues)[number];

export const users = createTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull().default("member"),
    ign: text("ign"),
    image: text("image"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
    roleIdx: index("users_role_idx").on(table.role),
    ignIdx: index("users_ign_idx").on(table.ign),
  }),
);

export const sessions = createTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const squads = createTable(
  "squad",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    image: text("image"),
    banner: text("banner"),
    leaderId: uuid("leader_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    nameIdx: index("squads_name_idx").on(table.name),
    leaderIdx: index("squads_leader_idx").on(table.leaderId),
    createdAtIdx: index("squads_created_at_idx").on(table.createdAt),
  }),
);

export const squadMembers = createTable(
  "squad_member",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    squadId: uuid("squad_id")
      .notNull()
      .references(() => squads.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => ({
    // Unique constraint to prevent duplicate memberships
    userSquadIdx: uniqueIndex("squad_members_user_squad_idx").on(
      table.userId,
      table.squadId,
    ),
    // Individual indexes for queries
    userIdx: index("squad_members_user_idx").on(table.userId),
    squadIdx: index("squad_members_squad_idx").on(table.squadId),
    joinedAtIdx: index("squad_members_joined_at_idx").on(table.joinedAt),
  }),
);
