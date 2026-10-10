"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
    id: number;
    nameBn: string;
    categoryIcon: string;
    image: string; 
    unit: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

export default function PriceTicker() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products for ticker:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const toBn = (num: number) => num.toLocaleString("bn-BD");

    const getUnitBn = (unit: string) => {
        switch (unit.toLowerCase()) {
            case "kg": return "কেজি";
            case "l":
            case "liter": return "লিটার";
            case "dozen": return "ডজন";
            case "hali": return "হালি";
            default: return "পিস";
        }
    };

    if (loading) {
        return (
            <div className="w-full bg-[#f8fafc] text-gray-500 text-sm py-2 px-4 flex items-center justify-center border-y border-gray-100 min-h-[40px]">
                <span className="animate-pulse">বাজারের আজকের লাইভ দাম লোড হচ্ছে...</span>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="w-full bg-[#f9fafb] border-y border-gray-200 text-sm overflow-hidden flex items-center min-h-[42px]">
            <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">

                {products.map((product) => {
                    const isUp = product.change.dir === "up";
                    const isDown = product.change.dir === "down";
                    const changeText = toBn(product.change.pct);

                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="flex items-center gap-1.5 px-6 border-r border-gray-200 cursor-pointer hover:bg-emerald-50 transition-colors shrink-0"
                        >
                            <span className="text-base">{product.image}</span>
                            <span className="text-gray-700 font-medium hover:text-emerald-700">{product.nameBn}</span>
                            <span className="text-gray-600">
                                {toBn(product.today)} টাকা/{getUnitBn(product.unit)}
                            </span>
                            <span className={`text-xs font-bold flex items-center gap-0.5 ml-1 ${isUp ? "text-red-500" : isDown ? "text-emerald-600" : "text-gray-400"}`}>
                                {isUp ? "▲" : isDown ? "▼" : "—"} {changeText}%
                            </span>
                        </Link>
                    );
                })}

                {/* Duplicate array for smooth infinite scroll */}
                {products.map((product) => {
                    const isUp = product.change.dir === "up";
                    const isDown = product.change.dir === "down";
                    const changeText = toBn(product.change.pct);

                    return (
                        <Link
                            key={`dup-${product.id}`}
                            href={`/product/${product.id}`}
                            className="flex items-center gap-1.5 px-6 border-r border-gray-200 cursor-pointer hover:bg-emerald-50 transition-colors shrink-0"
                        >
                            {/* Changed categoryIcon to image */}
                            <span className="text-base">{product.image}</span>
                            <span className="text-gray-700 font-medium hover:text-emerald-700">{product.nameBn}</span>
                            <span className="text-gray-600">
                                {toBn(product.today)} টাকা/{getUnitBn(product.unit)}
                            </span>
                            <span className={`text-xs font-bold flex items-center gap-0.5 ml-1 ${isUp ? "text-red-500" : isDown ? "text-emerald-600" : "text-gray-400"}`}>
                                {isUp ? "▲" : isDown ? "▼" : "—"} {changeText}%
                            </span>
                        </Link>
                    );
                })}

            </div>
        </div>
    );
}