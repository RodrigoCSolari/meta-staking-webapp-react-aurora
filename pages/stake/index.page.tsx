import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Center,
  Heading,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  SkeletonCircle,
  Img,
  Text,
} from "@chakra-ui/react";
import { Apr } from "../../components/Apr";
import { UserStats } from "./UserStats";
import { MetapoolStats } from "./MetapoolStats";
import { InfoContainer } from "../../components/InfoContainer";
import { StakeForm } from "./StakeForm";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useGetMetrics } from "../../hooks/useGetMetrics";
import { getApr, toStringDec2 } from "../../lib/util";
import { useGetContractData } from "../../hooks/useGetContractData";
import { useGetNearDollarPrice } from "../../hooks/useGetNearDollarPrice";

const Stake = () => {
  const { isConnected, address } = useAccount();
  const [DisconnectInput, setDisconnectInput] = useState("");
  const { openConnectModal } = useConnectModal();
  const { data: metrics } = useGetMetrics();

  const handleSignIn = () => {
    if (DisconnectInput) {
      localStorage.setItem("disconnectInput", DisconnectInput);
    }
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  const handleDisconnectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisconnectInput(e.target.value);
  };

  useEffect(() => {
    if (!address) {
      localStorage.setItem("disconnectInput", "");
    }
  }, []);

  return (
    <>
      <Container maxW="container.lg" className="flex">
        <Center>
          <VStack mb="20px" rowGap="10px">
            <SkeletonCircle boxSize="120px" isLoaded={metrics !== undefined}>
              {metrics && (
                <Apr
                  data={toStringDec2(metrics.st_near_30_day_apy)}
                  boxSize="120px"
                  tooltip="APR is based on the 30 day average price of stNEAR."
                />
              )}
            </SkeletonCircle>
            <Heading
              as="h1"
              color="#0F172A"
              textAlign="center"
              fontSize="2em"
              fontWeight="500"
            >
              Stake wNEAR, get stNEAR
            </Heading>

            {!isConnected ? (
              <InfoContainer>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="black"
                    fontSize="1.5em"
                    fontWeight="500"
                  >
                    <Img w="1em" h="1em" src="./Ether.png" />
                  </InputLeftElement>
                  <Input
                    placeholder="ETH amount"
                    type="number"
                    id="stakeInput"
                    onKeyDown={handleKeyDown}
                    value={DisconnectInput}
                    onChange={handleDisconnectInput}
                  />
                </InputGroup>
                <Button colorScheme="purple" onClick={handleSignIn}>
                  Choose A Wallet To Stake
                </Button>
              </InfoContainer>
            ) : (
              <>
                <StakeForm />
                {<UserStats />}
              </>
            )}
            <Text>MetaPool Stats</Text>
            <MetapoolStats />
          </VStack>
        </Center>
      </Container>
    </>
  );
};

export default Stake;
