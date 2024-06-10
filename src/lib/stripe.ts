import { env } from "@/env.mjs";
import Stripe from "stripe";
export const stripe = new Stripe(env.STRIPE_SECRET, {
  apiVersion: "2023-08-16",
});
export const createStripeCustomer = async (email: string) => {
  const customer = await stripe.customers.create({
    email,
  });
  return customer.id;
};

export const createCheckout = async (customerId: string) => {
  console.log("customerId", customerId);
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: "price_1NxngOSEjEFdFQHrAwlCtspr",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://authkey.pro/dashboard/billing/success`,
    cancel_url: `https://authkey.pro/dashboard/billing/failed`,
  });
  console.log(session);
  return session.url;
};
export const createSubscriptionCheckout = async (customerId: string) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: "price_1NtsPdSEjEFdFQHrmLuTKml6",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `https://authkey.pro/dashboard/billing/success`,
    cancel_url: `https://authkey.pro/dashboard/billing/failed`,
  });
  console.log(session.url);
  return session.url;
};
export const cancelSubscription = async (subscriptionId: string) => {
  const cancel = await stripe.subscriptions.cancel(subscriptionId);
  return cancel;
};
