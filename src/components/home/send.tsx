/* eslint-disable @next/next/no-img-element */
import { GlobalContext, Thread } from "@/context";
import { tokens } from "@/utils";
import { useContext, useState } from "react";

interface Token {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  chainId: string;
  logoUri: string;
}

export default function Send() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [token, setToken] = useState<Token>({
    name: "",
    address: "",
    symbol: "",
    decimals: 0,
    chainId: "",
    logoUri: "",
  });
  const { thread, setThread } = useContext(GlobalContext);

  const filteredTokens = tokens.filter((token) =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      {thread === "ONE" && (
        <div className='flex flex-col w-full items-center justify-start gap-5 my-5'>
          <input
            type='text'
            className='w-full px-5 py-3 border border-neutral-300 rounded-xl focus:outline-none'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='flex flex-col w-full items-center justify-center gap-2.5'>
            {filteredTokens.map((token, key) => (
              <button
                className='flex items-center w-full px-5 py-3 gap-4 bg-neutral-200/90 backdrop-blur-md border border-neutral-300 rounded-xl'
                key={key}
                onClick={() => {
                  setToken(token);
                  setThread(Thread.TWO);
                }}
              >
                <img
                  className='rounded-full object-cover'
                  src={token.logoUri}
                  width={40}
                  height={40}
                  alt='tokenLogo'
                />
                <span className='flex flex-col items-start'>
                  <h3 className='font-medium text-indigo-500'>{token.name}</h3>
                  <p className='text-sm text-neutral-500'>
                    {token.symbol === "DAI"
                      ? "20"
                      : token.symbol === "ETH"
                      ? "0.01"
                      : "0"}{" "}
                    {token.symbol}
                  </p>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      {thread === "TWO" && (
        <div className='flex flex-col w-full h-full gap-[5rem] items-center justify-between my-5'>
          <div className='flex flex-col w-full items-center justify-center gap-8'>
            <h1 className='text-xl font-semibold'>Send {token.name}</h1>
            <img
              className='rounded-full object-cover shadow-md'
              src={token.logoUri}
              width={60}
              height={60}
              alt='tokenLogo'
            />
            <div className='flex flex-col w-full items-center justify-center gap-3'>
              <input
                type='text'
                className='w-full px-5 py-3 border border-neutral-300 rounded-xl focus:outline-none'
                placeholder='Recipient Address'
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
              <span className='flex items-center justify-between w-full px-5 py-2 gap-3 bg-white border border-neutral-300 rounded-xl'>
                <input
                  type='number'
                  className='w-full h-full bg-transparent focus:outline-none'
                  placeholder='Amount'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button className='w-fit px-5 py-1 rounded-2xl bg-neutral-200/50 text-neutral-600'>
                  Max
                </button>
              </span>
              <span className='flex w-full items-center justify-between text-sm px-2 text-neutral-500'>
                <p>
                  $
                  {token.symbol === "DAI"
                    ? "20"
                    : token.symbol === "ETH"
                    ? "347.23"
                    : "0"}{" "}
                </p>
                <p>
                  Available:{" "}
                  {token.symbol === "DAI"
                    ? "20"
                    : token.symbol === "ETH"
                    ? "0.01"
                    : "0"}{" "}
                  {token.symbol}
                </p>
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
              onClick={() => setThread(Thread.THREE)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {thread === "THREE" && (
        <div className='flex flex-col w-full h-full gap-[2rem] items-center justify-between my-3'>
          <div className='flex flex-col w-full items-center justify-center gap-6'>
            <h1 className='text-xl font-semibold'>Confirm Send</h1>
            <img
              className='rounded-full object-cover shadow-md'
              src={token.logoUri}
              width={60}
              height={60}
              alt='tokenLogo'
            />
            <span className='flex flex-col gap-1'>
              <h1 className='text-3xl font-medium'>
                {amount} {token.symbol}
              </h1>
              <p className='text-sm text-neutral-500'>to 0xoG...4kfm</p>{" "}
              {/* TODO: FORMAT ADDRESS FUNC */}
            </span>
            <div className='flex flex-col w-full items-center justify-center gap-[2px] my-3'>
              <span className='flex w-full items-center justify-between py-2 px-4 bg-neutral-200 rounded-t-xl'>
                <p className='text-neutral-500'>To</p>
                <p>Owner (0xoG...4kfm)</p>
              </span>
              <span className='flex w-full items-center justify-between py-2 px-4 bg-neutral-200'>
                <p className='text-neutral-500'>Network</p>
                <p>Starknet Mainnet</p>
              </span>
              <span className='flex w-full items-center justify-between py-2 px-4 bg-neutral-200 rounded-b-xl'>
                <p className='text-neutral-500'>Network Fee</p>
                <p>$0.0020</p>
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
