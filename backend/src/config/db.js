const { PrismaClient } = require('@prisma/client');

// Prevención de instanciación múltiple en modo desarrollo (HMR)
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

module.exports = prisma;
