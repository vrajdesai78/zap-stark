import { createContext, useState } from "react";

export enum State {
  HOME = "HOME",
  SEND = "SEND",
  RECEIVE = "RECEIVE",
  SWAP = "SWAP",
  HISTORY = "HISTORY",
}

export enum Thread {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
}

interface GlobalContextProps {
  walletState: State;
  setWalletState: (walletState: State) => void;
  thread: Thread;
  setThread: (thread: Thread) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  walletState: State.HOME,
  setWalletState: () => {},
  thread: Thread.ONE,
  setThread: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [walletState, setWalletState] = useState<State>(State.HOME);
  const [thread, setThread] = useState<Thread>(Thread.ONE);

  return (
    <GlobalContext.Provider
      value={{ walletState, setWalletState, thread, setThread }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
