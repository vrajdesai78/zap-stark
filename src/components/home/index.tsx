"use client";

import { useState } from "react";
import { Onboarding } from "./onboarding";
import Wallet from "./wallet";

export default function Hero() {
  const [isWalletCreated, setIsWalletCreated] = useState<boolean>(false);
  return (
    <div className='flex items-center justify-center'>
      {isWalletCreated ? (
        <Wallet />
      ) : (
        <Onboarding setIsWalletCreated={setIsWalletCreated} />
      )}
    </div>
  );
}
