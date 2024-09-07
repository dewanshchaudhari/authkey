import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import { Loader2, LogOut, PlusCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Profile() {
  const { data, isLoading, isError } = api.user.getUserById.useQuery();
  const [paddle, setPaddle] = React.useState<Paddle>();
  const [isCheckoutLoading, setIsCheckoutLoading] = React.useState(false);
  const [hide, setHide] = React.useState(true);
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
    setIsCheckoutLoading(true);
    if (data?.stripeCustomerId) {
      paddle?.Checkout.open({
        items: [
          { priceId: env.NEXT_PUBLIC_PADDLE_PRODUCT_PRICE_ID, quantity: 1 },
        ],
        settings: {
          successUrl: "https://authkey.pro/dashboard/billing/success",
        },
        customer: {
          id: data.stripeCustomerId,
        },
      });
      setIsCheckoutLoading(false);
    }
  };
  if (isLoading || isError || !data) {
    return <Loader2 />;
  }
  return (
    <div className="flex w-full flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Image
            src={data.image ?? ""}
            alt="Profile photo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Separator orientation="vertical" className="mx-4 h-[50px]" />
          <div>
            <h1 className="text-xl">{data.name}</h1>
            <Separator orientation="horizontal" className="w-100" />
            <h2 className="text-gray-400">{data.email}</h2>
          </div>
        </div>
        <Button
          variant={"outline"}
          onClick={() =>
            void signOut({ redirect: true, callbackUrl: "/login" })
          }
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="mt-4">
        {data.key && (
          <div className="mt-6 hidden flex-col gap-2 rounded-md bg-gray-900 p-4 sm:flex sm:w-full">
            <div className="flex flex-row items-center justify-between">
              <span className="text-xs text-white sm:text-sm">.env</span>
              <div className="flex flex-row gap-4">
                <button
                  className="px-2 focus:outline-red-500"
                  onClick={() => setHide(!hide)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className="h-4 w-4 text-gray-400 hover:text-gray-300"
                  >
                    <g fill="currentColor">
                      <path d="M10 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5Z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41c.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                </button>
                <button
                  className="rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-white hover:bg-gray-700 focus:outline-red-500 sm:text-sm"
                  onClick={void navigator.clipboard.writeText(data.key ?? "")}
                >
                  Copy
                </button>
              </div>
            </div>
            <code className="flex flex-col text-xs sm:text-sm">
              <div className="flex flex-row">
                <span className="pr-4 text-gray-400">1</span>
                <span className=" text-blue-400/80">AUTHKEY_SECRET=</span>
                <span className="text-white">
                  {hide ? "authkey_••••••••••••••••••••••••" : data.key}
                </span>
              </div>
            </code>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <h3 className="text-base font-semibold tracking-tight">Balance</h3>
            <p className="text-xl text-muted-foreground">
              {data.credits.toString()} Credits
            </p>
          </div>
          <div className="flex items-center p-6 pt-0">
            <Button onClick={() => openCheckout()} disabled={isCheckoutLoading}>
              <PlusCircle
                className={`mr-2 h-4 w-4 ${
                  isCheckoutLoading ? "animate-spin" : ""
                }`}
              />
              Purchase Credits
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <h3 className="text-base font-semibold tracking-tight">Rate</h3>
            <p className="text-xl text-muted-foreground">1 USD = 400 credits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
