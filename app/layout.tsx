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
  title: {
    default: "AgileEnv - Project Management Assistant",
    template: "%s | AgileEnv",
  },
  description:
    "AgileEnv is your personalized project management assistant, helping you streamline workflows and boost productivity.",
  keywords: [
    "Project Management",
    "Agile",
    "Productivity",
    "Task Management",
    "Jira Alternative",
    "Collaboration",
  ],
  authors: [{ name: "AgileEnv Team" }],
  creator: "AgileEnv Team",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://agileenv.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://agileenv.com",
    title: "AgileEnv - Project Management Assistant",
    description: "AgileEnv - Your Personalized Project Management Assistant",
    siteName: "AgileEnv",
    images: [
      {
        url: "/Images/logo.svg",
        width: 1200,
        height: 630,
        alt: "AgileEnv",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgileEnv - Project Management Assistant",
    description: "AgileEnv - Your Personalized Project Management Assistant",
    images: ["/Images/logo.svg"],
    creator: "@agileenv",
  },
  icons: {
    icon: "/Images/logo.svg",
    shortcut: "/Images/logo.svg",
    apple: "/Images/logo.svg",
  },
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
