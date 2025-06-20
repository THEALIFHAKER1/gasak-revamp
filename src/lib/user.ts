import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return result[0] ?? null;
};

export const getUserById = async (id: string) => {
  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result[0] ?? null;
};
