import path from "node:path";
import { defineConfig } from "prisma/config";
import "dotenv/config";

// Remove aspas e espaços caso o valor venha mal formatado
const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const databaseUrl = rawUrl.trim().replace(/^["']|["']$/g, "");

export default defineConfig({
  earlyAccess: true,
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: databaseUrl,
  },
});
