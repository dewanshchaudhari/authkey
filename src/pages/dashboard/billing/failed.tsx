import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Failed() {
  const router = useRouter();
  React.useEffect(() => {
    setTimeout(() => {
      void router.push("/dashboard/overview");
    }, 5000);
  });
  return (
    <div className="h-full bg-gray-100">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          data-v-56bd7dfc=""
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-x mx-auto my-6 h-16 w-16 text-red-600"
        >
          <path fill="currentColor" d="M18 6 6 18"></path>
          <path fill="currentColor" d="m6 6 12 12"></path>
        </svg>
        <div className="text-center">
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
            Payment Failed!
          </h3>
          <p className="my-2 text-gray-600">Payment Failed, Try Again Later.</p>
          <div className="py-10 text-center">
            <Button asChild className="rounded-lg">
              <Link href="/dashboard/overview">Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
