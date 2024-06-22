"use client";

import { Onboarding } from "./onboarding";
import Wallet from "./wallet";

export default function Hero() {
  const isLoading = true;
  return (
    <div className="flex items-center justify-center">
      {isLoading ? <Wallet /> : <Onboarding />}
    </div>
  );
}
