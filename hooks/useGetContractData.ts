import { useQuery } from "react-query";
import { useAccount, useProvider } from "wagmi";
import { REFETCH_INTERVAL } from "../constants";
import { getContractData } from "../lib/metapool";

export const useGetContractData = () => {
  const provider = useProvider();
  return useQuery("contractData", () => getContractData(provider), {
    onError: (err) => {
      console.error(err);
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: REFETCH_INTERVAL,
  });
};
