import { useContext, useEffect, useMemo, useState } from "react";
import { RiTokenSwapLine } from "react-icons/ri";
import Dropdown from "../shared/dropdown";
import { tokens } from "@/utils";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { getQuote } from "../../../swap-utils";
import { formatEther, parseEther, parseGwei } from "viem";
import { GlobalContext, Thread } from "@/context";

export default function Swap() {
  const [amount, setAmount] = useState<number>(0);
  const [selectedToken1, setSelectedToken1] = useState<{
    address: string;
    symbol: string;
    logoUri: string;
  }>({
    address:
      "0x5574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad",
    symbol: "DAI",
    logoUri:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  });
  const [selectedToken2, setSelectedToken2] = useState<{
    address: string;
    symbol: string;
    logoUri: string;
  }>({
    address:
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    symbol: "ETH",
    logoUri:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  });

  const [buyAmount, setBuyAmount] = useState<number>(0);
  const [sellAmountInUSD, setSellAmountInUSD] = useState<string>("0");
  const [buyAmountInUSD, setBuyAmountInUSD] = useState<string>("0");
  const [gasFees, setGasFees] = useState<string>("0");

  const { thread, setThread } = useContext(GlobalContext);

  const handleSelectToken1 = (
    symbol: string,
    address: string,
    logoUri: string
  ) => {
    setSelectedToken1({ symbol, address, logoUri });
    if (address === selectedToken2?.address)
      setSelectedToken2({
        address:
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        symbol: "ETH",
        logoUri:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
      });
  };

  const handleSelectToken2 = (
    symbol: string,
    address: string,
    logoUri: string
  ) => {
    setSelectedToken2({ symbol, address, logoUri });
    if (address === selectedToken1?.address)
      setSelectedToken1({
        address:
          "0x5574eb6b8789a91466f902c380d978e472db68170ff82a5b650b95a58ddf4ad",
        symbol: "DAI",
        logoUri:
          "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
      });
  };

  useEffect(() => {
    if (!amount || !selectedToken1 || !selectedToken2) return;
    getQuote(
      selectedToken1.address,
      selectedToken2.address,
      parseEther(amount.toString())
    ).then((quote: any) => {
      console.log("quote", quote.quote);
      console.log(
        "quote.quote[0].sellAmountInUSD",
        quote.quote[0].sellAmountInUsd
      );
      setBuyAmount(parseFloat(formatEther(BigInt(quote.quote[0].buyAmount))));
      setSellAmountInUSD(quote.quote[0].sellAmountInUsd);
      setBuyAmountInUSD(quote.quote[0].buyAmountInUsd);
      setGasFees(quote.quote[0].gasFees);
    });
  }, [amount]);

  const handleSwapTokens = () => {
    setSelectedToken1(selectedToken2);
    setSelectedToken2(selectedToken1);
  };

  const filteredTokens1 = tokens.filter(
    (token) => token.address !== selectedToken2?.address
  );
  const filteredTokens2 = tokens.filter(
    (token) => token.address !== selectedToken1?.address
  );

  return (
    <>
      {thread === "ONE" && (
        <div className='flex flex-col items-center justify-start gap-5 my-5 z-10'>
          <span className='flex items-center gap-3'>
            <RiTokenSwapLine className='w-8 h-8 text-neutral-700' />
            <h1 className='text-2xl text-neutral-700'>Swap</h1>
          </span>
          <div className='flex flex-col w-full bg-blue-400 bg-opacity-30 border border-blue-400/60 text-white backdrop-blur-md p-3.5 rounded-xl gap-1 shadow relative z-20'>
            <span className='flex flex-row items-center justify-start gap-3 bg-blue-400 rounded-xl'>
              <input
                type='number'
                placeholder='0'
                className='w-3/4 py-2 px-4 bg-transparent border-none focus:outline-none placeholder:text-neutral-200'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <Dropdown
                filteredTokens={filteredTokens1}
                selectedToken={selectedToken1}
                onSelect={handleSelectToken1}
                className='bg-blue-400'
              />
            </span>
            <p className='px-2 text-neutral-500 text-sm'>
              {sellAmountInUSD.toString()} USD
            </p>
          </div>
          <button onClick={handleSwapTokens}>
            <LiaExchangeAltSolid
              size={25}
              className='text-neutral-600 rotate-90'
            />
          </button>
          <div className='flex flex-col w-full bg-violet-400 bg-opacity-30 border border-blue-violet/60 text-white backdrop-blur-md p-3.5 rounded-xl gap-1 shadow relative'>
            <span className='flex flex-row items-center justify-start gap-3 bg-violet-400 rounded-xl'>
              <input
                type='number'
                placeholder='0'
                readOnly
                className='w-3/4 py-2 px-4 bg-transparent border-none focus:outline-none placeholder:text-neutral-200'
                value={buyAmount.toFixed(5)}
              />
              <Dropdown
                filteredTokens={filteredTokens2}
                selectedToken={selectedToken2}
                onSelect={handleSelectToken2}
                className='bg-violet-400'
              />
            </span>
            <p className='px-2 text-neutral-500 text-sm'>
              {buyAmountInUSD} USD
            </p>
          </div>
          <button
            className='my-3 w-full bg-stark/80 hover:bg-stark text-neutral-700 font-medium py-2.5 px-5 rounded-xl'
            onClick={async () => {
              setThread(Thread.TWO);
            }}
          >
            Swap Token
          </button>
        </div>
      )}
      {thread === "TWO" && (
        <div className='flex flex-col w-full h-full gap-[2rem] items-center justify-between my-3'>
          <div className='flex flex-col w-full items-center justify-center gap-6'>
            <h1 className='text-xl font-semibold'>Confirm Swap</h1>
            <img
              className='rounded-full object-cover shadow-md'
              src={selectedToken2.logoUri}
              width={60}
              height={60}
              alt='tokenLogo'
            />
            <span className='flex flex-col gap-1'>
              <h1 className='text-3xl font-medium'>
                + {buyAmount.toFixed(5)} {selectedToken2.symbol}
              </h1>
              {/* TODO: FORMAT ADDRESS FUNC */}
            </span>
            <div className='flex flex-col w-full items-center justify-center gap-[2px] my-3'>
              <span className='flex w-full items-center justify-between py-2 px-4 bg-neutral-200 rounded-t-xl'>
                <p className='text-neutral-500'>Swap</p>
                <p>
                  - {amount} {selectedToken1.symbol}
                </p>
              </span>
              <span className='flex w-full items-center justify-between py-2 px-4 bg-neutral-200'>
                <p className='text-neutral-500'>Network</p>
                <p>Starknet Mainnet</p>
              </span>
              <span className='flex w-full items-center justify-between py-2 px-4 bg-neutral-200 rounded-b-xl'>
                <p className='text-neutral-500'>Network Fee</p>
                <p>${gasFees}</p>
              </span>
            </div>
          </div>
          <div className='flex w-full items-center justify-between gap-5'>
            <button
              className='w-full px-5 py-3 bg-stark opacity-70 hover:opacity-100 rounded-xl'
              onClick={() => setThread(Thread.ONE)}
            >
              Cancel
            </button>
            <button
              className='w-full px-5 py-3 bg-stark/90 hover:bg-stark rounded-xl'
              onClick={() => {}}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
