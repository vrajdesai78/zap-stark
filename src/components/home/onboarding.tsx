import {
  argentXaccountClassHash,
  argentXproxyClassHash,
} from "@/utils/constants";
import Image from "next/image";
import {
  Account,
  CallData,
  Provider,
  RpcProvider,
  constants,
  ec,
  hash,
  stark,
} from "starknet";

interface OnboardingProps {
  setIsWalletCreated: (isWalletCreated: boolean) => void;
}

export function Onboarding({ setIsWalletCreated }: OnboardingProps) {
  const provider = new RpcProvider({
    nodeUrl:
      "https://starknet-mainnet.blastapi.io/7987c69e-0573-456d-80de-b76bdd831edf",
  });

  function uint8ArrayToAddress66(uint8Array: Uint8Array): string {
    const hexString = Array.from(uint8Array)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    const truncatedHex = hexString.slice(0, 64);
    return "0x" + truncatedHex.toLowerCase();
  }

  const createWallet = async () => {
    const privateKey = stark.randomAddress();
    console.log("privateKey:", privateKey);
    const publicKey = uint8ArrayToAddress66(
      ec.starkCurve.getPublicKey(privateKey)
    );
    const AXproxyConstructorCallData = CallData.compile({
      implementation: argentXaccountClassHash,
      selector: hash.getSelectorFromName("initialize"),
      calldata: CallData.compile({
        signer: publicKey,
        guardian: "0",
      }),
    });

    const AXcontractAddress = hash.calculateContractAddressFromHash(
      publicKey,
      argentXproxyClassHash,
      AXproxyConstructorCallData,
      0
    );
    console.log("Precalculated account address=", AXcontractAddress);

    const accountAX = new Account(provider, AXcontractAddress, privateKey);

    const deployAccountPayload = {
      classHash: argentXproxyClassHash,
      constructorCalldata: AXproxyConstructorCallData,
      contractAddress: AXcontractAddress,
      addressSalt: publicKey,
    };

    const {
      transaction_hash: AXdAth,
      contract_address: AXcontractFinalAddress,
    } = await accountAX.deployAccount(deployAccountPayload);
    console.log("✅ ArgentX wallet deployed at:", AXcontractFinalAddress);
    console.log("🔗 Transaction hash:", AXdAth);
  };

  return (
    <main className='flex flex-col items-center justify-center text-center gap-2 p-5'>
      <Image
        src='/starkBot.svg'
        alt='Stark Bot'
        width={40}
        height={40}
        className='mt-5'
      />
      <span className='my-5 text-4xl text-neutral-700 font-semibold'>
        Welcome to <h1 className='text-stark'>Stark Bot</h1>
      </span>
      <div className='my-5'>
        <h2 className='text-neutral-600 text-2xl font-medium leading-loose'>
          Trustable Starknet Wallet
        </h2>
        <p className='text-neutral-500 text-sm leading-tight'>
          Trade. Transaction. Made. Easy.
        </p>
      </div>
      <div className='my-6'>
        <button
          className='w-fit px-6 py-3 bg-stark rounded-xl'
          onClick={createWallet}
        >
          Create Wallet
        </button>
      </div>
      <span className='mt-5 text-sm text-neutral-500'>
        By continuing, you are agreeing with Stark Bot&apos;s{" "}
        <b className='text-stark'>Terms of Use</b> and{" "}
        <b className='text-stark'>Privacy Policy</b>
      </span>
    </main>
  );
}
