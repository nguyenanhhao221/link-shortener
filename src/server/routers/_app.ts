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
                return response;
            } catch (e) {
                console.error(e);
            }
        }),
    findShortLinkExist: publicProcedure
        .input(z.object({ url: z.string().url() }))
        .query(async ({ input }) => {
            try {
                const response = await prisma.shortLink.findFirst({
                    where: {
                        url: { equals: input.url },
                    },
                });
                return response;
            } catch (e) {
                console.error(e);
            }
        }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
