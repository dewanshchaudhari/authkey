import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
import React, { type PropsWithChildren } from "react";
const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
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
