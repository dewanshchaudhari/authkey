import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { countries } from "@/lib/countries";
import { api } from "@/utils/api";
import { Loader2 } from "lucide-react";
import React from "react";
export default function Logs() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    api.log.getLogs.useInfiniteQuery(
      {
        limit: 20,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
      <h1 className="break-normal text-center text-3xl font-medium">Logs</h1>
      <h2 className="mb-4 text-center text-xs text-gray-600 sm:text-sm">
        These are all of the requrest that have been sent via your key.
      </h2>
      <Table>
        <TableCaption>
          {hasNextPage && (
            <Button
              onClick={() => void fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              More
            </Button>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Country</TableHead>
            <TableHead className="w-[100px]">Code</TableHead>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead className="w-[100px]">Method</TableHead>
            <TableHead className="w-[100px]">Time</TableHead>
            <TableHead className="w-[100px]">Amount</TableHead>
            <TableHead className="w-[100px]">Result</TableHead>
            <TableHead className="w-[100px]">Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages.map((page) =>
            page.items.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{countries[log.countryCode]}</TableCell>
                <TableCell>+{log.countryCode}</TableCell>
                <TableCell>{log.number}</TableCell>
                <TableCell>{log.method}</TableCell>
                <TableCell>{log.time.toLocaleString()}</TableCell>
                <TableCell>{log.amount}</TableCell>
                <TableCell>{log.result}</TableCell>
                <TableCell>{log.reason}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
