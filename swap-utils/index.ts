import {
  fetchQuotes,
  executeSwap,
  QuoteRequest,
  fetchTokens,
  PriceRequest,
  fetchPrices,
  Quote,
  fetchBuildExecuteTransaction,
} from "@avnu/avnu-sdk";
import { writeFileSync } from "fs";

import { Account, RpcProvider } from "starknet";
import tokens from "../tokens.json";

// initialize provider
const provider = new RpcProvider({
  nodeUrl: "https://starknet-mainnet.public.blastapi.io",
});
// initialize existing pre-deployed account 0 of Devnet
const privateKey = "0xe3e70682c2094cac629f6fbed82c07cd";
const accountAddress =
  "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";

const account = new Account(provider, accountAddress, privateKey);

const ethTokenAddress = tokens.content[0].address;
const daiTokenAddress = tokens.content[1].address;

const fetchPriceParams = {
  sellTokenAddress: ethTokenAddress,
  buyTokenAddress: daiTokenAddress,
  sellAmount: BigInt(1e18),
} as unknown as PriceRequest;

try {
  const prices = await fetchPrices(fetchPriceParams);

  const fetchQuoteParams = {
    sellTokenAddress: ethTokenAddress,
    buyTokenAddress: daiTokenAddress,
    sellAmount: BigInt(1e18),
  } as unknown as QuoteRequest;

  const quote: any = await fetchQuotes(fetchQuoteParams);
  console.log(quote);
  const quoteID = quote[0].quoteId;
  console.log(quoteID);
  const buildTransaction = await fetchBuildExecuteTransaction(
    quoteID,
    accountAddress
  );
  console.log(buildTransaction);
} catch (error) {
  console.log(error);
}
