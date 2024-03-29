import "@/styles/globals.css";
import "@/styles/styles.css";
import { Toaster } from "sonner";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Toaster />
      <Component {...pageProps} />
    </main>
  );
}
