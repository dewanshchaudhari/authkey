import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { countries } from "@/lib/countries";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const {
    data: pricing,
    isLoading,
    isError,
  } = api.pricing.getPricing.useQuery();
  if (isError) {
    return <h1>Error...</h1>;
  }
  return (
    <>
      <div className="pointer-events-auto mb-4 flex w-full items-center justify-between gap-x-6 rounded-lg border border-amber-500 bg-amber-100 px-6 py-2.5 sm:rounded-lg sm:py-3 sm:pl-4 sm:pr-3.5">
        <p className="text-xs leading-6 text-black sm:text-sm">
          <strong className="font-semibold">Pricing Now Available!</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx="1" cy="1" r="1"></circle>
          </svg>
          Head to the{" "}
          <Link className="font-bold hover:underline" href="/profile">
            Plans &amp; Billing
          </Link>{" "}
          tab to upgrade!
        </p>
        <div className="text-xs leading-6 text-black sm:text-sm">
          💡 100 INR = 2500 Credits
        </div>
      </div>
      <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
        {isLoading ? (
          <div className="flex flex-row items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Country</TableHead>
                <TableHead className="">Code</TableHead>
                <TableHead className="">OTP Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricing.map((price, index) => (
                <TableRow key={index}>
                  <TableCell>{countries[price.code.toString()]}</TableCell>
                  <TableCell>
                    {price.code === "-1" ? "Others" : `+${price.code}`}
                  </TableCell>
                  {/* <TableCell>{price.woo === -1 ? "N/A" : price.woo}</TableCell> */}
                  <TableCell>{price.woo === -1 ? "N/A" : price.woo}</TableCell>
                  {/* <TableCell>{price.sms === -1 ? "N/A" : price.sms}</TableCell> */}
                  {/* <TableCell>{price.woo === -1 ? "N/A" : price.wmc}</TableCell> */}
                  {/* <TableCell>{price.wmm === -1 ? "N/A" : price.wmm}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
