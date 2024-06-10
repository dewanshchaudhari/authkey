import { calculateCharge, deduct } from "@/lib/charge";
import { type responseType, send } from "@/lib/wotomate/text";
import { getAuthTokens } from "@/lib/tokens";
import { prisma } from "@/server/db";
import { generateOtp } from "@/utils";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import { env } from "@/env.mjs";
const schema = z.object({
  key: z.string().min(1, {
    message: "Api key should not be empty.",
  }),
  countryCode: z.string().min(1, {
    message: "Country Code not found.",
  }),
  appName: z.string().max(14).nullish(),
  phone: z.string().min(1),
  fallback: z.boolean(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).send(`Method ${req.method ?? ""} Not Allowed`);
      return res.end();
    }
    const { key, countryCode, phone, fallback, appName } = schema.parse(
      req.body
    );
    const user = await prisma.user.findUnique({
      where: {
        key,
      },
    });

    if (!user) {
      res.status(400).send({
        message: "Invalid Key.",
      });
      return res.end();
    }
    const charge = await calculateCharge(countryCode, "WO", "OTP");
    if (user.credits < charge) {
      res.status(400).send({
        message: "Insufficient Balance",
      });
      return res.end();
    }
    const otp = generateOtp();
    if (!otp) {
      res.status(400).send({
        message: "Failed to generate otp",
      });
      return res.end();
    }
    const message = `${otp} is the one time code for logging into the ${
      appName ?? ""
    } app`;
    const { instanceId, uid } = await getAuthTokens();
    const fullPhone = countryCode.replaceAll("+", "") + phone;
    const response = await send(fullPhone, message, uid, instanceId);
    const status = response.data as responseType;
    if (status.success === false) {
      const request = await prisma.request.create({
        data: {
          countryCode,
          number: phone,
          method: "WM",
          time: new Date(),
          amount: charge,
          result: "FAILED",
          reason: status.msg,
          userId: user.id,
          type: "OTP",
        },
      });
      res.status(400).send({
        message: status.msg,
        status: status.success,
      });
      return res.end();
    }
    if (status.success === true) {
      await deduct(user.id, charge);
      const request = await prisma.request.create({
        data: {
          countryCode,
          number: phone,
          method: "WM",
          time: new Date(),
          amount: charge,
          result: "SUCCESS",
          reason: "success",
          userId: user.id,
          type: "OTP",
          message,
          fallback,
        },
      });
      res.status(200).json({
        id: request.id,
        status: status.success,
        phone,
        countryCode,
        otp,
        message,
        timestamp: request.time,
      });
    }
    return res.end();
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      res.status(400).send({
        message: error.errors.map(
          (error) => `${error.path.join(", ")} ${error.message}`
        ),
      });
      return res.end();
    }
    res.status(400).send({
      message: `Internal Server Error Please try again later.`,
    });
    return res.end();
  }
}
export default handler;
