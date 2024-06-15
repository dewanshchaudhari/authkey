import { useSession } from "next-auth/react";
import Head from "next/head";
import {
  Globe2,
  IndianRupee,
  Lock,
  LogIn,
  Monitor,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Iphone from "@/components/Iphone";
import {
  FrontPageCardLeft,
  FrontPageCardMiddle,
  FrontPageCardRight,
} from "@/components/FrontPageCard";
import { FAQLeft, FAQRight } from "@/components/FAQ";
import ApiEmbed from "@/components/ApiEmbed";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Authkey</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative bg-white">
        <nav className="sticky top-0  z-50 bg-slate-100 p-6">
          <div className="container flex max-w-6xl flex-row items-center justify-between">
            <h1 className="flex flex-row items-baseline text-2xl font-bold">
              <span className="tracking-tight hover:cursor-pointer dark:text-white">
                <span className="text-red-600">Auth</span>
                <span className="ml-1 font-semibold">Key</span>
              </span>
            </h1>
            <div className="flex items-center gap-4">
              <Button variant={"outline"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    fill="currentColor"
                    d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8v370.3c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z"
                  ></path>
                </svg>
                <Link href="https://docs.authkey.pro/" target="_blank">
                  Docs
                </Link>
              </Button>
              <Button variant={"outline"}>
                <Link href="/about" target="_blank">
                  About Us
                </Link>
              </Button>
              {session ? (
                <Button className="bg-red-600" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button className="bg-red-600" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        </nav>
        <div className="container max-w-6xl">
          <div className="mt-4 text-center">
            <h1 className="text-[34px] font-bold leading-[54px]">
              Auth Solution for Websites and Apps
            </h1>
            <h2>Enable Login With Whatsapp Option On Your Websites / Apps</h2>
          </div>
          <div className="mt-8 flex flex-row items-center justify-between">
            <div className="flex w-1/3 flex-col items-center justify-center gap-24">
              <figure className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
                  <Rocket />
                </div>
                <div className="text-center">
                  <h1 className="text-[30px] font-bold leading-[54px]">
                    Easy Integration
                  </h1>
                  <h2>
                    Integrating WhatsApp Login Buttons is simple and
                    straightforward with our easy-to-use APIs.
                  </h2>
                </div>
              </figure>
              <figure className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
                  <LogIn />
                </div>
                <div className="text-center">
                  <h1 className="text-[30px] font-bold leading-[54px]">
                    Seamless Login
                  </h1>
                  <h2>
                    Login using WhatsApp eliminates the need for creating
                    separate user accounts, saving time and effort.
                  </h2>
                </div>
              </figure>
              <figure className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
                  <Globe2 />
                </div>
                <div className="text-center">
                  <h1 className="text-[30px] font-bold leading-[54px]">
                    Global Availability
                  </h1>
                  <h2>
                    Authkey is accessible worldwide, making it a convenient
                    option for users across the globe to log in and access
                    services.
                  </h2>
                </div>
              </figure>
            </div>
            <Iphone />
            <div className="flex w-1/3 flex-col items-center justify-center gap-24">
              <figure className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
                  <Lock />
                </div>
                <div className="text-center">
                  <h1 className="text-[30px] font-bold leading-[54px]">
                    Increased Security
                  </h1>
                  <h2>
                    With two-factor authentication and end-to-end encryption,
                    login with WhatsApp is highly secure.
                  </h2>
                </div>
              </figure>
              <figure className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
                  <Monitor />
                </div>
                <div className="text-center">
                  <h1 className="text-[30px] font-bold leading-[54px]">
                    Stable API
                  </h1>
                  <h2>
                    Multi-device WhatsApp no longer needs a phone connection, so
                    Wotmaster provides better uptime (99.98%) compared to the
                    past.
                  </h2>
                </div>
              </figure>
              <figure className="flex flex-col items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black">
                  <IndianRupee />
                </div>
                <div className="text-center">
                  <h1 className="text-[30px] font-bold leading-[54px]">
                    Cost Effective
                  </h1>
                  <h2>
                    Authkey is a cost-effective alternative to traditional
                    SMS-based OTPs.
                  </h2>
                </div>
              </figure>
            </div>
          </div>
          <h1 className="mt-20 text-center text-[30px] font-bold leading-[54px] text-gray-600">
            Authkey as SMS OTP Verification Alternative
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <FrontPageCardLeft />
            <FrontPageCardMiddle />
            <FrontPageCardRight />
          </div>
        </div>
        <div className="container max-w-6xl">
          <h1 className="mt-20 text-center text-[30px] font-bold leading-[54px] text-gray-600">
            Integrate WhatsApp Api
          </h1>
          <h2 className="mb-4 text-center text-[20px]">
            with your preferred language into your custom solution.
          </h2>
          <ApiEmbed />
        </div>
        <div className="mt-20 w-full bg-slate-100 p-8">
          <div className="container max-w-6xl">
            <h1 className="text-center text-[30px] font-bold leading-[54px] text-gray-600">
              Start using our service easy and hasslefree.
            </h1>
            <div className="text-center">
              {session ? (
                <Button className="bg-red-600" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button className="bg-red-600" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
              <Button variant={"outline"} className="ml-4">
                <Link href="/contact" target="_blank">
                  Contact Us
                </Link>
              </Button>
              <Button variant={"outline"} className="ml-4">
                <Link href="/about" target="_blank">
                  About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="container max-w-6xl">
          <h1 className="text-center text-[30px] font-bold leading-[54px] text-gray-600">
            Frequently Asked Questions
          </h1>
          <div className="flex w-full flex-row items-center justify-center gap-10">
            <div className="w-1/2">
              <FAQLeft />
            </div>
            <div className="w-1/2">
              <FAQRight />
            </div>
          </div>
        </div>
        <div className="mt-4 bg-slate-100 p-10">
          <div className=" container flex max-w-6xl flex-row items-center justify-between">
            <h1>© 2024 - All Rights Reserved - Authkey</h1>
            <div className="flex flex-row items-center justify-center gap-4">
              <Link
                className="underline underline-offset-4 hover:text-primary"
                href="/terms-and-conditions"
              >
                Terms of Service
              </Link>{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
