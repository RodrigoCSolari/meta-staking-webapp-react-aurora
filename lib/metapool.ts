import { BigNumber, ethers } from "ethers";
import {
  contractMethods,
  stNearMethods,
  swapMethods,
  wNearMethods,
} from "./methods";
import { callChangeMethod, callViewMethod } from "./ethereum";
import { etow, ntoy } from "./util";
import { getConfig } from "../config";
import { MAX_UINT_256 } from "../constants";

const config = getConfig();

export const wNearApprove = (signer: ethers.Signer) => {
  return callChangeMethod(
    wNearMethods.approve,
    [config.swapAddress, MAX_UINT_256],
    etow("0"),
    signer!,
    config.wNearAddress,
    config.wNearAbi
  );
};

export const stNearApprove = (signer: ethers.Signer) => {
  return callChangeMethod(
    stNearMethods.approve,
    [config.swapAddress, MAX_UINT_256],
    etow("0"),
    signer!,
    config.stNearAddress,
    config.stNearAbi
  );
};

export const stake = (signer: ethers.Signer, depositValue: string) => {
  return callChangeMethod(
    swapMethods.swapwNEARForstNEAR,
    [ntoy(depositValue)],
    etow("0"),
    signer!,
    config.swapAddress,
    config.swapAbi
  );
};

export const unstake = (signer: ethers.Signer, withdrawValue: string) => {
  return callChangeMethod(
    swapMethods.swapstNEARForwNEAR,
    [ntoy(withdrawValue)],
    etow("0"),
    signer!,
    config.swapAddress,
    config.swapAbi
  );
};

export const getContractData = async (provider: ethers.providers.Provider) => {
  const callViewStNearConfig = {
    provider,
    contractAddress: config.stNearAddress,
    abi: config.stNearAbi,
  };
  const callViewSwapConfig = {
    provider,
    contractAddress: config.swapAddress,
    abi: config.swapAbi,
  };
  const callViewWNearConfig = {
    provider,
    contractAddress: config.wNearAddress,
    abi: config.wNearAbi,
  };
  let [
    stNearAvailable,
    wnearAvailable,
    stNearprice,
    wnearSwapFee,
    stNearSwapFee,
  ] = await Promise.all([
    callViewMethod(
      stNearMethods.balanceOf,
      [config.swapAddress],
      callViewStNearConfig
    ),
    callViewMethod(
      wNearMethods.balanceOf,
      [config.swapAddress],
      callViewWNearConfig
    ),
    callViewMethod(contractMethods.stNearPrice, [], callViewSwapConfig),
    callViewMethod(contractMethods.wNearSwapFee, [], callViewSwapConfig),
    callViewMethod(contractMethods.stNearSwapFee, [], callViewSwapConfig),
  ]);

  return {
    stNearAvailable,
    wnearAvailable,
    stNearprice,
    wnearSwapFee,
    stNearSwapFee,
  };
};

export const getUserData = async (
  provider: ethers.providers.Provider,
  address = "0x0000000000000000000000000000000000000000"
) => {
  const callViewStNearConfig = {
    provider,
    contractAddress: config.stNearAddress,
    abi: config.stNearAbi,
  };
  const callViewWNearConfig = {
    provider,
    contractAddress: config.wNearAddress,
    abi: config.wNearAbi,
  };
  let [stNearAllowance, wnearAllowance, stNearUserBalance, wnearUserBalance] =
    await Promise.all([
      callViewMethod(
        stNearMethods.allowance,
        [address, config.swapAddress],
        callViewStNearConfig
      ),
      callViewMethod(
        wNearMethods.allowance,
        [address, config.swapAddress],
        callViewWNearConfig
      ),
      callViewMethod(stNearMethods.balanceOf, [address], callViewStNearConfig),
      callViewMethod(wNearMethods.balanceOf, [address], callViewWNearConfig),
    ]);

  return {
    stNearAllowance,
    wnearAllowance,
    stNearUserBalance,
    wnearUserBalance,
  };
};
