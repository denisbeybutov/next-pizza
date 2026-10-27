import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

import type { Metadata } from "next";
import { Providers } from "@/shared/components/shared/providers";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
       <Providers>
       {children}
       {modal}
       </Providers>
        
      </body>
    </html>
  );
}