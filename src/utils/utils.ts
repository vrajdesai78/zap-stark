import { Account, CallData, RpcProvider, ec, hash, stark } from "starknet";
import { argentXaccountClassHash } from "./constants";

export function createKeyPair() {
  const privateKey = stark.randomAddress();
  const publicKey = ec.starkCurve.getStarkKey(privateKey);
  return {
    privateKey,
    publicKey,
  };
}

export function connectToStarknet() {
  return new RpcProvider({
    nodeUrl: process.env.RPC_ENDPOINT as string,
  });
}

export function getDeployerWallet(provider: RpcProvider) {
  const privateKey = process.env.PRIVATE_KEY as string;
  const address =
    "0x070a0122733c00716cb9f4ab5a77b8bcfc04b707756bbc27dc90973844a752d1";
  return new Account(provider, address, privateKey);
}

export async function importChalk() {
  return import("chalk").then((m) => m.default);
}
interface DeclareAccountConfig {
  provider: RpcProvider;
  deployer: Account;
  sierraCode: any;
  casmCode: any;
}

export async function declareContract({
  provider,
  deployer,
  sierraCode,
  casmCode,
}: DeclareAccountConfig) {
  const declare = await deployer.declare({
    contract: sierraCode,
    casm: casmCode,
  });
  await provider.waitForTransaction(declare.transaction_hash);
}

interface DeployAccountConfig {
  privateKey: string;
  publicKey: string;
  classHash: string;
  provider: RpcProvider;
}

export async function deployAccount() {
  const chalk = await importChalk();

  const { publicKey } = createKeyPair();

  const provider = connectToStarknet();

  const constructorArgs = CallData.compile({
    public_key: publicKey,
  });

  const myAccountAddress = hash.calculateContractAddressFromHash(
    publicKey,
    argentXaccountClassHash,
    constructorArgs,
    0
  );

  console.log(`Send ETH to contract address ${myAccountAddress}`);

  const account = new Account(
    provider,
    myAccountAddress,
    process.env.PRIVATE_KEY!,
    "1"
  );

  const deploy = await account.deployAccount({
    classHash: argentXaccountClassHash,
    constructorCalldata: constructorArgs,
    addressSalt: publicKey,
  });

  await provider.waitForTransaction(deploy.transaction_hash);

  console.log(chalk.green(`🚀 Account deployed at ${deploy.contract_address}`));
  return deploy.contract_address;
}
