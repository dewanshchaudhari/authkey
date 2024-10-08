import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Success() {
  const router = useRouter();
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      void router.push("/dashboard/overview");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [router]);
  return (
    <div className="h-full bg-gray-100">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="mx-auto my-6 h-16 w-16 text-green-600"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="text-center text-base font-semibold text-gray-900 md:text-2xl">
            Payment Done!
          </h3>
          <p className="my-2 text-gray-600">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
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
