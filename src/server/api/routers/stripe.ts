import {
  cancelSubscription,
  createCheckout,
  createStripeCustomer,
  createSubscriptionCheckout,
} from "@/lib/stripe";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const stripeRouter = createTRPCRouter({
  createStripeCustomer: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user)
      return new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not found.",
      });
    if (!user.email)
      return new TRPCError({
        code: "UNAUTHORIZED",
        message: "Email not found.",
      });
    if (user.stripeCustomerId) return user;
    const customerId = await createStripeCustomer(user.email);
    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        stripeCustomerId: customerId,
      },
    });
  }),
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user?.stripeCustomerId)
      return new TRPCError({
        code: "UNAUTHORIZED",
        message: "Stipe customer id not generated.",
      });
    return createCheckout(user.stripeCustomerId);
  }),
  createSubscriptionCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user?.stripeCustomerId)
      return new TRPCError({
        code: "UNAUTHORIZED",
        message: "Stipe customer id not generated.",
      });
    return createSubscriptionCheckout(user.stripeCustomerId);
  }),
  cancelSubscription: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { status } = await cancelSubscription(input.id);
      if (status !== "canceled") {
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed To Cancel Stripe Subscription.",
        });
      }
      return ctx.prisma.userTokens.delete({
        where: {
          subscription: input.id,
        },
      });
    }),
});
