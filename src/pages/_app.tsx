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
        {isMobile ? <Component {...pageProps} /> : <Component {...pageProps} />}
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
