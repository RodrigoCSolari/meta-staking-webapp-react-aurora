import { BigNumber } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils.js";
import { etow, ntoy, toNumber, wtoe, yton } from "../lib/util";

export function checkMinTxAmount(
  inputAmount: string,
  minAmount: BigNumber,
  txName: "Stake" | "Add" | "Remove"
) {
  const inputAmountBN = parseUnits(inputAmount || "0", 24);
  if (inputAmountBN.lt(minAmount) || inputAmountBN.lte(0)) {
    throw Error(`${txName} At Least ${yton(minAmount)} wNear`);
  }
}

export function checkMinUnstakeAmount(
  unstakeInput: string,
  accountAmount: BigNumber,
  minDeposit: BigNumber
) {
  const unstakeInputBN = parseUnits(unstakeInput || "0", 24);
  if (accountAmount.lt(minDeposit)) {
    throw Error(`Unstake At Least ${yton(accountAmount)} stNear`);
  } else {
    if (minDeposit.gt(unstakeInputBN))
      throw Error(`Unstake At Least ${yton(minDeposit)} stNear`);
  }
}

export function checkMaxAccountAmount(
  accountAmount: BigNumber,
  inputAmount: string,
  balanceName: "wNear Balance" | "stNear Balance" | "Shared Value"
) {
  const inputAmountBN = parseUnits(inputAmount, 24);
  if (accountAmount.lt(inputAmountBN)) {
    throw Error(`Your ${balanceName} Is Not Enough`);
  }
}

export function checkMaxWithdrawalAvailable(
  withdrawalAvailable: BigNumber,
  inputAmount: string,
  stNearPrice: BigNumber
) {
  const inputAmountBN = parseUnits(inputAmount, 24);
  const withdrawalAvailableInStNear = withdrawalAvailable
    .mul(ntoy("1"))
    .div(stNearPrice);
  if (withdrawalAvailableInStNear.lt(inputAmountBN)) {
    throw Error(
      `The Maximum Unstake At This Moment Is ${yton(
        withdrawalAvailableInStNear
      )} stNear`
    );
  }
}

export function getMaxWithdrawal(
  contractWnearBalance: BigNumber,
  stNearUserBalance: BigNumber,
  stNearPrice: BigNumber
) {
  const stNearLiquidity = contractWnearBalance.mul(ntoy("1")).div(stNearPrice);
  const maxWithdrawal = stNearUserBalance.lte(stNearLiquidity)
    ? stNearUserBalance
    : stNearLiquidity;
  return maxWithdrawal;
}

export function getMaxStakeAmount(wNearBalance: BigNumber) {
  let maxStakeAmount = wNearBalance.sub(parseUnits("0.01", 24)); //subtract one cent .- leave something for fee & storage
  if (maxStakeAmount.lt(0)) {
    maxStakeAmount = BigNumber.from(0);
  }
  return maxStakeAmount;
}

export const getLiquidUnstakeAmounts = (
  inputValue: string,
  stNearUserBalance: BigNumber,
  wNearBalance: BigNumber,
  stNearPrice: BigNumber,
  fee: number
) => {
  if (inputValue === "" || toNumber(inputValue) <= 0) {
    return BigNumber.from(0);
  }
  const amountToWnear = stNearPrice
    .mul(ntoy(inputValue))
    .div(ntoy("1"))
    .mul(10000 - fee)
    .div(10000);
  if (
    wNearBalance.lt(amountToWnear) ||
    stNearUserBalance.lt(ntoy(inputValue))
  ) {
    return BigNumber.from(0);
  }
  return amountToWnear.sub(fee);
};

export const getLiquidUnstakeFeeAsString = (
  fee: number,
  finalAmountOut: BigNumber
) => {
  if (finalAmountOut.gt(0)) {
    return `Fee ${fee / 100}% - You Receive ${yton(finalAmountOut)} wNear`;
  } else {
    return `Fee ${fee / 100}% - Not enough Liquidity`;
  }
};

export const getPoolMpETHPercentage = (
  contractEthersBalance: BigNumber,
  totalAssets: BigNumber
) => {
  if (totalAssets.eq(0)) {
    return 0;
  }
  return (
    BigNumber.from(10000)
      .sub(contractEthersBalance.mul(10000).div(totalAssets))
      .toNumber() / 100
  );
};

export const getPoolETHPercentage = (
  contractEthersBalance: BigNumber,
  totalAssets: BigNumber
) => {
  if (totalAssets.eq(0)) {
    return 0;
  }
  return contractEthersBalance.mul(10000).div(totalAssets).toNumber() / 100;
};
