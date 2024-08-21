import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import useMediaQuery from "@/hooks/mediaQuery";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import React, { type PropsWithChildren } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-6 flex flex-row items-center justify-start space-x-4">
          <Link href={"/"}>
            <h1 className="flex flex-row items-baseline text-2xl font-bold">
              <span className="tracking-tight hover:cursor-pointer dark:text-white">
                <span className="text-red-600">Auth</span>
                <span className="ml-1 font-semibold">key</span>
              </span>
            </h1>
          </Link>
        </div>
        <div className="m-4">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Only available on larger screens!</AlertTitle>
            <AlertDescription>
              Apologies for the Inconvenience. Please use a device with larger
              screen.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  if (
    router.pathname.startsWith("/dashboard") ||
    router.pathname === "/profile"
  ) {
    return (
      <div className="container max-w-6xl">
        <Navbar />
        <div className="flex w-full flex-row">
          <Sidebar className="w-1/4" />
          <div className="h-full w-full p-4">{children}</div>
        </div>
      </div>
    );
  }
  return (
    <>
      {children} <Toaster />
    </>
  );
};
export default Layout;
