import { prisma } from "@/server/db";

export const getAuthTokens = async () => {
  const tokens = await prisma.authTokens.findMany({
    where: {
      connected: true,
    },
  });
  if (!tokens.length) {
    throw new Error("No Tokens Available");
  }
  const randToken = tokens[Math.floor(Math.random() * (tokens.length - 1))]!;
  return {
    instanceId: randToken.instanceId,
    uid: randToken.uid,
  };
};
export const getCheckTokens = async () => {
  const tokens = await prisma.checkTokens.findMany({
    where: {
      connected: true,
    },
  });
  if (!tokens.length) {
    throw new Error("No Tokens Available");
  }
  const randToken = tokens[Math.floor(Math.random() * (tokens.length - 1))]!;
  return {
    instanceId: randToken.instanceId,
    uid: randToken.uid,
  };
};
