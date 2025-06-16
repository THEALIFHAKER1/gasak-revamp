import {
  pgTableCreator,
  text,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `gasak_${name}`);

export const roleEnum = pgEnum("role", ["admin", "leader", "member"]);
export const statusEnum = pgEnum("status", ["TODO", "IN_PROGRESS", "DONE"]);

export const users = createTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default("member"),
  ign: text("ign"), // In-game name
  image: text("image"), // User profile picture
});

export const sessions = createTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// Squad Management tables
export const squads = createTable("squad", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  image: text("image"), // Squad profile picture
  banner: text("banner"), // Squad banner image
  leaderId: uuid("leader_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const squadMembers = createTable("squad_member", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  squadId: uuid("squad_id")
    .notNull()
    .references(() => squads.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joinedAt", { mode: "date" }).defaultNow().notNull(),
});
