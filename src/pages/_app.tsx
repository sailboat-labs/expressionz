import "@/styles/globals.css";
import "@/styles/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";

import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const wagmiConfig = getDefaultConfig({
  appName: "expressions",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "expressions",
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [zora.id]: http(),
    [arbitrum.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [auth, setAuth] = useState();
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={{
              lightMode: lightTheme(),
              darkMode: darkTheme(),
            }}
            coolMode
          >
            <Toaster />
            {/* <AuthContext.Provider value={{ auth, setAuth }}> */}
            <Component {...pageProps} />
            {/* </AuthContext.Provider> */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
