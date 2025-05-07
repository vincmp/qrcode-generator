import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerador de QRCode",
  description: "Sistema gerador de QRCode da Drogaria Plus!",
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
    },
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicons/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicons/android-chrome-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
