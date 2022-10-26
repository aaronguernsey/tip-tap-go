import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AlertProvider } from "../context/AlertContext";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <Component {...pageProps} />
      <Analytics />
    </AlertProvider>
  );
}

export default MyApp;
