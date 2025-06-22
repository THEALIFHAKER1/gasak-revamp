CREATE TYPE "public"."role" AS ENUM('admin', 'leader', 'member', 'seller');--> statement-breakpoint
CREATE TABLE "gasak_session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gasak_squad_member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"squad_id" uuid NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gasak_squad" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"banner" text,
	"leader_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gasak_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'member' NOT NULL,
	"ign" text,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "gasak_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "gasak_session" ADD CONSTRAINT "gasak_session_userId_gasak_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gasak_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gasak_squad_member" ADD CONSTRAINT "gasak_squad_member_user_id_gasak_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gasak_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gasak_squad_member" ADD CONSTRAINT "gasak_squad_member_squad_id_gasak_squad_id_fk" FOREIGN KEY ("squad_id") REFERENCES "public"."gasak_squad"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gasak_squad" ADD CONSTRAINT "gasak_squad_leader_id_gasak_user_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."gasak_user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "squad_members_user_squad_idx" ON "gasak_squad_member" USING btree ("user_id","squad_id");--> statement-breakpoint
CREATE INDEX "squad_members_user_idx" ON "gasak_squad_member" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "squad_members_squad_idx" ON "gasak_squad_member" USING btree ("squad_id");--> statement-breakpoint
CREATE INDEX "squad_members_joined_at_idx" ON "gasak_squad_member" USING btree ("joined_at");--> statement-breakpoint
CREATE INDEX "squads_name_idx" ON "gasak_squad" USING btree ("name");--> statement-breakpoint
CREATE INDEX "squads_leader_idx" ON "gasak_squad" USING btree ("leader_id");--> statement-breakpoint
CREATE INDEX "squads_created_at_idx" ON "gasak_squad" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "gasak_user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "gasak_user" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_ign_idx" ON "gasak_user" USING btree ("ign");