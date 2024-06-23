import { deployAccount } from "@/utils/utils";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";

export function Onboarding() {
  const createWallet = async () => {
    await deployAccount();
  };

  return (
    <main className="flex flex-col items-center justify-center text-center gap-2 p-5">
      <Image
        src="/starkBot.svg"
        alt="Stark Bot"
        width={40}
        height={40}
        className="mt-5"
      />
      <span className="my-5 text-4xl text-neutral-700 font-semibold">
        Welcome to <h1 className="text-stark">Stark Bot</h1>
      </span>
      <div className="my-5">
        <h2 className="text-neutral-600 text-2xl font-medium leading-loose">
          Trustable Starknet Wallet
        </h2>
        <p className="text-neutral-500 text-sm leading-tight">
          Trade. Transaction. Made. Easy.
        </p>
      </div>
      <div className="my-6">
        <DynamicWidget />
      </div>
      <span className="mt-5 text-sm text-neutral-500">
        By continuing, you are agreeing with Stark Bot&apos;s{" "}
        <b className="text-stark">Terms of Use</b> and{" "}
        <b className="text-stark">Privacy Policy</b>
      </span>
    </main>
  );
}
