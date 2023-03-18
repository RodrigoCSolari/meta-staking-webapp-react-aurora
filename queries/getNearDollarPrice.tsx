import { NearDollarPrice } from "./getNearDollarPrice.types";

export const getNearDollarPrice = async () => {
  let response = await fetch("https://api.diadata.org/v1/quotation/NEAR");
  let data: NearDollarPrice = await response.json();
  return data.Price;
};
