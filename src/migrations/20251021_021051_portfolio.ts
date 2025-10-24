import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_portfolios_project_type" AS ENUM('Portfolio', 'Case Study');
  CREATE TYPE "public"."enum_portfolios_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolios_v_version_project_type" AS ENUM('Portfolio', 'Case Study');
  CREATE TYPE "public"."enum__portfolios_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "portfolios_scope" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"service_id" integer
  );

  CREATE TABLE "portfolios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"short_description" varchar,
  	"client" varchar DEFAULT 'Client Name',
  	"sector" varchar DEFAULT 'Personal Brand',
  	"project_type" "enum_portfolios_project_type" DEFAULT 'Portfolio',
  	"cover_image_id" integer,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_portfolios_status" DEFAULT 'draft'
  );

  CREATE TABLE "_portfolios_v_version_scope" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"service_id" integer,
  	"_uuid" varchar
  );

  CREATE TABLE "_portfolios_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_short_description" varchar,
  	"version_client" varchar DEFAULT 'Client Name',
  	"version_sector" varchar DEFAULT 'Personal Brand',
  	"version_project_type" "enum__portfolios_v_version_project_type" DEFAULT 'Portfolio',
  	"version_cover_image_id" integer,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__portfolios_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "portfolios_id" integer;
  ALTER TABLE "portfolios_scope" ADD CONSTRAINT "portfolios_scope_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios_scope" ADD CONSTRAINT "portfolios_scope_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_scope" ADD CONSTRAINT "_portfolios_v_version_scope_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_scope" ADD CONSTRAINT "_portfolios_v_version_scope_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_parent_id_portfolios_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "portfolios_scope_order_idx" ON "portfolios_scope" USING btree ("_order");
  CREATE INDEX "portfolios_scope_parent_id_idx" ON "portfolios_scope" USING btree ("_parent_id");
  CREATE INDEX "portfolios_scope_service_idx" ON "portfolios_scope" USING btree ("service_id");
  CREATE INDEX "portfolios_cover_image_idx" ON "portfolios" USING btree ("cover_image_id");
  CREATE INDEX "portfolios_slug_idx" ON "portfolios" USING btree ("slug");
  CREATE INDEX "portfolios_updated_at_idx" ON "portfolios" USING btree ("updated_at");
  CREATE INDEX "portfolios_created_at_idx" ON "portfolios" USING btree ("created_at");
  CREATE INDEX "portfolios__status_idx" ON "portfolios" USING btree ("_status");
  CREATE INDEX "_portfolios_v_version_scope_order_idx" ON "_portfolios_v_version_scope" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_scope_parent_id_idx" ON "_portfolios_v_version_scope" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_version_scope_service_idx" ON "_portfolios_v_version_scope" USING btree ("service_id");
  CREATE INDEX "_portfolios_v_parent_idx" ON "_portfolios_v" USING btree ("parent_id");
  CREATE INDEX "_portfolios_v_version_version_cover_image_idx" ON "_portfolios_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_portfolios_v_version_version_slug_idx" ON "_portfolios_v" USING btree ("version_slug");
  CREATE INDEX "_portfolios_v_version_version_updated_at_idx" ON "_portfolios_v" USING btree ("version_updated_at");
  CREATE INDEX "_portfolios_v_version_version_created_at_idx" ON "_portfolios_v" USING btree ("version_created_at");
  CREATE INDEX "_portfolios_v_version_version__status_idx" ON "_portfolios_v" USING btree ("version__status");
  CREATE INDEX "_portfolios_v_created_at_idx" ON "_portfolios_v" USING btree ("created_at");
  CREATE INDEX "_portfolios_v_updated_at_idx" ON "_portfolios_v" USING btree ("updated_at");
  CREATE INDEX "_portfolios_v_latest_idx" ON "_portfolios_v" USING btree ("latest");
  CREATE INDEX "_portfolios_v_autosave_idx" ON "_portfolios_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_portfolios_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolios_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "portfolios_scope" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "portfolios" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolios_v_version_scope" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_portfolios_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "portfolios_scope" CASCADE;
  DROP TABLE "portfolios" CASCADE;
  DROP TABLE "_portfolios_v_version_scope" CASCADE;
  DROP TABLE "_portfolios_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_portfolios_fk";

  DROP INDEX "payload_locked_documents_rels_portfolios_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "portfolios_id";
  DROP TYPE "public"."enum_portfolios_project_type";
  DROP TYPE "public"."enum_portfolios_status";
  DROP TYPE "public"."enum__portfolios_v_version_project_type";
  DROP TYPE "public"."enum__portfolios_v_version_status";`)

}
