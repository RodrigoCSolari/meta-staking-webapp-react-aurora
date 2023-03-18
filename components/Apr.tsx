import { InfoIcon } from "@chakra-ui/icons";
import { Flex, FlexProps, Text, Tooltip } from "@chakra-ui/react";
import React from "react";

type Props = FlexProps & {
  data: string;
  tooltip?: string;
};

export const Apr = ({ data, tooltip, ...props }: Props) => {
  return (
    <Flex
      border="6px solid #A855F7"
      borderRadius="50%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Text>APR</Text>

      <Text fontSize="2xl">{`${data}%`}</Text>
      {tooltip && (
        <Tooltip label={tooltip} textAlign="center">
          <InfoIcon color="blackAlpha.800" boxSize="14px" />
        </Tooltip>
      )}
    </Flex>
  );
};
