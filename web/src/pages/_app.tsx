import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";

import "./main.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
