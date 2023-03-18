import { Divider, Img, Skeleton } from "@chakra-ui/react";
import React from "react";
import TokenInfo from "../../components/TokenInfo";
import {
  yoctoToDollarStr,
  yton,
  assetsToDollarStr,
  toStringDec2,
} from "../../lib/util";
import { InfoContainer } from "../../components/InfoContainer";
import { useGetUserData } from "../../hooks/useGetUserData";
import { useGetNearDollarPrice } from "../../hooks/useGetNearDollarPrice";
import { useGetContractData } from "../../hooks/useGetContractData";

export const MetapoolStats = () => {
  const { data: contractData } = useGetContractData();
  const { data: userData } = useGetUserData();
  const { data: nearDollarPrice } = useGetNearDollarPrice();

  return (
    <InfoContainer>
      <Skeleton isLoaded={contractData !== undefined}>
        <TokenInfo
          description="stNEAR Available"
          tooltip="Current amount of stNEAR in this contract. Replenished every 5 minutes."
          amount={yton(contractData?.stNearAvailable)}
          symbol="Ⓢ"
          dollarAmount={assetsToDollarStr(
            contractData?.stNearAvailable,
            contractData?.stNearprice,
            nearDollarPrice
          )}
        />
      </Skeleton>
      <Divider />
      <Skeleton isLoaded={contractData !== undefined}>
        <TokenInfo
          description="wNEAR Available"
          tooltip="Current amount of wNEAR in this contract. Replenished every 5 minutes."
          amount={yton(contractData?.wnearAvailable)}
          symbol="Ⓝ"
          dollarAmount={yoctoToDollarStr(
            contractData?.wnearAvailable,
            nearDollarPrice
          )}
        />
      </Skeleton>
      <Divider />
      <Skeleton isLoaded={nearDollarPrice !== undefined}>
        <TokenInfo
          description="wNear Price"
          tooltip="The amount of wNear in your wallet"
          amount={toStringDec2(nearDollarPrice || 0)}
          symbol="$"
        />
      </Skeleton>
      <Divider />
      <Skeleton
        isLoaded={nearDollarPrice !== undefined && contractData !== undefined}
      >
        <TokenInfo
          description="stNear Price"
          tooltip="The amount of stNear in your wallet"
          amount={yton(contractData?.stNearprice)}
          symbol="Ⓝ"
          dollarAmount={yoctoToDollarStr(
            contractData?.stNearprice,
            nearDollarPrice
          )}
        />
      </Skeleton>
    </InfoContainer>
  );
};
