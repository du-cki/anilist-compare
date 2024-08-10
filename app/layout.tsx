import Head from "next/head";

import type { Metadata, Viewport } from "next";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "AniList Comparsion Tool",
  description: "A simple tool for comparing AniList profiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="darkreader-lock" />
      </Head>

      <body>{children}</body>
    </html>
  );
}
