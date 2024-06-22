"use client";

import { GlobalContextProvider } from "@/context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}
