import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stark Bot",
  description: "Trade become more easy with TG Bot",
  icons: "/starkBot.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-[#eeeeee] h-[450px] w-[100%] md:w-[50%]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
