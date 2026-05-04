import path           from "node:path";
import { defineConfig } from "prisma/config";
import "dotenv/config";

const rawUrl   = process.env.DATABASE_URL ?? "file:./dev.db";
const cleanUrl = rawUrl.trim().replace(/^["']|["']$/g, "");

export default defineConfig({
  earlyAccess: true,
  schema: path.join("prisma", "schema.prisma"),
  datasource: { url: cleanUrl },
});