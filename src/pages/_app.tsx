import ApiProvider from "@/api/ApiProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });
  return (
    <>
      <ApiProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ToastContainer />
        </QueryClientProvider>
      </ApiProvider>
    </>
  );
}
