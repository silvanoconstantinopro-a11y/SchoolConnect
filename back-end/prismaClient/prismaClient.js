import { PrismaClient } from "@prisma/client";

// Criar instância única
const prisma = new PrismaClient({
  log: ["error", "warn"],
});

// Função de conexão
async function connect() {
  try {
    await prisma.$connect();
    console.log("✅ Banco de dados conectado");
  } catch (error) {
    console.error("❌ Erro ao conectar:", error.message);
    process.exit(1);
  }
}

// Função de desconexão
async function disconnect() {
  await prisma.$disconnect();
  console.log("✅ Banco desconectado");
}

// Tratamento de sinais
process.on("SIGINT", async () => {
  await disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await disconnect();
  process.exit(0);
});

// Conectar
connect();

export { prisma, disconnect };