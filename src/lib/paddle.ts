import { env } from "@/env.mjs";
import { Paddle, Environment, LogLevel } from "@paddle/paddle-node-sdk";
const paddle = new Paddle(env.PADDLE_API_KEY, { environment: Environment.sandbox, logLevel: LogLevel.verbose })
export const createPaddleCustomer = async (email: string) => {
    const existingCustomers = await paddle.customers.list({ email: [email] }).next()
    if (existingCustomers.length !== 0 && existingCustomers[0]?.id) return existingCustomers[0].id;
    const customer = await paddle.customers.create({
        email
    })
    return customer.id;
};
