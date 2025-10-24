import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "team_member" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"image_id" integer,
  	"image_landscape_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "team_member_id" integer;
  ALTER TABLE "team_member" ADD CONSTRAINT "team_member_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team_member" ADD CONSTRAINT "team_member_image_landscape_id_media_id_fk" FOREIGN KEY ("image_landscape_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "team_member_image_idx" ON "team_member" USING btree ("image_id");
  CREATE INDEX "team_member_image_landscape_idx" ON "team_member" USING btree ("image_landscape_id");
  CREATE INDEX "team_member_updated_at_idx" ON "team_member" USING btree ("updated_at");
  CREATE INDEX "team_member_created_at_idx" ON "team_member" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_member_fk" FOREIGN KEY ("team_member_id") REFERENCES "public"."team_member"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_team_member_id_idx" ON "payload_locked_documents_rels" USING btree ("team_member_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {


  await db.execute(sql`
   ALTER TABLE "team_member" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "team_member" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_team_member_fk";

  DROP INDEX "payload_locked_documents_rels_team_member_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "team_member_id";`)
}
