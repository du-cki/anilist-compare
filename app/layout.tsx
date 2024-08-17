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
  other: { name: "darkreader-lock", content: "darkreader-lock" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="darkreader-lock" key="darkreader-lock" />
        <base target="_blank" />
      </head>

      <body>{children}</body>
    </html>
  );
}
