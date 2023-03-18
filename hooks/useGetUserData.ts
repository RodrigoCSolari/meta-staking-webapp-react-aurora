import { useQuery } from "react-query";
import { useAccount, useProvider } from "wagmi";
import { REFETCH_INTERVAL } from "../constants";
import { getUserData } from "../lib/metapool";

export const useGetUserData = () => {
  const provider = useProvider();
  const { address } = useAccount();
  return useQuery("userData", () => getUserData(provider, address), {
    onError: (err) => {
      console.error(err);
    },
    refetchInterval: REFETCH_INTERVAL,
    staleTime: REFETCH_INTERVAL,
  });
};
