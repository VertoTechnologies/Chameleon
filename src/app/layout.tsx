// pages/index.tsx or pages/_app.tsx or pages/whatever.tsx

import Header from '../app/components/header';
import Footer from '../app/components/footer';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chameleon",
  description: "Your Language Exchange Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className='relative overflow-hidden'>
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
