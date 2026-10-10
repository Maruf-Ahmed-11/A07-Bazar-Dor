"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Type Interfaces
interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    change: {
        dir: string;
        pct: number;
    };
    markets: Market[];
}

function ProductContent() {
    const params = useParams();
    const id = params?.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchProduct() {
            try {
                // FIXED api
                const response = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
                const data: Product[] = await response.json(); // Explicitly typed as Product[]

                // Find the specific product that matches the URL (handles both ID or Slug)
                const singleProduct = data.find((p: Product) => p.slug === id || p.id.toString() === id);

                setProduct(singleProduct || null);
            } catch (error) {
                console.error("Failed to fetch:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (!id) return null;

    if (!loading && !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-bold">পণ্য পাওয়া যায়নি</h2>
                <Link href="/" className="text-emerald-700 mt-4 underline">হোম পেজে ফিরে যান</Link>
            </div>
        );
    }

    const toBn = (num: number | undefined) => num ? num.toLocaleString("bn-BD") : "";
    const getUnitBn = (unit: string | undefined) => {
        if (!unit) return "";
        return unit.toLowerCase() === "kg" ? "প্রতি কেজি" : "প্রতি পিস";
    };

    // Helper to safely format table averages with exactly 2 decimal places if needed
    const formatAvg = (min: number, max: number) => {
        const avg = (min + max) / 2;
        return avg % 1 === 0
            ? toBn(avg)
            : avg.toLocaleString("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const isUp = product?.change?.dir === "up";
    const isDown = product?.change?.dir === "down";
    const formattedChange = toBn(product?.change?.pct);
    const priceDiff = Math.abs((product?.today || 0) - (product?.yesterday || 0));

    let lowestPrice = product?.today;
    let highestPrice = product?.today;
    const averagePrice = product?.today; // The overall average uses today's market rate

    if (product?.markets && product.markets.length > 0) {
        lowestPrice = Math.min(...product.markets.map(m => m.min));
        highestPrice = Math.max(...product.markets.map(m => m.max));
    }

    return (
        <div className="w-full bg-[#f4f7f6] min-h-screen pb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-6 flex items-center gap-2 font-medium">
                    <Link href="/">হোম</Link>
                    <span>›</span>
                    <Link href={`/category/${product?.category}`}>{product?.categoryNameBn}</Link>
                    <span>›</span>
                    <span className="text-gray-900">{product?.nameBn}</span>
                </div>

                {/* Top Main Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-[#f0fdf4] rounded-2xl flex items-center justify-center text-5xl">
                            {loading ? <span className="skeleton w-12 h-12"></span> : product?.image}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{product?.nameBn}</h1>

                            <p className="text-gray-500 text-sm mb-2">
                                {getUnitBn(product?.unit)} • {product?.categoryNameBn}
                            </p>

                            <p className="text-sm font-medium text-gray-600">
                                গতকালের তুলনায় আজ দাম <span className="font-bold text-gray-900">{isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}</span> {toBn(priceDiff)} টাকা
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#f8fafc] rounded-2xl p-6 text-center min-w-[180px] border border-gray-50">
                        <p className="text-sm text-gray-500 mb-1">আজকের দাম</p>
                        <p className="text-4xl font-extrabold text-gray-900 mb-1">{toBn(product?.today)}</p>
                        <p className="text-xs text-gray-500 mb-3">টাকা / {product?.unit === 'kg' ? 'কেজি' : 'পিস'}</p>
                        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${isUp ? "bg-red-50 text-red-500" : isDown ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"}`}>
                            {isUp ? "▲" : isDown ? "▼" : "—"} {formattedChange}%
                        </div>
                    </div>
                </div>

                {/* Summary Sections */}
                <h3 className="text-lg font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">সর্বনিম্ন দাম</p>
                        <p className="text-2xl font-bold text-emerald-600">{toBn(lowestPrice)} <span className="text-sm font-normal text-gray-600">টাকা</span></p>
                        <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">সর্বাধিক দাম</p>
                        <p className="text-2xl font-bold text-red-500">{toBn(highestPrice)} <span className="text-sm font-normal text-gray-600">টাকা</span></p>
                        <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">গড় দাম</p>
                        <p className="text-2xl font-bold text-emerald-600">{toBn(averagePrice)} <span className="text-sm font-normal text-gray-600">টাকা</span></p>
                        <p className="text-xs text-gray-400 mt-1">{product?.unit === 'kg' ? 'প্রতি কেজি-এর হিসাবে' : 'প্রতি পিস-এর হিসাবে'}</p>
                    </div>
                </div>

                {/* Market Table */}
                <h3 className="text-lg font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fafc] border-b border-gray-200 text-gray-600 text-sm">
                                    <th className="p-4 font-medium whitespace-nowrap">বাজার</th>
                                    <th className="p-4 font-medium whitespace-nowrap">বিভাগ</th>
                                    <th className="p-4 font-medium whitespace-nowrap">সর্বনিম্ন</th>
                                    <th className="p-4 font-medium whitespace-nowrap">সর্বাধিক</th>
                                    <th className="p-4 font-medium text-right whitespace-nowrap">গড়</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product?.markets?.map((m, i) => (
                                    <tr key={i} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-sm font-semibold text-gray-800 whitespace-nowrap">{m.market}</td>
                                        <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{m.division}</td>
                                        <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{toBn(m.min)} টাকা</td>
                                        <td className="p-4 text-sm text-gray-600 whitespace-nowrap">{toBn(m.max)} টাকা</td>
                                        <td className="p-4 text-sm font-bold text-gray-900 text-right whitespace-nowrap">
                                            {formatAvg(m.min, m.max)} টাকা
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function ProductDetailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen" />}>
            <ProductContent />
        </Suspense>
    );
}