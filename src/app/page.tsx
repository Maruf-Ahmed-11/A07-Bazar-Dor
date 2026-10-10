"use client";

import Image from "next/image";
import heroImage from "@/assets/bazar-hero.png";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";

// The API product structure
interface Product {
  id: number;
  nameBn: string;
  categoryIcon: string;
  image: string; // Added image here
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 1);

    // Fetch live products for the Home Page
    async function fetchProducts() {
      try {
        const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch home page products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
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

  // Helper to translate units
  const getUnitBn = (unit: string) => {
    switch (unit.toLowerCase()) {
      case "kg": return "প্রতি কেজি";
      case "l":
      case "liter": return "প্রতি লিটার";
      case "dozen": return "প্রতি ডজন";
      case "hali": return "প্রতি হালি";
      default: return "প্রতি পিস";
    }
  };

  //  Filter data based on the real API 'dir' value and limit to 8 items
  const priceIncreased = products.filter(p => p.change.dir === "up").slice(0, 8);
  const priceDecreased = products.filter(p => p.change.dir === "down").slice(0, 8);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Hero Section */}
        <section className="bg-[#f0fdf4] rounded-[2rem] p-6 sm:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 border border-emerald-50">
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 min-h-[28px]">
              {dateString}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.2] mb-4">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
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

          {loading ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner text-emerald-700 loading-lg"></span>
            </div>
          ) : (
            <>
              {/* Section A: Price Increased */}
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-red-500 text-lg">▲</span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {priceIncreased.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      name={p.nameBn}
                      icon={p.image} // Changed to p.image
                      unit={getUnitBn(p.unit)}
                      price={p.today}
                      changeRate={p.change.pct}
                    />
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
                  {priceDecreased.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      name={p.nameBn}
                      icon={p.image} // Changed to p.image
                      unit={getUnitBn(p.unit)}
                      price={p.today}
                      // pass negative so ProductCard knows it's a decrease
                      changeRate={-p.change.pct}
                    />
                  ))}
                </div>
              </section>

              {/* Section C: All Products */}
              <section>
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">সব পণ্য</h2>
                  <p className="text-sm text-gray-500">মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {products.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      name={p.nameBn}
                      icon={p.image} // Changed to p.image
                      unit={getUnitBn(p.unit)}
                      price={p.today}
                      changeRate={p.change.dir === 'down' ? -p.change.pct : p.change.pct}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

        </div>
      </div>
    </div>
  );
}