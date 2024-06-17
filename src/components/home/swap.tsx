import { useState } from "react";
import { RiTokenSwapLine } from "react-icons/ri";
import Dropdown from "../shared/dropdown";
import { tokens } from "@/utils";
import { LiaExchangeAltSolid } from "react-icons/lia";

export default function Swap() {
  const [amount, setAmount] = useState<number>();
  const [selectedToken1, setSelectedToken1] = useState<string | null>(null);
  const [selectedToken2, setSelectedToken2] = useState<string | null>(null);

  const handleSelectToken1 = (token: string) => {
    setSelectedToken1(token);
    if (token === selectedToken2) setSelectedToken2(null);
  };

  const handleSelectToken2 = (token: string) => {
    setSelectedToken2(token);
    if (token === selectedToken1) setSelectedToken1(null);
  };

  const handleSwapTokens = () => {
    setSelectedToken1(selectedToken2);
    setSelectedToken2(selectedToken1);
  };

  const filteredTokens1 = tokens.filter(
    (token) => token.symbol !== selectedToken2
  );
  const filteredTokens2 = tokens.filter(
    (token) => token.symbol !== selectedToken1
  );

  return (
    <div className="flex flex-col items-center justify-start gap-5 my-5 z-10">
      <span className="flex items-center gap-3">
        <RiTokenSwapLine className="w-8 h-8 text-neutral-700" />
        <h1 className="text-2xl text-neutral-700">Swap</h1>
      </span>
      <div className="flex flex-col w-full bg-blue-400 bg-opacity-30 border border-blue-400/60 text-white backdrop-blur-md p-3.5 rounded-xl gap-1 shadow relative z-20">
        <span className="flex flex-row items-center justify-start gap-3 bg-blue-400 rounded-xl">
          <input
            type="number"
            placeholder="0"
            className="w-3/4 py-2 px-4 bg-transparent border-none focus:outline-none placeholder:text-neutral-200"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Dropdown
            filteredTokens={filteredTokens1}
            selectedToken={selectedToken1}
            onSelect={handleSelectToken1}
            className="bg-blue-400"
          />
        </span>
        <p className="px-2 text-neutral-500 text-sm">0 USD</p>
      </div>
      <button onClick={handleSwapTokens}>
        <LiaExchangeAltSolid size={25} className="text-neutral-600 rotate-90" />
      </button>
      <div className="flex flex-col w-full bg-violet-400 bg-opacity-30 border border-blue-violet/60 text-white backdrop-blur-md p-3.5 rounded-xl gap-1 shadow relative">
        <span className="flex flex-row items-center justify-start gap-3 bg-violet-400 rounded-xl">
          <input
            type="number"
            placeholder="0"
            readOnly
            className="w-3/4 py-2 px-4 bg-transparent border-none focus:outline-none placeholder:text-neutral-200"
            value={20}
          />
          <Dropdown
            filteredTokens={filteredTokens2}
            selectedToken={selectedToken2}
            onSelect={handleSelectToken2}
            className="bg-violet-400"
          />
        </span>
        <p className="px-2 text-neutral-500 text-sm">0 USD</p>
      </div>
      <button className="my-3 w-full bg-stark/80 hover:bg-stark text-neutral-700 font-medium py-2.5 px-5 rounded-xl">
        Swap Token
      </button>
    </div>
  );
}
