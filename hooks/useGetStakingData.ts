import { useQuery } from "react-query";
import { useAccount, useProvider } from "wagmi";
import { REFETCH_INTERVAL } from "../constants";

export const useGetStakingData = () => {
  const provider = useProvider();
  return useQuery(
    "stakingData",
    () => {
      return undefined;
    },
    {
      onError: (err) => {
        console.error(err);
      },
      refetchInterval: REFETCH_INTERVAL,
      staleTime: REFETCH_INTERVAL,
    }
  );
};
