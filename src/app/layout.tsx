import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterProvider from "@/components/ToasterProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazar Dor | বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>

        {/* Added Suspense Wrapper around Navbar */}
        <ToasterProvider />
        <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100"></div>}>
          <Navbar />
        </Suspense>

        <PriceTicker />
        {/* Main Page Content */}
        <main className="min-h-screen bg-[#f4f7f6]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}