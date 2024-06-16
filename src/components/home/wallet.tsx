import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useState } from "react";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { GrHistory } from "react-icons/gr";
import { IoCloseCircleOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RiTokenSwapLine } from "react-icons/ri";
import { SlOptions } from "react-icons/sl";

export default function Wallet() {
  const { user, handleLogOut } = useDynamicContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <main className="flex flex-col w-full items-center justify-center gap-2">
      <div className="relative flex items-center justify-between w-full text-neutral-700">
        <button>
          <IoCloseCircleOutline size={25} />
        </button>
        <span className="flex items-center gap-2 text-sm font-medium">
          <Image src="/starkBot.svg" alt="Stark Bot" width={15} height={15} />
          Stark Bot
        </span>
        <button
          onClick={() => {
            setIsOpen((prevIsOpen) => {
              return !prevIsOpen
            });
          }}
        >
          <SlOptions size={25} />
        </button>
        {isOpen && (
          <div className="flex flex-col absolute w-[8rem] items-start rounded-lg top-[1.5rem] right-0 bg-neutral-200 border border-neutral-300 z-50">
            <button className="flex w-full gap-2 p-2 hover:bg-neutral-300 items-center justify-start truncate">
              {user?.email}
            </button>
            <button
              className="flex w-full gap-2 p-2 hover:bg-neutral-300 items-center justify-start"
              onClick={() => {
                handleLogOut();
              }}
            >
              <LuLogOut /> Logout
            </button>
          </div>
        )}
      </div>
      <div className="my-5 text-center">
        <h3 className="text-neutral-600">Total balance</h3>
        <span className="text-neutral-800 text-4xl font-semibold">$ 20.00</span>
      </div>
      <div className="flex flex-row flex-wrap gap-7">
        <span className="flex flex-col gap-1 items-center">
          <GoArrowUpRight className="w-14 h-14 bg-stark p-3 rounded-full" />{" "}
          Send
        </span>
        <span className="flex flex-col gap-1 items-center">
          <GoArrowDownLeft className="w-14 h-14 bg-stark p-3 rounded-full" />{" "}
          Receive
        </span>
        <span className="flex flex-col gap-1 items-center">
          <RiTokenSwapLine className="w-14 h-14 bg-stark p-3 rounded-full" />{" "}
          Swap
        </span>
        <span className="flex flex-col gap-1 items-center">
          <GrHistory className="w-14 h-14 bg-stark p-3 rounded-full" /> History
        </span>
      </div>
    </main>
  );
}
