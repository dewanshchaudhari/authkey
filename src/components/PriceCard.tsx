import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PriceCard() {
  return (
    <section className="container flex flex-col  gap-6 md:max-w-[64rem]">
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">Credits</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-1">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Indian OTP - 1 Credit
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Interational OTP - 20
              Credits
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-2xl font-bold">Pricing</h4>
            <h3>$1 - 400 Credits</h3>
          </div>
          <Link href={"/login"} className={cn(buttonVariants({ size: "lg" }))}>
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
