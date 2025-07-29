// pages/index.tsx or pages/_app.tsx or pages/whatever.tsx


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chameleon",
  description: "Your Language Exchange Platform",
  keywords: ["language exchange", "language learning", "chat", "video call", "language partners"],
  authors: [{ name: "Chameleon Team" }],
  creator: "Chameleon",
  publisher: "Chameleon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "/assets/extras/Logo Mark.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/extras/Logo Mark.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/assets/extras/Logo Mark.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/assets/extras/Logo Mark.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chameleon-app.com",
    siteName: "Chameleon",
    title: "Chameleon - Your Language Exchange Platform",
    description: "Connect with language partners worldwide. Practice languages through video, voice, and text conversations.",
    images: [
      {
        url: "/assets/extras/Logo Mark.png",
        width: 1200,
        height: 630,
        alt: "Chameleon Language Exchange Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chameleon - Your Language Exchange Platform",
    description: "Connect with language partners worldwide. Practice languages through video, voice, and text conversations.",
    images: ["/assets/extras/Logo Mark.png"],
    creator: "@chameleon_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#65AD87" />
        <meta name="color-scheme" content="light" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Chameleon" />
        <meta name="application-name" content="Chameleon" />
        <meta name="msapplication-TileColor" content="#65AD87" />
        <meta name="msapplication-TileImage" content="/assets/extras/Logo Mark.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/extras/Logo Mark.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/extras/Logo Mark.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/extras/Logo Mark.png" />
        <link rel="mask-icon" href="/assets/extras/Logo Mark.png" color="#65AD87" />
        <link rel="shortcut icon" href="/assets/extras/Logo Mark.png" />
      </head>
      <body className={inter.className}>
        <main className='relative overflow-hidden'>
        {children}
        </main>
      </body>
    </html>
  );
}
