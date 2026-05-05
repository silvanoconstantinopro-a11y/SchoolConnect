import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validação e sanitização da URL do banco de dados
function validateAndCleanDatabaseUrl(url) {
  if (!url) {
    console.warn("⚠️  DATABASE_URL não definida, usando valor padrão: file:./dev.db");
    return "file:./dev.db";
  }
  
  // Remove aspas e espaços extras
  let cleanUrl = url.trim().replace(/^["']|["']$/g, "");
  
  // Valida formato básico
  if (!cleanUrl.startsWith("postgresql://") && 
      !cleanUrl.startsWith("mysql://") && 
      !cleanUrl.startsWith("sqlite:") &&
      !cleanUrl.startsWith("file:")) {
    console.error(`❌ DATABASE_URL com formato inválido: ${cleanUrl.substring(0, 50)}...`);
    throw new Error(`Formato inválido de DATABASE_URL. Deve começar com postgresql://, mysql://, sqlite: ou file:`);
  }
  
  return cleanUrl;
}

// Configurações de ambiente
const environment = process.env.NODE_ENV || "development";
const isProduction = environment === "production";
const isDevelopment = environment === "development";
const isTest = environment === "test";

// Configurações específicas por ambiente
const envConfig = {
  development: {
    logQueries: true,
    logLevel: ["query", "info", "warn", "error"],
    poolSize: 5,
    timeout: 30000
  },
  production: {
    logQueries: false,
    logLevel: ["warn", "error"],
    poolSize: 10,
    timeout: 60000
  },
  test: {
    logQueries: false,
    logLevel: ["error"],
    poolSize: 1,
    timeout: 10000
  }
};

const currentConfig = envConfig[environment];

// Sanitizar URL
const rawUrl = process.env.DATABASE_URL;
const cleanUrl = validateAndCleanDatabaseUrl(rawUrl);

// Configurações de logging
const logConfig = currentConfig.logQueries 
  ? ["query", "info", "warn", "error"]
  : currentConfig.logLevel;

// Configuração do pool de conexões (apenas para PostgreSQL/MySQL)
const connectionPoolConfig = {};
if (cleanUrl.startsWith("postgresql://") || cleanUrl.startsWith("mysql://")) {
  connectionPoolConfig.pool = {
    min: 0,
    max: currentConfig.poolSize,
    idle: 30000,
    acquire: currentConfig.timeout
  };
}

// Configuração principal
const prismaConfig = defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, "..", "prisma", "schema.prisma"),
  
  // Configuração do datasource
  datasource: {
    url: cleanUrl,
    ...connectionPoolConfig
  },
  
  // Configurações de geração
  generator: {
    provider: "prisma-client-js",
    output: path.join(__dirname, "..", "node_modules", ".prisma", "client"),
    previewFeatures: ["tracing", "metrics", "fullTextSearch", "fullTextIndex"],
    binaryTargets: ["native", "debian-openssl-1.1.x", "debian-openssl-3.0.x"]
  },
  
  // Configurações de logging
  log: logConfig,
  
  // Configurações de debug
  debug: isDevelopment,
  
  // Timeout para operações
  queryTimeout: currentConfig.timeout,
  
  // Cache de consultas (em desenvolvimento)
  queryCache: isDevelopment ? undefined : {
    enabled: true,
    ttl: 5000
  }
});

// Validações adicionais para produção
if (isProduction) {
  if (cleanUrl.includes("localhost") || cleanUrl.includes("127.0.0.1")) {
    console.warn("⚠️  ATENÇÃO: DATABASE_URL aponta para localhost em produção!");
  }
  
  if (cleanUrl.includes("dev.db") || cleanUrl.includes("sqlite")) {
    console.warn("⚠️  ATENÇÃO: Usando SQLite em produção - não recomendado para alta escala!");
  }
}

// Log da configuração em desenvolvimento
if (isDevelopment) {
  console.log("📊 Configuração do Prisma:", {
    environment,
    databaseType: cleanUrl.split(":")[0],
    logLevel: logConfig,
    schemaPath: prismaConfig.schema,
    datasource: {
      url: cleanUrl.replace(/\/\/.*@/, "//***:***@") // Oculta credenciais
    }
  });
}

// Exportar configuração
export default prismaConfig;

// Utilitários adicionais para uso em runtime
export const prismaUtils = {
  isPostgres: () => cleanUrl.startsWith("postgresql://"),
  isMySQL: () => cleanUrl.startsWith("mysql://"),
  isSQLite: () => cleanUrl.startsWith("sqlite:") || cleanUrl.startsWith("file:"),
  getEnvironment: () => environment,
  getConnectionPoolSize: () => currentConfig.poolSize,
  validateConnection: async (prisma) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: "connected", environment };
    } catch (error) {
      return { status: "disconnected", error: error.message, environment };
    }
  }
};