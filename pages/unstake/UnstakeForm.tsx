import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Text,
  Tooltip,
  Skeleton,
  Box,
  Img,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { ntoy, toNumber, yton } from "../../lib/util";
import { checkUnstakeErrorAmounts } from "../../services/transaction/checkUnstakeErrorAmounts.service";
import { UnstakeModal } from "./UnstakeModal";
import { AlertMsg } from "../../components/AlertMsg";
import { InfoContainer } from "../../components/InfoContainer";
import { useAccount } from "wagmi";
import {
  getLiquidUnstakeAmounts,
  getLiquidUnstakeFeeAsString,
  getMaxWithdrawal,
} from "../../utils/unstakeHandlers";
import { useGetUserData } from "../../hooks/useGetUserData";
import { useGetContractData } from "../../hooks/useGetContractData";

export const UnstakeForm = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [haveAllowance, setHaveAllowance] = useState(false);
  const [fee, setFee] = useState(0);
  const [feeAsString, setFeeAsString] = useState("");

  const { data: userData } = useGetUserData();
  const { data: contractData } = useGetContractData();
  const { isConnected } = useAccount();

  const handleMaxClick = () => {
    if (isConnected && contractData && userData) {
      const maxWithdrawal = getMaxWithdrawal(
        contractData.wnearAvailable,
        userData.stNearUserBalance,
        contractData.stNearprice
      );
      setInputValue(yton(maxWithdrawal, 24));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnstakeClick();
    }
  };

  const handleUnstakeClick = async () => {
    const errorMsg = checkUnstakeErrorAmounts(
      inputValue,
      userData?.stNearUserBalance,
      contractData?.wnearAvailable,
      contractData?.stNearprice,
      ntoy("1")
    );

    if (errorMsg) {
      setAlertMsg(errorMsg);
      return;
    }
    setHaveAllowance(userData?.stNearAllowance.gte(ntoy(inputValue)));
    setShowUnstakeModal(true);
  };

  useEffect(() => {
    if (contractData && !showUnstakeModal) {
      const finalAmountOut = getLiquidUnstakeAmounts(
        inputValue,
        userData?.stNearUserBalance,
        contractData?.wnearAvailable,
        contractData?.stNearprice,
        contractData?.wnearSwapFee
      );
      const liquidUnstakeFeeAsString = getLiquidUnstakeFeeAsString(
        contractData?.wnearSwapFee,
        finalAmountOut
      );
      setFee(contractData?.wnearSwapFee / 100);
      setFeeAsString(liquidUnstakeFeeAsString);
    }
  }, [contractData, inputValue]);

  return (
    <>
      <InfoContainer>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="black"
            fontSize="1.5em"
            fontWeight="500"
          >
            Ⓢ
          </InputLeftElement>
          <Input
            placeholder="stNear amount to unstake"
            type="number"
            id="unstakeInput"
            onChange={handleInputChange}
            value={inputValue}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement mx="5px" onClick={handleMaxClick}>
            <Text color="purple.500" cursor="pointer">
              Max
            </Text>
          </InputRightElement>
        </InputGroup>
        <Box mt="-10px">
          <AlertMsg
            alertMsg={alertMsg}
            setAlertMsg={setAlertMsg}
            type="warning"
          />
        </Box>
        <Skeleton isLoaded={contractData !== undefined}>
          {contractData && (
            <Text textAlign="center">
              {inputValue === "" || toNumber(inputValue) <= 0
                ? `Fee ${fee}%`
                : feeAsString}
            </Text>
          )}
        </Skeleton>
        <Button colorScheme="purple" onClick={handleUnstakeClick}>
          Liquid Unstake
        </Button>
        <Flex
          alignItems="center"
          justifyContent="center"
          columnGap="5px"
          cursor="default"
        >
          <Text>info</Text>
          <Tooltip label="Current liquid-unstaking fee. It varies according to the available liquidity supporting the liquid-unstake operation and the amount of mpETH you want to unstake.">
            <InfoIcon />
          </Tooltip>
        </Flex>
      </InfoContainer>
      {contractData && inputValue !== "" && showUnstakeModal && (
        <UnstakeModal
          inputValue={inputValue}
          setInputValue={setInputValue}
          setShowUnstakeModal={setShowUnstakeModal}
          showUnstakeModal={showUnstakeModal}
          haveAllowance={haveAllowance}
          fee={fee}
          feeAsString={feeAsString}
        />
      )}
    </>
  );
};
