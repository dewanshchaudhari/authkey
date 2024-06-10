import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Layout from "./layout";
import useMediaQuery from "@/hooks/mediaQuery";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <SessionProvider session={session}>
      <Layout>
        {isMobile ? (
          <div className="flex h-screen w-screen flex-col items-center justify-center text-center text-xl">
            The Website is best viewed on desktop.
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
