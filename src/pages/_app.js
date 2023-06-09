import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "500", "700"] });
export const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <div className={roboto.className}>
          <NextNProgress options={{ showSpinner: false }} />
          <Component {...pageProps} />
          <Toaster />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
}
