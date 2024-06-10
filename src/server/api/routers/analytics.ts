import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const analyticsRouter = createTRPCRouter({
  getRequestCount: protectedProcedure.query(({ ctx }) => {
    return prisma.request.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        result: true,
        time: true,
        method: true,
      },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
