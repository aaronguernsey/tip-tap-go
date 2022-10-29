import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AlertProvider } from "../context/AlertContext";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import {
  META_DESCRIPTION,
  META_TITLE,
  META_URL,
  GAME_TITLE,
} from "../constants/content";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="og:title" content={META_TITLE} />
        <meta name="og:site_name" content={GAME_TITLE} />
        <meta name="og:description" content={META_DESCRIPTION} />
        <meta name="og:url" content={META_URL} />
        <meta name="og:image" content="/tiptap_og_img.png" />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="830" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content={META_URL} />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </AlertProvider>
  );
}

export default MyApp;
