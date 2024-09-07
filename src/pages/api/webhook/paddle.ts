import { type NextApiRequest, type NextApiResponse } from "next";
import { Paddle, EventName } from '@paddle/paddle-node-sdk'
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";
const paddle = new Paddle(env.PADDLE_API_KEY)
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).end("Method Not Allowed");
    }
    const signature = (req.headers['paddle-signature'] as string) || '';
    const eventData = paddle.webhooks.unmarshal(JSON.stringify(req.body), env.PADDLE_WEBHOOK_SECRET, signature);
    if (!eventData)
        return res.json(
            {
                message: "Invalid webhook signature!",
            },
        );
    switch (eventData.eventType) {
        case EventName.TransactionPaid:
            const { customerId, details } = eventData.data;
            const amount = details?.totals?.grandTotal;
            if (!amount) return res.status(404).end("User Not Found");
            const user = await prisma.user.findFirst({
                where: {
                    stripeCustomerId: customerId,

                },
            });
            if (!user) return res.status(404).end("User Not Found");
            const finalAmount = Math.floor(Number(amount) * 4 + Number(user.credits));
            await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    credits: finalAmount,
                },
            });
            break;
        default:
            console.log(eventData.eventType);
    }
    return res.json(
        {
            message: "done",
        },
    );
}
