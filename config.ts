import { aurora, auroraTestnet, localhost } from "@wagmi/chains";
import WNEAR_JSON from "./lib/abis/wnear.json";
import STNEAR_JSON from "./lib/abis/stnear.json";
import STNEAR_SWAP_JSON from "./lib/abis/stnear-swap-abi.json";

export const getConfig = () => {
  const env = process.env.NEXT_PUBLIC_VERCEL_ENV;
  switch (env) {
    case "production":
    case "mainnet":
      return {
        wagmiNetwork: aurora,
        nodeUrl: "https://mainnet.aurora.dev",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_AURORA,
        explorerUrl: "https://explorer.aurora.dev",
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        stNearAbi: STNEAR_JSON,
        swapAbi: STNEAR_SWAP_JSON,
        wNearAbi: WNEAR_JSON,
        stNearAddress: process.env.NEXT_PUBLIC_STNEAR_CONTRACT_ADDRESS_MAINNET!,
        swapAddress: process.env.NEXT_PUBLIC_SWAP_CONTRACT_ADDRESS_MAINNET!,
        wNearAddress: process.env.NEXT_PUBLIC_WNEAR_CONTRACT_ADDRESS_MAINNET!,
      };
    case "testnet":
    case "development":
    case "preview":
      return {
        wagmiNetwork: auroraTestnet,
        nodeUrl: "https://testnet.aurora.dev",
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_AURORA,
        explorerUrl: "https://explorer.testnet.aurora.dev",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        stNearAbi: STNEAR_JSON,
        swapAbi: STNEAR_SWAP_JSON,
        wNearAbi: WNEAR_JSON,
        stNearAddress: process.env.NEXT_PUBLIC_STNEAR_CONTRACT_ADDRESS_TESTNET!,
        swapAddress: process.env.NEXT_PUBLIC_SWAP_CONTRACT_ADDRESS_TESTNET!,
        wNearAddress: process.env.NEXT_PUBLIC_WNEAR_CONTRACT_ADDRESS_TESTNET!,
      };
    default:
      throw Error(
        `Unconfigured environment '${env}'. Can be configured in src/config.js.`
      );
  }
};
