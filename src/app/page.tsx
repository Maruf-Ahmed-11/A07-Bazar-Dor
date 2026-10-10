"use client";

import Image from "next/image";
import heroImage from "@/assets/bazar-hero.png";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

// Placeholder data - HAve to replace this with real API data later
const dummyProducts = [
  { id: "1", name: "পেঁয়াজ", unit: "প্রতি কেজি", price: 54, changeRate: 12.5, icon: "🧅" },
  { id: "2", name: "আদা", unit: "প্রতি কেজি", price: 85, changeRate: 9.0, icon: "🫚" },
  { id: "3", name: "বেগুন", unit: "প্রতি কেজি", price: 44, changeRate: 4.8, icon: "🍆" },
  { id: "4", name: "রুই মাছ", unit: "প্রতি কেজি", price: 450, changeRate: 4.5, icon: "🐟" },
  { id: "5", name: "ডিম", unit: "প্রতি ডজন", price: 155, changeRate: 3.9, icon: "🥚" },
  { id: "6", name: "মাখন (৫০০ গ্রাম)", unit: "প্রতি পিস", price: 545, changeRate: 3.6, icon: "🧈" },
  { id: "7", name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: 92, changeRate: -12.8, icon: "🌶️" },
  { id: "8", name: "রসুন", unit: "প্রতি কেজি", price: 125, changeRate: -7.4, icon: "🧄" },
  { id: "9", name: "আলু", unit: "প্রতি কেজি", price: 30, changeRate: -6.2, icon: "🥔" },
  { id: "10", name: "কাতলা মাছ", unit: "প্রতি কেজি", price: 430, changeRate: -4.4, icon: "🐟" },
  { id: "11", name: "হাঁসের মাংস", unit: "প্রতি কেজি", price: 585, changeRate: -3.4, icon: "🦆" },
  { id: "12", name: "খাসির মাংস", unit: "প্রতি কেজি", price: 1290, changeRate: -3.0, icon: "🥩" },
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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
    : "লোড হচ্ছে...";

  // Filtering data for the specific sections
  const priceIncreased = dummyProducts.filter(p => p.changeRate > 0).slice(0, 6);
  const priceDecreased = dummyProducts.filter(p => p.changeRate < 0).slice(0, 6);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Hero / Banner Section */}
        <section className="bg-[#f0fdf4] rounded-[2rem] p-6 sm:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 border border-emerald-50">
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 min-h-[28px]">
              {dateString}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.2] mb-4">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a href="#all-products" className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm">
              সব পণ্য দেখুন
            </a>
          </div>
          <div className="flex-1 flex justify-center md:justify-end w-full max-w-sm md:max-w-md">
            <div className="relative w-full aspect-square md:aspect-auto md:h-72">
              <Image src={heroImage} alt="বাজারের পণ্য" fill className="object-contain" priority />
            </div>
          </div>
        </section>

        {/* Product Sections */}
        <div id="all-products" className="mt-16 space-y-16">

          {/* Section A: Price Increased */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-red-500 text-lg">▲</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {priceIncreased.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>

          {/* Section B: Price Decreased */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-emerald-600 text-lg">▼</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">আজ দাম কমেছে</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {priceDecreased.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>

          {/* Section C: All Products */}
          <section>
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
              <p className="text-sm text-gray-500">মোট ১২টি পণ্য দেখানো হচ্ছে</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {dummyProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}