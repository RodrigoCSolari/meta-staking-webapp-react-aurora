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
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { ntoy, wtoeCommify, yton } from "../../lib/util";
import { useTxSuccessStore } from "../../stores/txSuccessStore";
import { useErrorMsgStore } from "../../stores/ErrorMsgStore";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { AlertMsg } from "../../components/AlertMsg";
import { getMaxStakeAmount } from "../../utils/unstakeHandlers";
import { InfoContainer } from "../../components/InfoContainer";
import { useQueryClient } from "react-query";
import { checkTxErrorAmounts } from "../../services/transaction/checkTxErrorAmounts.service";
import { useAccount, useSigner } from "wagmi";
import { DetailsLink } from "../../components/DetailsLink";
import { useGetUserData } from "../../hooks/useGetUserData";
import { BigNumber } from "ethers";
import { stake, wNearApprove } from "../../lib/metapool";
import { useGetContractData } from "../../hooks/useGetContractData";

export const StakeForm = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [loadingPermission, setLoadingPermission] = useState(false);
  const [loadingStake, setLoadingStake] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [haveAllowance, setHaveAllowance] = useState(false);

  const { setErrorMsg } = useErrorMsgStore();
  const { setTxSuccess } = useTxSuccessStore();

  const queryClient = useQueryClient();
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();

  const { data: userData } = useGetUserData();
  const { data: contractData } = useGetContractData();

  const handleMaxClick = () => {
    if (
      !isConnected ||
      userData?.wnearUserBalance === undefined ||
      loadingStake
    ) {
      return;
    }
    let maxStakeAmount = getMaxStakeAmount(userData.wnearUserBalance);
    setInputValue(yton(maxStakeAmount));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleStakeClick();
    }
  };

  const handlePermission = async () => {
    setErrorMsg("");
    setLoadingPermission(true);
    try {
      const resp = await wNearApprove(signer!);
      await resp.wait();
      await queryClient.refetchQueries();
      setTxSuccess({
        title: "Permission granted",
      });
    } catch (error) {
      const msg = getErrorMessage(error);
      setErrorMsg(msg);
    }
    setLoadingPermission(false);
  };

  const handleStakeClick = async () => {
    const errorMsg = checkTxErrorAmounts(
      inputValue,
      userData?.wnearUserBalance,
      BigNumber.from("1000000000000000000000000"),
      "Stake"
    );
    if (errorMsg) {
      setAlertMsg(errorMsg);
      return;
    }
    try {
      setLoadingStake(true);
      const resp = await stake(signer!, inputValue);
      await resp.wait();
      await queryClient.refetchQueries();
      setInputValue("");
      setTxSuccess({
        title: "Tokens Staked Successfully",
        description: <DetailsLink hash={resp.hash} />,
      });
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setErrorMsg(errorMsg);
    }
    setLoadingStake(false);
  };

  useEffect(() => {
    const inputValue = localStorage.getItem("disconnectInput");
    if (inputValue) {
      setInputValue(inputValue);
      localStorage.setItem("disconnectInput", "");
    }
  }, []);

  useEffect(() => {
    let value = inputValue ? inputValue : "0";
    setHaveAllowance(userData?.wnearAllowance.gte(ntoy(value)));
  }, [userData?.wnearAllowance, inputValue]);

  return (
    <InfoContainer>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="black"
          fontSize="1.5em"
          fontWeight="500"
        >
          Ⓝ
        </InputLeftElement>
        <Input
          placeholder="wNear amount"
          type="number"
          id="stakeInput"
          onChange={handleInputChange}
          value={inputValue}
          disabled={loadingStake}
          onKeyDown={handleKeyDown}
        />
        <InputRightElement
          mx="5px"
          onClick={handleMaxClick}
          cursor={loadingStake ? "not-allowed" : "pointer"}
        >
          <Text color="purple.500">Max</Text>
        </InputRightElement>
      </InputGroup>
      <Box mt="-10px">
        <AlertMsg
          alertMsg={alertMsg}
          setAlertMsg={setAlertMsg}
          type="warning"
        />
      </Box>
      <Skeleton isLoaded={userData !== undefined}>
        {haveAllowance ? (
          <Button
            w="100%"
            colorScheme="purple"
            onClick={handleStakeClick}
            isLoading={loadingStake}
            loadingText="Staking..."
            spinnerPlacement="end"
          >
            {"Stake"}
          </Button>
        ) : (
          <Button
            w="100%"
            colorScheme="yellow"
            onClick={handlePermission}
            isLoading={loadingPermission}
            loadingText="Waiting..."
            spinnerPlacement="end"
          >
            Give permission&nbsp;
            <Tooltip label="To continue, you need to allow Metapool smart contracts to use you wNear. This has to be done only once for each token">
              <InfoIcon color="blackAlpha.800" boxSize="14px" />
            </Tooltip>
          </Button>
        )}
      </Skeleton>
      <Skeleton isLoaded={contractData !== undefined}>
        <Flex
          alignItems="center"
          justifyContent="center"
          columnGap="5px"
          cursor="default"
        >
          <Text>info</Text>
          <Tooltip
            label={`When you stake wNEAR you get stNEAR tokens. stNEAR increases in value every 12hs as staking rewards are collected at the end of every epoch. You can unstake at any time and recover your wNEAR.`}
          >
            <InfoIcon />
          </Tooltip>
        </Flex>
      </Skeleton>
    </InfoContainer>
  );
};
