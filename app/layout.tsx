import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Poppins} from 'next/font/google'

const poppings = Poppins ({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Storage",
  description: "A storage solution with collaboration features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppings.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
