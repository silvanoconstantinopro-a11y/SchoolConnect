import path from "node:path";
import { defineConfig } from "prisma/config";
import Database from "better-sqlite3";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Carrega variáveis de ambiente em desenvolvimento
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const dbPath = databaseUrl.replace(/^file:/, "");

export default defineConfig({
  earlyAccess: true,
  schema: path.join("prisma", "schema.prisma"),
  migrate: {
    adapter: () => {
      const sqlite = new Database(dbPath);
      return new PrismaBetterSqlite3(sqlite);
    },
  },
});
