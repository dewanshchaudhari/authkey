import { createPaddleCustomer } from "@/lib/paddle";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const paddleRouter = createTRPCRouter({
    createPaddleCustomer: protectedProcedure.mutation(async ({ ctx }) => {
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
        const customerId = await createPaddleCustomer(user.email);
        return ctx.prisma.user.update({
            where: {
                id: ctx.session.user.id,
            },
            data: {
                stripeCustomerId: customerId,
            },
        });
    }),
});
