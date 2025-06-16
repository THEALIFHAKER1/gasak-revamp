CREATE TYPE "public"."role" AS ENUM('admin', 'leader', 'member');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('TODO', 'IN_PROGRESS', 'DONE');--> statement-breakpoint
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
	"joinedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gasak_squad" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"banner" text,
	"leader_id" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gasak_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'member' NOT NULL,
	"ign" text,
	"emailVerified" timestamp,
	"image" text,
	CONSTRAINT "gasak_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "gasak_verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "gasak_verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "gasak_session" ADD CONSTRAINT "gasak_session_userId_gasak_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gasak_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gasak_squad_member" ADD CONSTRAINT "gasak_squad_member_user_id_gasak_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gasak_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gasak_squad_member" ADD CONSTRAINT "gasak_squad_member_squad_id_gasak_squad_id_fk" FOREIGN KEY ("squad_id") REFERENCES "public"."gasak_squad"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "gasak_squad" ADD CONSTRAINT "gasak_squad_leader_id_gasak_user_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."gasak_user"("id") ON DELETE set null ON UPDATE no action;