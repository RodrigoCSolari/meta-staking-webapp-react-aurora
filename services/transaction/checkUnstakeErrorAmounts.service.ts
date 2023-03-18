import { BigNumber } from "ethers";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  checkMaxAccountAmount,
  checkMaxWithdrawalAvailable,
  checkMinUnstakeAmount,
} from "../../utils/unstakeHandlers";

export const checkUnstakeErrorAmounts = (
  inputAmount: string,
  accountAmount: BigNumber,
  withdrawalAvailable: BigNumber,
  stNearPrice: BigNumber,
  minDeposit: BigNumber
) => {
  try {
    checkMinUnstakeAmount(inputAmount, accountAmount, minDeposit);
    checkMaxAccountAmount(accountAmount, inputAmount, "stNear Balance");
    checkMaxWithdrawalAvailable(withdrawalAvailable, inputAmount, stNearPrice);
  } catch (ex) {
    return getErrorMessage(ex);
  }
};
