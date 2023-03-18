import {
  BigNumber,
  Contract,
  ContractInterface,
  ethers,
  providers,
  Signer,
} from "ethers";
import { getConfig } from "../config";

const config = getConfig();

export const callChangeMethod = (
  method: string,
  args: any,
  value: BigNumber = BigNumber.from("0"),
  signer: Signer,
  contractAddress: string,
  abi: ContractInterface
) => {
  const writeContract = new Contract(contractAddress, abi, signer);

  let resp = writeContract[method](...args, {
    value,
  });

  return resp;
};

export const callViewMethod = (
  method: string,
  args: any[],
  callConfig: {
    provider: providers.Provider;
    contractAddress: string;
    abi: ContractInterface;
  }
) => {
  const { provider, contractAddress, abi } = callConfig;
  const readContract = new ethers.Contract(contractAddress, abi, provider);

  const resp = readContract[method](...args);
  return resp;
};

export const addTokenToMetamask = async (
  address: any,
  symbol: any,
  decimals: any,
  image: any
) => {
  if (typeof window.ethereum !== "undefined") {
    const wasAdded = await window?.ethereum!.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address,
          symbol,
          decimals,
          image,
        },
      },
    });

    if (wasAdded) {
      return `${symbol!} Has Been Added Successfully`;
    } else {
      throw new Error(`${symbol!} Has Not Been Added`);
    }
  }
};
