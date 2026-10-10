import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
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
    <html lang="bn" data-theme="light">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        {/* We will add Navbar and PriceTicker here in the next step */}
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}