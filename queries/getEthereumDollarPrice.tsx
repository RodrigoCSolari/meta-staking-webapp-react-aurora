import { EthereumDollarPrice } from "./getEthereumDollarPrice.types";

export const getEthereumDollarPrice = async (): Promise<number> => {
  let response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  let data: EthereumDollarPrice = await response.json();

  return data.ethereum.usd;
};
