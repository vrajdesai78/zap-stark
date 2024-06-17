import { createContext, useState } from "react";

export enum State {
  HOME = "HOME",
  SEND = "SEND",
  RECEIVE = "RECEIVE",
  SWAP = "SWAP",
  HISTORY = "HISTORY",
}

interface GlobalContextProps {
  walletState: State;
  setWalletState: (walletState: State) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  walletState: State.HOME,
  setWalletState: () => {},
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletState, setWalletState] = useState<State>(State.HOME);

  return (
    <GlobalContext.Provider value={{ walletState, setWalletState }}>
      {children}
    </GlobalContext.Provider>
  );
};
