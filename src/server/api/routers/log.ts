import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const logRouter = createTRPCRouter({
  getLogs: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.prisma.request.findMany({
        take: (input.limit ?? 50) + 1,
        where: {
          userId: ctx.session.user.id,
        },
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > (input.limit ?? 50)) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
