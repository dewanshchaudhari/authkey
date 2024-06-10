import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { countries } from "@/lib/countries";

export const pricingRouter = createTRPCRouter({
  getPricing: publicProcedure.query(async ({ ctx }) => {
    const allPrices = await ctx.prisma.price.findMany({});
    const countriesCodes = Object.keys(countries);
    const prices: {
      code: string;
      woo: number;
      wmo: number;
      wmt: number;
      wmm: number;
      wmc: number;
      sms: number;
    }[] = [];
    for (const countriesCode of countriesCodes) {
      prices.push({
        code: countriesCode,
        woo:
          allPrices.find(
            ({ code, method, type }) =>
              code === Number(countriesCode) &&
              method === "WO" &&
              type === "OTP"
          )?.price ?? -1,
        wmo:
          allPrices.find(
            ({ code, method, type }) =>
              code === Number(countriesCode) &&
              method === "WM" &&
              type === "OTP"
          )?.price ?? -1,
        wmt:
          allPrices.find(
            ({ code, method, type }) =>
              code === Number(countriesCode) &&
              method === "WM" &&
              type === "TEXT"
          )?.price ?? -1,
        wmm:
          allPrices.find(
            ({ code, method, type }) =>
              code === Number(countriesCode) &&
              method === "WM" &&
              type === "MEDIA"
          )?.price ?? -1,
        wmc:
          allPrices.find(
            ({ code, method, type }) =>
              code === Number(countriesCode) &&
              method === "WM" &&
              type === "CHECK"
          )?.price ?? -1,
        sms:
          allPrices.find(
            ({ code, method, type }) =>
              code === Number(countriesCode) &&
              method === "SMS" &&
              type === "OTP"
          )?.price ?? -1,
      });
    }
    return prices;
  }),
});
