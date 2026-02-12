import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/modalContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hassan Fayed",
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
        <ModalProvider>
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}