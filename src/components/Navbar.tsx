import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { PlusCircle, Wallet } from "lucide-react";
import { api } from "@/utils/api";
import React from "react";
import { useRouter } from "next/router";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { env } from "@/env.mjs";

export default function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { data: session } = useSession();
  const router = useRouter();
  const [paddle, setPaddle] = React.useState<Paddle>();
  const { data, isLoading, isError } = api.user.getUserById.useQuery();
  const { mutate, isLoading: isCheckoutLoading } =
    api.stripe.createCheckout.useMutation({
      onSuccess: (data) => {
        if (typeof data === "string") void router.push(data);
      },
    });
  React.useEffect(() => {
    void initializePaddle({
      environment: "sandbox",
      token: env.NEXT_PUBLIC_PADDLE_API_KEY,
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);
  const openCheckout = () => {
    if (data?.stripeCustomerId) {
      paddle?.Checkout.open({
        items: [
          { priceId: env.NEXT_PUBLIC_PADDLE_PRODUCT_PRICE_ID, quantity: 1 },
        ],
        settings: {
          successUrl: "http://localhost:3000/dashboard/billing/success",
        },
        customer: {
          id: data.stripeCustomerId,
        },
      });
    }
  };
  if (!session) {
    return null;
  }
  return (
    <nav
      className={cn(
        "flex h-16 flex-row items-center justify-between space-x-4 border-b",
        className
      )}
      {...props}
    >
      <div className="flex w-9/12 flex-row items-center justify-start space-x-4">
        <Link href={"/"}>
          <h1 className="flex flex-row items-baseline text-2xl font-bold">
            <span className="tracking-tight hover:cursor-pointer dark:text-white">
              <span className="text-red-600">Auth</span>
              <span className="ml-1 font-semibold">key</span>
            </span>
          </h1>
        </Link>
        <Separator orientation="vertical" className="h-10" />
        <Button asChild variant="ghost">
          <Link href="https://docs.authkey.pro/">Docs ↗</Link>
        </Button>
        <Link href="/">{/* <h1>Hi, {session.user.waName} 👋</h1> */}</Link>
      </div>
      <div className="flex w-3/12 flex-row items-center justify-between">
        {!isError && (
          <>
            <div className="flex flex-row items-center">
              {data?.credits.toString()} <Wallet className="ml-2 h-4 w-4" />
            </div>
            {/* <form action="/api/stripe/checkout_sessions" method="POST">
              <input
                type="hidden"
                id="custId"
                name="custId"
                value={data?.stripeCustomerId ?? ""}
              />
              <Button asChild variant="ghost" type="submit" role="link">
                <Link href="https://docs.wotcrm.com" target="_blank">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Credits
                </Link>
              </Button>
            </form> */}

            <Button
              variant="ghost"
              onClick={() => openCheckout()}
              // disabled={isCheckoutLoading}
            >
              {/* <Link href="https://docs.wotcrm.com" target="_blank"> */}
              <PlusCircle
                className={`mr-2 h-4 w-4 ${
                  isCheckoutLoading ? "animate-spin" : ""
                }`}
              />
              Add Credits <br /> ($1 = 400)
              {/* </Link> */}
            </Button>
          </>
        )}
        <Separator orientation="vertical" className="h-10" />
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
          asChild
        >
          <Link href="/profile">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user.image ?? ""} alt="@shadcn" />
              <AvatarFallback>{""}</AvatarFallback>
            </Avatar>
          </Link>
        </Button>
        {/* <LogOut className="mr-2 h-4 w-4" onClick={() => void signOut()} /> */}
      </div>
    </nav>
  );
}
