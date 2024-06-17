import { GlobalContext, State } from "@/context";
import { useContext } from "react";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { GrHistory } from "react-icons/gr";
import { RiTokenSwapLine } from "react-icons/ri";

export default function Home() {
  const { setWalletState } = useContext(GlobalContext);
  return (
    <>
      <div className="my-8 text-center">
        <h3 className="text-neutral-600">Total balance</h3>
        <span className="text-neutral-800 text-5xl font-semibold">$ 20.00</span>
      </div>
      <div className="flex flex-row flex-wrap gap-7">
        <button className="flex flex-col gap-1 items-center">
          <GoArrowUpRight className="w-12 h-12 bg-stark p-3 rounded-full" />{" "}
          Send
        </button>
        <button className="flex flex-col gap-1 items-center">
          <GoArrowDownLeft className="w-12 h-12 bg-stark p-3 rounded-full" />{" "}
          Receive
        </button>
        <button
          className="flex flex-col gap-1 items-center"
          onClick={() => {
            setWalletState(State.SWAP);
          }}
        >
          <RiTokenSwapLine className="w-12 h-12 bg-stark p-3 rounded-full" />{" "}
          Swap
        </button>
        <button className="flex flex-col gap-1 items-center">
          <GrHistory className="w-12 h-12 bg-stark p-3 rounded-full" /> History
        </button>
      </div>
    </>
  );
}
