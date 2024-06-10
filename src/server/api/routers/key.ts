import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { generateApiKey } from "@/utils";

export const keyRouter = createTRPCRouter({
  rollApiKey: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        key: generateApiKey(),
      },
    });
  }),
});
