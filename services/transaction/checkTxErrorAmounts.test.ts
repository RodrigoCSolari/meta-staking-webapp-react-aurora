import { ntoy } from "../../lib/util";
import { checkTxErrorAmounts } from "./checkTxErrorAmounts.service";

describe("check if the amounts to stake are correct", () => {
  const minDeposit = ntoy("1");

  test("should return undefined", () => {
    const stakeInput = "1";
    const userAsset = ntoy("1");
    const txName = "Stake";
    const resp = checkTxErrorAmounts(stakeInput, userAsset, minDeposit, txName);
    expect(resp).toBe(undefined);
  });

  test("should return a string saying user liquidity is not enough", () => {
    const stakeInput = "1";
    const userAsset = ntoy("0.6");
    const txName = "Stake";
    const resp = checkTxErrorAmounts(stakeInput, userAsset, minDeposit, txName);
    expect(resp).toBe(`Your wNear Balance Is Not Enough`);
  });

  test("should return a string saying to remove the total", () => {
    const stakeInput = "0.1";
    const userAsset = ntoy("1");
    const txName = "Stake";
    const resp = checkTxErrorAmounts(stakeInput, userAsset, minDeposit, txName);
    expect(resp).toBe("Stake At Least 1.0 wNear");
  });
});
