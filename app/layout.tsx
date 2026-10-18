import { Nunito } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

import type { Metadata } from "next";

export const metadata: Metadata = {  
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"            
    >
      
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  )
}
