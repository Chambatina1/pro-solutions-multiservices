import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pro Solutions Multiservices LLC | Landscaping & Outdoor Services in Arizona",
  description:
    "Professional landscaping, gardening, pruning, cleanup, and outdoor maintenance services in Arizona. Get a free quote today! Pro Solutions Multiservices LLC.",
  keywords: [
    "landscaping Arizona",
    "gardening services",
    "pruning",
    "lawn care",
    "yard cleanup",
    "outdoor maintenance",
    "Pro Solutions Multiservices",
    "Arizona landscaping",
    "desert landscaping",
    "irrigation",
  ],
  authors: [{ name: "Pro Solutions Multiservices LLC" }],
  icons: {
    icon: "/images/logo-icon.png",
  },
  openGraph: {
    title: "Pro Solutions Multiservices LLC | Landscaping & Outdoor Services",
    description:
      "Professional landscaping, gardening, pruning, and outdoor maintenance services in Arizona.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
