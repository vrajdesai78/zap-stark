import Navbar from "../shared/navbar";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import Home from "./home";
import Swap from "./swap";
import Send from "./send";

export default function Wallet() {
  const { walletState } = useContext(GlobalContext);
  return (
    <main className="flex flex-col w-full items-center justify-center gap-2 p-5">
      <Navbar />
      {walletState === "HOME" && <Home />}
      {walletState === "SWAP" && <Swap />}
      {walletState === "SEND" && <Send />}
    </main>
  );
}
