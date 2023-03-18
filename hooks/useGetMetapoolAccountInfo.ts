import { useQuery } from "react-query";
import { REFETCH_INTERVAL } from "../constants";
import { getMetapoolAccountInfo } from "../queries/getMetapoolAccountInfo";
import { MetapoolAccountInfo } from "../queries/getMetapoolAccountInfo.types";

export const useGetMetapoolAccountInfo = () => {
  return useQuery<MetapoolAccountInfo>(
    "metapoolAccountInfo",
    () => getMetapoolAccountInfo(),
    {
      onError: (err) => {
        console.error(err);
      },
      refetchInterval: REFETCH_INTERVAL,
      staleTime: REFETCH_INTERVAL,
    }
  );
};
