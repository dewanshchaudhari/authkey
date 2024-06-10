import { PrismaClient } from "@prisma/client";
import { COUNTRIES } from "./countries";
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});
void (async () => {
  for (const country of COUNTRIES) {
    // wotmaster
    await prisma.price.create({
      data: {
        code: country.code,
        method: "WM",
        type: "OTP",
        price: 1,
      },
    });
    await prisma.price.create({
      data: {
        code: country.code,
        method: "WM",
        type: "CHECK",
        price: 1,
      },
    });
  }
  console.log("Added Prices in the db.");
})();
