/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Token {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  chainId: string;
  logoUri: string;
}

interface DropdownProps {
  filteredTokens: Token[];
  selectedToken: {
    symbol: string;
    address: string;
  } | null;
  onSelect: (symbol: string, address: string, logoUri: string) => void;
  className: string;
}

export default function Dropdown({
  filteredTokens,
  selectedToken,
  onSelect,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className='relative'>
      <button
        className={
          "flex py-2 px-4 items-center justify-center gap-2 rounded-xl shadow-lg " +
          className
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken?.symbol || "Select"}
        <FaChevronDown size={15} className={`${isOpen && "rotate-180"}`} />
      </button>
      {isOpen && (
        <div className='absolute top-full right-0 flex flex-col z-50 mt-2 w-[20rem] max-h-[13rem] border border-neutral-200 bg-white bg-opacity-90 text-neutral-800 backdrop-blur-lg rounded-xl shadow-lg scroll-smooth scrollbar'>
          {filteredTokens.map((token, idx: number) => (
            <button
              key={idx}
              className='flex flex-row gap-3 hover:bg-neutral-200 items-center w-full px-5 py-2'
              onClick={() => {
                onSelect(token.symbol, token.address, token.logoUri);
                setIsOpen(false);
              }}
            >
              <img
                alt={token.name}
                src={token.logoUri}
                className='w-6 h-6 rounded-xl object-cover'
              />
              {token.symbol}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
