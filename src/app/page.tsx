"use client";

import Image from "next/image";
import heroImage from "@/assets/bazar-hero.png";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Delay the state update by 1ms to prevent Next.js hydration errors and strict linter warnings
    const timer = setTimeout(() => setIsMounted(true), 1);
    return () => clearTimeout(timer);
  }, []);

  const dateString = isMounted 
    ? new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date())
    : "লোড হচ্ছে..."; // Shows a fallback while mounting

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Hero / Banner Section */}
        <section className="bg-[#f0fdf4] rounded-[2rem] p-6 sm:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 border border-emerald-50">
          
          {/* Left Text Content */}
          <div className="flex-1 flex flex-col items-start text-left">
            {/* Dynamic Date Pill */}
            <div className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 min-h-[28px]">
              {dateString}
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.2] mb-4">
              আজকের বাজারের দাম এক নজরে
            </h1>
            
            {/* Subtitle */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            
            {/* CTA Button with Anchor Link */}
            <Link
              href="#all-products" 
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center md:justify-end w-full max-w-sm md:max-w-md">
            <div className="relative w-full aspect-square md:aspect-auto md:h-72">
              <Image 
                src={heroImage} 
                alt="বাজারের পণ্য" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
        </section>

        {/* 3. Product Sections (Today's High, Today's Low, All Products) will go here next */}
        <div id="all-products" className="mt-16">
          {/* Have to create product grids here */}
        </div>

      </div>
    </div>
  );
}