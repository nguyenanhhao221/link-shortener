import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../../db/client';
export const appRouter = router({
    createShortLink: publicProcedure
        .input(z.object({ url: z.string().url(), slug: z.string() }))
        .mutation(async ({ input }) => {
            try {
                const response = await prisma.shortLink.create({
                    data: { url: input.url, slug: input.slug },
                });
                console.log('🚀 ~ .mutation ~ response', response);
                return response;
            } catch (e) {
                console.error(e);
            }
        }),
    getShotLinks: publicProcedure.query(async () => {
        try {
            return await prisma.shortLink.findMany();
        } catch (e) {
            console.error(e);
        }
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
