import { z } from "zod";
import { createTRPCRouter, rateLimitedProcedure } from "@/server/api/trpc";
import axios from "axios";
import { env } from "process";

export const publicRouter = createTRPCRouter({
  sendPublicOtp: rateLimitedProcedure
    .input(z.object({ countryCode: z.string(), phone: z.string() }))
    .mutation(async ({ input }) => {
      const response = await axios.post("https://authkey.pro/api/wo/otp", {
        key: env.PUBLIC_AUTHKEY_API_KEY,
        countryCode: input.countryCode,
        phone: input.phone,
        fallback: false,
        appName: "Authkey",
      });
      const data = response.data as { status: boolean };
      return data.status;
    }),
  checkNumberPublic: rateLimitedProcedure
    .input(z.object({ countryCode: z.string(), phone: z.string() }))
    .mutation(async ({ input }) => {
      const response = await axios.post("https://authkey.pro/api/wo/check", {
        key: env.PUBLIC_AUTHKEY_API_KEY,
        countryCode: input.countryCode,
        phone: input.phone,
      });
      const data = response.data as { exists: boolean };
      return data.exists;
    }),
});
