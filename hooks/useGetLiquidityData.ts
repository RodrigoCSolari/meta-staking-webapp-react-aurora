import { useQuery } from "react-query";
import { useAccount, useProvider } from "wagmi";
import { REFETCH_INTERVAL } from "../constants";
import { getLiquidityData } from "../lib/metapool";

export const useGetLiquidityData = () => {
  const provider = useProvider();
  return useQuery("liquidityData", () => getLiquidityData(provider), {
    onError: (err) => {
      console.error(err);
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: REFETCH_INTERVAL,
  });
};
