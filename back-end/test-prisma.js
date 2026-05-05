import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log("✅ Conexão bem sucedida!");
    
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Query teste:", result);
    
    await prisma.$disconnect();
    console.log("✅ Desconectado");
  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

test();