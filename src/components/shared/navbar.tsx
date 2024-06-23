/* eslint-disable @next/next/no-img-element */
import { GlobalContext, State } from "@/context";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useContext, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, handleLogOut } = useDynamicContext();
  const { walletState, setWalletState } = useContext(GlobalContext);
  return (
    <div className='relative flex items-center justify-between w-full text-neutral-700'>
      {walletState === "HOME" ? (
        <Image src='/starkBot.svg' alt='Stark Bot' width={20} height={20} />
      ) : (
        <button
          className='flex items-center gap-3 font-medium text-neutral-700 hover:text-neutral-800'
          onClick={() => {
            setWalletState(State.HOME);
          }}
        >
          <FaChevronLeft /> Back
        </button>
      )}
      {/* <button className='flex items-center justify-center gap-2 text-neutral-800'>
        Wallet <IoCopyOutline />
      </button> */}
      <button
        className='w-8 h-8 bg-gradient-to-br from-sky-400 to-amber-400 rounded-full shadow-lg'
        onClick={() => {
          setIsOpen((prevIsOpen) => {
            return !prevIsOpen;
          });
        }}
      >
        <img
          src='/art.png'
          alt='Stark Bot'
          width={10}
          height={10}
          className='w-8 h-8 rounded-full object-cover'
        />
      </button>
      {isOpen && (
        <div className='flex flex-col absolute w-[20rem] items-start rounded-lg top-[2.2rem] right-[1rem] bg-neutral-200 backdrop-blur-md border border-neutral-300 z-50'>
          <button className='flex w-full gap-2 p-3 hover:bg-neutral-400 hover:bg-opacity-15 hover:backdrop-blur-md hover:text-blue-500 items-center justify-start truncate'>
            <span className='w-6 h-6 bg-gradient-conic to-cyan-400 from-white rounded-full shadow-lg' />
            {user?.email}
          </button>
          <button
            className='flex w-full gap-2 p-3 hover:bg-neutral-400 hover:bg-opacity-15 hover:backdrop-blur-md hover:text-blue-500 items-center justify-start'
            onClick={() => {
              handleLogOut();
            }}
          >
            <LuLogOut /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
