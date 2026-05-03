import path from "node:path";
import { defineConfig } from "prisma/config";

// Carrega variáveis de ambiente
import "dotenv/config";

export default defineConfig({
  earlyAccess: true,
  schema: path.join("prisma", "schema.prisma"),
  migrate: {
    // O adapter só é instanciado durante "migrate deploy", nunca durante "generate"
    adapter: async () => {
      const { default: Database } = await import("better-sqlite3");
      const { PrismaBetterSqlite3 } = await import("@prisma/adapter-better-sqlite3");

      const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";
      const dbPath = databaseUrl.replace(/^file:/, "");

      const sqlite = new Database(dbPath);
      return new PrismaBetterSqlite3(sqlite);
    },
  },
});