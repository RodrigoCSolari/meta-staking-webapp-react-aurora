import { Container, Center, Heading, VStack, Text } from "@chakra-ui/react";
import { UserStats } from "./UserStats";
import { TokenData } from "./TokenData";
import { DisconnectedPage } from "../../components/DisconnectedPage";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Unstake = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    router.push("/");
    return (
      <>
        <DisconnectedPage title="My Account"></DisconnectedPage>
      </>
    );
  }

  return (
    <Container maxW="container.lg" className="flex">
      <Center>
        <VStack mb="20px" rowGap="10px">
          <Heading
            as="h1"
            color="#0F172A"
            textAlign="center"
            fontWeight="500"
            fontSize="2em"
            my="10px"
          >
            My Account
          </Heading>

          <UserStats />
          <Text>MetaPoolETH Token</Text>
          <TokenData />
        </VStack>
      </Center>
    </Container>
  );
};

export default Unstake;
