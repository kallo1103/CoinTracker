import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Tạo global variable để lưu Prisma client
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalForPrisma = global as unknown as { prisma: any };

// Sử dụng singleton pattern để tránh tạo nhiều instances trong development
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  }).$extends(withAccelerate());

// Trong development, lưu prisma client vào global để tránh hot-reload tạo nhiều connections
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

