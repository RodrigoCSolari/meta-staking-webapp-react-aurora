import { ethers } from "ethers";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  checkMaxAccountAmount,
  checkMinTxAmount,
} from "../../utils/unstakeHandlers";

export const checkTxErrorAmounts = (
  inputAmount: string,
  accountAmount: ethers.BigNumber,
  minAmount: ethers.BigNumber,
  txName: "Stake" | "Add" | "Remove"
) => {
  try {
    checkMinTxAmount(inputAmount, minAmount, txName);
    const balanceName = txName !== "Remove" ? "wNear Balance" : "Shared Value";
    checkMaxAccountAmount(accountAmount, inputAmount, balanceName);
  } catch (ex) {
    return getErrorMessage(ex);
  }
};
