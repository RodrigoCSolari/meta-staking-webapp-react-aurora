import { Divider, Flex, Img, Skeleton, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import TokenInfo from "../../components/TokenInfo";
import { wtoeCommify, yoctoToDollarStr, etow } from "../../lib/util";
import { InfoContainer } from "../../components/InfoContainer";
import { useGetEthereumDollarPrice } from "../../hooks/useGetEthereumDollarPrice";
import { useGetEthereumBalance } from "../../hooks/useGetEthereumBalance";
import { useGetStakingData } from "../../hooks/useGetStakingData";
import { useGetLiquidityData } from "../../hooks/useGetLiquidityData";
import { InfoIcon } from "@chakra-ui/icons";
import { useGetUserData } from "../../hooks/useGetUserData";

export const UserStats = () => {
  const { data: userData } = useGetUserData();
  const { data: stakingData } = useGetStakingData();
  const { data: ethereumDollarPrice } = useGetEthereumDollarPrice();
  const { data: ethereumBalance } = useGetEthereumBalance();
  const { data: liquidityData } = useGetLiquidityData();

  return (
    <InfoContainer>
      <Skeleton isLoaded={ethereumBalance !== undefined}>
        <TokenInfo
          description="Available ETH wallet"
          tooltip="The amount of ETH in your wallet"
          amount={wtoeCommify(ethereumBalance)}
          imgPath="./ETH.png"
          dollarAmount={yoctoToDollarStr(ethereumBalance, ethereumDollarPrice)}
        />
      </Skeleton>
      <Divider />
      <Skeleton
        isLoaded={
          userData !== undefined &&
          stakingData !== undefined &&
          ethereumDollarPrice !== undefined
        }
      >
        {stakingData && userData && ethereumDollarPrice && (
          <TokenInfo
            description="Your mpETH Tokens"
            tooltip="The amount of mpETH in your wallet"
            amount={wtoeCommify(userData.stakingBalanceOf)}
            imgPath="./mpETH_dark.png"
            dollarAmount={yoctoToDollarStr(
              userData.stakingBalanceOf
                .mul(stakingData.mpETHPrice)
                .div(etow("1")),
              ethereumDollarPrice
            )}
          />
        )}
      </Skeleton>
      <Divider />
      <Skeleton
        isLoaded={
          userData !== undefined &&
          stakingData !== undefined &&
          ethereumDollarPrice !== undefined
        }
      >
        {stakingData && userData && ethereumDollarPrice && (
          <Flex justifyContent="space-between">
            <Flex alignItems="center" columnGap="5px">
              <Text fontSize={{ base: ".8em", md: ".85em" }}>
                Your Share Value Of Liquidity Pool
              </Text>
              <Tooltip label="The amount of LP tokens you own.">
                <InfoIcon color="blackAlpha.500" boxSize="12px" />
              </Tooltip>
            </Flex>
            <Flex flexDirection="column" alignItems="end">
              <Flex>
                <Text>{`${wtoeCommify(userData?.liquidityBalanceOf)}`}</Text>
                <Img
                  w="1.5em"
                  h="1.5em"
                  ml="5px"
                  src="./mpETH_dark.png"
                  boxShadow={"0px 0px 2px 2px #A855F766"}
                  borderRadius="full"
                />
                <Img
                  w="1.5em"
                  h="1.5em"
                  src="./ETH.png"
                  boxShadow={"0px 0px 2px 2px #A855F766"}
                  borderRadius="full"
                  ml="-5px"
                />
              </Flex>
              <Flex>
                <Text fontSize=".8em" color="purple.800">
                  {yoctoToDollarStr(
                    liquidityData?.totalAssets
                      .mul(
                        userData
                          ?.liquidityBalanceOf!.mul(10000)
                          .div(liquidityData?.totalSupply)
                      )
                      .div(10000),
                    ethereumDollarPrice
                  )}
                </Text>
                <Text
                  fontSize=".8em"
                  color="purple.800"
                  w="1.8em"
                  textAlign="center"
                >
                  $
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Skeleton>
    </InfoContainer>
  );
};
