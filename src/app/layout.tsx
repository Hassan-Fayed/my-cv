import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import NavBar from '@/components/NavBar/NavBar';

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hassan Fayed's CV",
  description: "A project I created to showcase my skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}