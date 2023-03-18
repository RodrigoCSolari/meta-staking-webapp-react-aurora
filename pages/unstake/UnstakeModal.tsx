import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { commify } from "ethers/lib/utils.js";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useSigner } from "wagmi";
import { AlertMsg } from "../../components/AlertMsg";
import { DetailsLink } from "../../components/DetailsLink";
import { stNearApprove, unstake } from "../../lib/metapool";
import { useTxSuccessStore } from "../../stores/txSuccessStore";
import { getErrorMessage } from "../../utils/getErrorMessage";

type Props = {
  showUnstakeModal: boolean;
  setShowUnstakeModal: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  haveAllowance: boolean;
  fee: number;
  feeAsString: string;
};

export const UnstakeModal = ({
  showUnstakeModal,
  setShowUnstakeModal,
  inputValue,
  setInputValue,
  haveAllowance,
  fee,
  feeAsString,
}: Props) => {
  const [closeEnabled, setcloseEnabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);

  const { setTxSuccess } = useTxSuccessStore();
  const { data: signer } = useSigner();

  const queryClient = useQueryClient();

  const handleOnClose = () => {
    if (closeEnabled) {
      setErrorMsg("");
      setShowUnstakeModal(false);
    }
  };

  const handlePermission = async () => {
    setcloseEnabled(false);
    setErrorMsg("");

    try {
      const resp = await stNearApprove(signer!);
      await resp.wait();
      await queryClient.refetchQueries();
      setPermissionGranted(true);
      setTxSuccess({
        title: "Permission granted",
      });
    } catch (error) {
      const msg = getErrorMessage(error);
      setErrorMsg(msg);
      setcloseEnabled(true);
      return;
    }

    setcloseEnabled(true);
  };

  const handleUnstake = async () => {
    setcloseEnabled(false);
    setErrorMsg("");

    try {
      const resp = await unstake(signer!, inputValue);
      await resp.wait();
      await queryClient.refetchQueries();
      setTxSuccess({
        title: "Tokens unstaked successfully",
        description: <DetailsLink hash={resp.hash} />,
      });
    } catch (error) {
      const msg = getErrorMessage(error);
      setErrorMsg(msg);
      setcloseEnabled(true);
      return;
    }

    setcloseEnabled(true);
    setInputValue("");
    handleOnClose();
  };

  return (
    <Modal
      isOpen={showUnstakeModal}
      onClose={handleOnClose}
      closeOnEsc={closeEnabled}
      closeOnOverlayClick={closeEnabled}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Liquid Unstake</ModalHeader>
        <ModalCloseButton display={closeEnabled ? undefined : "none"} />

        <>
          <ModalBody>
            <Text textAlign="center">{`unstake ${commify(
              inputValue
            )} stNear`}</Text>
            {<Text textAlign="center">{feeAsString}</Text>}
            <AlertMsg
              alertMsg={errorMsg}
              setAlertMsg={setErrorMsg}
              type="error"
              isClosable
              time={Infinity}
            />
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Text>Slippage: 1%</Text>
            <Flex>
              {haveAllowance || permissionGranted ? (
                <Button
                  colorScheme="purple"
                  mr={3}
                  onClick={handleUnstake}
                  isLoading={!closeEnabled}
                  loadingText="Unstaking..."
                  spinnerPlacement="end"
                >
                  Unstake
                </Button>
              ) : (
                <Button
                  colorScheme="yellow"
                  mr={3}
                  onClick={handlePermission}
                  isLoading={!closeEnabled}
                  loadingText="Waiting..."
                  spinnerPlacement="end"
                >
                  Give permission&nbsp;
                  <Tooltip label="To continue, you need to allow Metapool smart contracts to use your stNear. This has to be done only once for each token">
                    <InfoIcon color="blackAlpha.800" boxSize="14px" />
                  </Tooltip>
                </Button>
              )}
              <Button
                color="purple.500"
                variant="outline"
                mr={3}
                onClick={handleOnClose}
                disabled={!closeEnabled}
              >
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
