import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { accountRouter } from "./routers/account";
import { keyRouter } from "./routers/key";
import { logRouter } from "./routers/log";
import { analyticsRouter } from "./routers/analytics";
import { pricingRouter } from "./routers/pricing";
import { stripeRouter } from "./routers/stripe";
import { publicRouter } from "./routers/public";
import { paddleRouter } from "./routers/paddle";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  account: accountRouter,
  key: keyRouter,
  log: logRouter,
  analytics: analyticsRouter,
  pricing: pricingRouter,
  stripe: stripeRouter,
  public: publicRouter,
  paddle: paddleRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
