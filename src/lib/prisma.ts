import { PrismaClient } from '@prisma/client';

// Tạo global variable để lưu Prisma client
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Sử dụng singleton pattern để tránh tạo nhiều instances trong development
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Trong development, lưu prisma client vào global để tránh hot-reload tạo nhiều connections
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

