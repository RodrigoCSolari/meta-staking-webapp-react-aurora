import React from "react";
import {
  Divider,
  Flex,
  Button,
  Img,
  Skeleton,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { InfoContainer } from "../../components/InfoContainer";
import { useGetStakingData } from "../../hooks/useGetStakingData";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { useErrorMsgStore } from "../../stores/ErrorMsgStore";
import { useTxSuccessStore } from "../../stores/txSuccessStore";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { addTokenToMetamask } from "../../lib/ethereum";

export const TokenData = () => {
  const { setErrorMsg } = useErrorMsgStore();
  const { setTxSuccess } = useTxSuccessStore();
  const { data: stakingData } = useGetStakingData();
  const { hasCopied: hasCopiedAddress, onCopy: onCopyAddress } = useClipboard(
    stakingData?.address!
  );
  const { hasCopied: hasCopiedSymbol, onCopy: onCopySymbol } = useClipboard(
    stakingData?.symbol!
  );
  const { hasCopied: hasCopiedDecimals, onCopy: onCopyDecimals } = useClipboard(
    stakingData?.decimals!
  );

  const handleAddToken = async () => {
    try {
      const resp = await addTokenToMetamask(
        stakingData?.address!,
        stakingData?.symbol!,
        stakingData?.decimals!,
        "https://meta-staking-webapp-ssv-smoky.vercel.app/mpETH_dark.png"
      );
      if (resp) {
        setTxSuccess({ title: resp });
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setErrorMsg(errorMsg);
    }
  };

  return (
    <InfoContainer>
      <Skeleton isLoaded={stakingData !== undefined}>
        {stakingData && (
          <>
            <Text fontSize=".85em">Contract Address:</Text>
            <Flex alignItems="center">
              <Text
                color="purple.800"
                fontSize={{ base: ".8em", md: ".85em" }}
                ml="10px"
              >
                {stakingData.address}
              </Text>
              {hasCopiedAddress ? (
                <CheckIcon ml="10px" color="green.600" />
              ) : (
                <CopyIcon
                  cursor="pointer"
                  ml="10px"
                  aria-label="Copy link"
                  onClick={onCopyAddress}
                />
              )}
            </Flex>
            <Divider my="10px" />
            <Text fontSize=".85em">Symbol:</Text>
            <Flex alignItems="center">
              <Text color="purple.800" fontSize=".85em" ml="10px">
                {stakingData.symbol}
              </Text>
              {hasCopiedSymbol ? (
                <CheckIcon ml="10px" color="green.600" />
              ) : (
                <CopyIcon
                  cursor="pointer"
                  ml="10px"
                  aria-label="Copy link"
                  onClick={onCopySymbol}
                />
              )}
            </Flex>
            <Divider my="10px" />
            <Text fontSize=".85em">Decimals:</Text>
            <Flex alignItems="center">
              <Text color="purple.800" fontSize=".85em" ml="10px">
                {stakingData.decimals}
              </Text>
              {hasCopiedDecimals ? (
                <CheckIcon ml="10px" color="green.600" />
              ) : (
                <CopyIcon
                  cursor="pointer"
                  ml="10px"
                  aria-label="Copy link"
                  onClick={onCopyDecimals}
                />
              )}
            </Flex>
          </>
        )}
        {typeof window.ethereum !== "undefined" && (
          <>
            <Divider my="10px" />
            <Button
              colorScheme="purple"
              w="100%"
              aria-label="add token"
              leftIcon={<Img w="2em" h="2em" src="./MetaMask.png" ml="-5px" />}
              onClick={handleAddToken}
            >
              Add Token
            </Button>
          </>
        )}
      </Skeleton>
    </InfoContainer>
  );
};
