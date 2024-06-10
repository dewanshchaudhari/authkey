import { prisma } from "@/server/db";
import { type Type, type Method } from "@prisma/client";

export const calculateCharge = async (
  countryCode: string,
  method: Method,
  type: Type
) => {
  const price = await prisma.price.findFirst({
    where: {
      code: Number(countryCode),
      method,
      type,
    },
  });
  if (!price) throw new Error("Country Code Not Matched.");
  return price.price;
};
export const deduct = async (userId: string, charge: number) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      credits: {
        decrement: charge,
      },
    },
  });
};
