import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { getConfig } from "../config";

const config = getConfig();

const { chains, provider } = configureChains(
  [config.wagmiNetwork as unknown as Chain],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || "" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "meta-staking-webapp-react-aurora",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const algo = createContext(
  {} as { first: string; setFirst: Dispatch<SetStateAction<string>> }
);
export const WalletContext: React.FC = ({ children }) => {
  const [first, setFirst] = useState("lalala");
  return (
    <algo.Provider value={{ first, setFirst }}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </WagmiConfig>
    </algo.Provider>
  );
};

export default WalletContext;
