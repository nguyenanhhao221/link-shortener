import { PrismaClient } from '@prisma/client';
//www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({ log: ['query'] });
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
