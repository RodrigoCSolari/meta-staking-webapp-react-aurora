import { MetapoolAccountInfo } from "./getMetapoolAccountInfo.types";

export const getMetapoolAccountInfo = async () => {
  const url = "https://rest.nearapi.org/view";
  const params = {
    contract: "meta-pool.near",
    method: "get_contract_state",
    rpc_node: "https://rpc.mainnet.near.org",
    params: {},
  };
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const accountInfo: MetapoolAccountInfo = await result.json();

  return accountInfo;
};
