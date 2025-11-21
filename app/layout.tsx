import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SuiVerify - Digital Identity Infrastructure",
  description: "One Identity Layer to Bridge Old and New Internets.",
  keywords: ["digital identity", "blockchain", "verification", "Aadhaar", "DID", "NFT", "Sui", "KYC", "government"],
  authors: [{ name: "SuiVerify" }],
  robots: "index, follow",
  themeColor: "#00BFFF",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/head_logo.png",
    apple: "/head_logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://explorer.suiverify.xyz/",
    title: "SuiVerify - Digital Identity Infrastructure",
    description: "One Identity Layer to Bridge Old and New Internets.",
    siteName: "SuiVerify",
    locale: "en_US",
    images: [
      {
        url: "https://suiverify.xyz/cover.png",
        width: 1200,
        height: 630,
        alt: "SuiVerify - Digital Identity Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@suiverify",
    creator: "@suiver1fy",
    title: "SuiVerify - Digital Identity Infrastructure",
    description: "One Identity Layer to Bridge Old and New Internets.",
    images: ["https://suiverify.xyz/head_logo.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SuiVerify",
  },
  other: {
    "msapplication-TileColor": "#00BFFF",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased outfit`}
      >
        {children}
      </body>
    </html>
  );
}
