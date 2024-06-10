import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import {
  DollarSign,
  Home,
  HomeIcon,
  KeyRound,
  ScrollText,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1 ">
            <Button
              asChild
              variant={
                pathname === "/dashboard/overview" ? "secondary" : "link"
              }
              className="w-full justify-start"
            >
              <Link href="/dashboard/overview">
                <HomeIcon className="mr-2 h-4 w-4" />
                Overview
              </Link>
            </Button>
            {/* <Button
              asChild
              variant={
                pathname === "/dashboard/accounts" ? "secondary" : "link"
              }
              className="w-full justify-start"
            >
              <Link href="/dashboard/accounts">
                <UserCircle2 className="mr-2 h-4 w-4" />
                Accounts
              </Link>
            </Button> */}
            <Button
              asChild
              variant={pathname === "/dashboard/keys" ? "secondary" : "link"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/keys">
                <KeyRound className="mr-2 h-4 w-4" />
                API Keys
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/dashboard/logs" ? "secondary" : "link"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/logs">
                <ScrollText className="mr-2 h-4 w-4" />
                Requests
              </Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/dashboard/pricing" ? "secondary" : "link"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/pricing">
                <DollarSign className="mr-2 h-4 w-4" />
                Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
