import { ethers } from "ethers";

export const REFETCH_INTERVAL = 30000;
export const SECONDS = 1000;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const MAX_UINT_256 = ethers.BigNumber.from(2).pow(256).sub(1);
