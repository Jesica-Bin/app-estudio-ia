require('dotenv').config();
const prisma = require('./src/config/db');

async function main() {
  console.log("Iniciando prueba de conexión con Prisma...");
  try {
    await prisma.$connect();
    console.log("✅ Conexión a MySQL establecida correctamente.");
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    console.error("\nRecuerda verificar que tu archivo .env tenga el formato correcto:");
    console.error('DATABASE_URL="mysql://[USUARIO]:[CONTRASEÑA]@[HOST]:[PUERTO]/[NOMBRE_DB]"');
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
