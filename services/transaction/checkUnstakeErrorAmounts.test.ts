import { parseUnits } from "ethers/lib/utils.js";
import { ntoy, yton } from "../../lib/util";
import { checkUnstakeErrorAmounts } from "./checkUnstakeErrorAmounts.service";

describe("check if the amounts to unstake are correct", () => {
  const minDeposit = ntoy("1");

  test("should return undefined", () => {
    const unstakeInput = "1";
    const userStnear = ntoy("1");
    const contractWnear = ntoy("1");
    const stNearPrice = ntoy("1");
    const resp = checkUnstakeErrorAmounts(
      unstakeInput,
      userStnear,
      contractWnear,
      stNearPrice,
      minDeposit
    );
    expect(resp).toBe(undefined);
  });

  test("should return a string saying user liquidity is not enough", () => {
    const unstakeInput = "1";
    const userStnear = ntoy("0.6");
    const contractWnear = ntoy("1");
    const stNearPrice = ntoy("1");
    const resp = checkUnstakeErrorAmounts(
      unstakeInput,
      userStnear,
      contractWnear,
      stNearPrice,
      minDeposit
    );
    expect(resp).toBe(`Your stNear Balance Is Not Enough`);
  });

  test("should return a string saying to remove the total", () => {
    const unstakeInput = "0.1";
    const userStnear = ntoy("0.5");
    const contractWnear = ntoy("1");
    const stNearPrice = ntoy("1");
    const resp = checkUnstakeErrorAmounts(
      unstakeInput,
      userStnear,
      contractWnear,
      stNearPrice,
      minDeposit
    );
    expect(resp).toBe("Unstake At Least 0.5 stNear");
  });

  test("should return a string saying what is the maximum stNear liquidity in the contract", () => {
    const unstakeInput = "1";
    const userStnear = ntoy("1");
    const contractWnear = ntoy("1");
    const stNearPrice = ntoy("1.1");
    const resp = checkUnstakeErrorAmounts(
      unstakeInput,
      userStnear,
      contractWnear,
      stNearPrice,
      minDeposit
    );
    const maxStNearLiquidity = yton(
      contractWnear.mul(ntoy("1")).div(stNearPrice)
    );
    expect(resp).toBe(
      `The Maximum Unstake At This Moment Is ${maxStNearLiquidity} stNear`
    );
  });
});
