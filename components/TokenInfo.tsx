import { InfoIcon } from "@chakra-ui/icons";
import {
  ComponentWithAs,
  Flex,
  Img,
  ImgProps,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";

type Props = {
  description: string;
  tooltip?: string;
  amount?: string;
  symbol?: string;
  imgPath?: string;
  dollarAmount?: string;
};

const TokenInfo = ({
  description,
  tooltip,
  amount,
  symbol,
  imgPath,
  dollarAmount,
}: Props) => {
  return (
    <Flex justifyContent="space-between">
      <Flex alignItems="center" columnGap="5px">
        <Text fontSize="0.85em">{description}</Text>
        {tooltip && (
          <Tooltip label={tooltip}>
            <InfoIcon color="blackAlpha.500" boxSize="12px" />
          </Tooltip>
        )}
      </Flex>
      <Flex flexDirection="column" alignItems="end">
        <Flex>
          <Text>{amount}</Text>
          {imgPath ? (
            <Img w="1.5em" h="1.5em" ml="5px" src={imgPath} />
          ) : symbol ? (
            <Text w="1.5em" textAlign="center">
              {symbol}
            </Text>
          ) : (
            <Spacer w=".5em" />
          )}
        </Flex>
        {dollarAmount && (
          <Flex>
            <Text fontSize=".8em" color="purple.800">
              {dollarAmount}
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
        )}
      </Flex>
    </Flex>
  );
};

export default TokenInfo;
