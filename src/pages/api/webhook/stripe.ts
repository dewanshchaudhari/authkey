import { env } from "@/env.mjs";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/server/db";
import { buffer } from "micro";
import { type NextApiRequest, type NextApiResponse } from "next";
import type Stripe from "stripe";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"]!;
  const event = await stripe.webhooks.constructEventAsync(
    buf.toString(),
    sig,
    env.STRIPE_WEBHOOK_SECRET
  );
  // Successfully constructed event.
  console.log("✅ Success:", event.type);
  if (event.type === "checkout.session.completed") {
    const stripeObject: Stripe.Checkout.Session = event.data
      .object as Stripe.Checkout.Session;
    if (stripeObject.status === "complete" && stripeObject.mode === "payment") {
      const email = stripeObject.customer_details?.email;
      if (!email) return res.status(404).end("Email Not Found");
      const amount = stripeObject.amount_total;
      if (!amount) return res.status(404).end("Amount Not Found");
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) return res.status(404).end("User Not Found");
      const finalAmount = Math.floor(amount * 0.25 + Number(user.credits));
      console.log(finalAmount, amount);
      const newUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          credits: finalAmount,
        },
      });
      console.log(newUser);
    }
  }
  if (event.type === "invoice.paid") {
    const stripeObject: Stripe.Invoice = event.data.object as Stripe.Invoice;
    console.log(stripeObject);
    if (stripeObject.status === "paid") {
      const email = stripeObject.customer_email;
      if (!email) return res.status(404).end("Email Not Found");
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) return res.status(404).end("User Not Found");
      const userTokens = await prisma.userTokens.create({
        data: {
          instanceId: null,
          subscription:
            typeof stripeObject.subscription === "string"
              ? stripeObject.subscription
              : "",
          connected: false,
          userId: user.id,
        },
      });
      console.log(userTokens);
    }
  }
  if (event.type === "invoice.payment_failed") {
    const stripeObject: Stripe.Invoice = event.data.object as Stripe.Invoice;
    console.log(stripeObject);
    const email = stripeObject.customer_email;
    if (!email) return res.status(404).end("Email Not Found");
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).end("User Not Found");
    const subscription = stripeObject.subscription;
    if (typeof subscription !== "string")
      return res.status(404).end("User Not Found");
    await prisma.userTokens.delete({
      where: {
        subscription: subscription,
      },
    });
  }
  res.json({ message: "hello" });
  return res.end();
}
