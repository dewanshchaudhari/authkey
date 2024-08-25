import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PriceCard() {
  return (
    <section className="container flex flex-col  gap-6 md:max-w-[64rem]">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className="px-8 py-10">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">Pricing</h2>
          <p className="mb-8 text-gray-600">
            Purchase credits to send one time authentication codes on WhatApp.
            Credits per request depend on the recipient&#39;s country.
          </p>

          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-lg bg-purple-100 p-4">
              <div>
                <h3 className="font-semibold text-purple-800">
                  For Indian recipients
                </h3>
                <p className="text-sm text-purple-600">
                  (numbers with country code +91)
                </p>
              </div>
              <span className="font-bold text-purple-700">
                1 credit per request
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-blue-100 p-4">
              <div>
                <h3 className="font-semibold text-blue-800">
                  For Other recipients
                </h3>
                <p className="text-sm text-blue-600">(all other numbers)</p>
              </div>
              <span className="font-bold text-blue-700">
                20 credits per request
              </span>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-gray-100 p-6 text-center">
            <p className="text-2xl font-bold text-gray-800">1$ = 400 credits</p>
            <p className="text-gray-600">(with lifetime validity)</p>
          </div>
          <Link
            href={"/login"}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-bold text-white shadow-md transition duration-300 hover:from-purple-700 hover:to-blue-700"
            )}
          >
            Purchase Credits
          </Link>
        </div>
      </div>
    </section>
  );
}
