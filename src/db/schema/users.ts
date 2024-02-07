import { InferModel, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  external_id: text("external_id").notNull().unique(),
  first_name: text("first_name").default(""),
  last_name: text("lat_name").default(""),
  email: text("email").default(""),
  photo_url: text("photo_url").default(""),

  attributes: text("attributes", { mode: "json" }).default("{}"),

  createdAt: text("created_at").default(sql`CURRENT_TIME`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIME`),
});

export type Users = InferModel<typeof users>;
