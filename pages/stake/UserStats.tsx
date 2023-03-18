import { Divider, Img, Skeleton } from "@chakra-ui/react";
import React from "react";
import TokenInfo from "../../components/TokenInfo";
import { yoctoToDollarStr, yton, assetsToDollarStr } from "../../lib/util";
import { InfoContainer } from "../../components/InfoContainer";
import { useGetUserData } from "../../hooks/useGetUserData";
import { useGetNearDollarPrice } from "../../hooks/useGetNearDollarPrice";
import { useGetContractData } from "../../hooks/useGetContractData";

export const UserStats = () => {
  const { data: contractData } = useGetContractData();
  const { data: userData } = useGetUserData();
  const { data: nearDollarPrice } = useGetNearDollarPrice();

  return (
    <InfoContainer>
      <Skeleton isLoaded={userData?.wnearUserBalance !== undefined}>
        <TokenInfo
          description="Available wNear wallet"
          tooltip="The amount of wNear in your wallet"
          amount={yton(userData?.wnearUserBalance)}
          symbol="Ⓝ"
          dollarAmount={yoctoToDollarStr(
            userData?.wnearUserBalance,
            nearDollarPrice
          )}
        />
      </Skeleton>
      <Divider />
      <Skeleton
        isLoaded={
          userData !== undefined &&
          nearDollarPrice !== undefined &&
          contractData !== undefined
        }
      >
        <TokenInfo
          description="Your stNear Tokens"
          tooltip="The amount of stNear in your wallet"
          amount={yton(userData?.stNearUserBalance)}
          symbol="Ⓢ"
          dollarAmount={assetsToDollarStr(
            userData?.stNearUserBalance,
            contractData?.stNearprice,
            nearDollarPrice
          )}
        />
      </Skeleton>
    </InfoContainer>
  );
};
