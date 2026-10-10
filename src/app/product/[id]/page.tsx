"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Dummy Data - To be replaced by API later
const dummyProducts = [
    {
        id: "1",
        categorySlug: "chal",
        categoryName: "চাল",
        name: "স্বর্ণমাছি চাল",
        unit: "প্রতি কেজি",
        price: 148,
        previousPrice: 145,
        changeRate: 2.1,
        icon: "🍚",
        high: 150,
        low: 142
    },
    {
        id: "2",
        categorySlug: "chal",
        categoryName: "চাল",
        name: "মিনিকেট চাল",
        unit: "প্রতি কেজি",
        price: 99,
        previousPrice: 102,
        changeRate: -2.9,
        icon: "🍚",
        high: 105,
        low: 98
    },
    {
        id: "6",
        categorySlug: "vegetable",
        categoryName: "সবজি",
        name: "পেঁয়াজ",
        unit: "প্রতি কেজি",
        price: 54,
        previousPrice: 48,
        changeRate: 12.5,
        icon: "🧅",
        high: 60,
        low: 45
    },
];

function ProductContent() {
    const params = useParams();
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [id]);

    if (!id) return null;

    const product = dummyProducts.find((p) => p.id === id);

    if (!loading && !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">পণ্য পাওয়া যায়নি</h2>
                <p className="text-gray-500 mb-6">আপনি যে পণ্যটি খুঁজছেন তা আমাদের তালিকায় নেই বা সরিয়ে ফেলা হয়েছে।</p>
                <Link href="/" className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none">
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    const toBn = (num: number | undefined) => {
        if (num === undefined) return "";
        return num.toLocaleString("bn-BD");
    };

    const isUp = (product?.changeRate ?? 0) > 0;
    const isDown = (product?.changeRate ?? 0) < 0;
    const formattedChange = toBn(Number(Math.abs(product?.changeRate ?? 0).toFixed(1)));

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

                {/* Breadcrumb Navigation */}
                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <Link href="/" className="hover:text-emerald-700 transition-colors">হোম</Link>
                    <span>›</span>
                    {loading ? (
                        <div className="skeleton h-4 w-16"></div>
                    ) : (
                        <Link href={`/category/${product?.categorySlug}`} className="hover:text-emerald-700 transition-colors">
                            {product?.categoryName}
                        </Link>
                    )}
                    <span>›</span>
                    {loading ? (
                        <div className="skeleton h-4 w-24"></div>
                    ) : (
                        <span className="text-gray-900 font-medium">{product?.name}</span>
                    )}
                </div>

                {/* Main Product Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">

                        {/* Left: Icon */}
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-emerald-50 rounded-3xl flex items-center justify-center text-6xl sm:text-7xl shrink-0">
                            {loading ? <span className="skeleton w-16 h-16 rounded-full"></span> : product?.icon}
                        </div>

                        {/* Right: Details */}
                        <div className="flex-grow w-full">
                            {loading ? (
                                <>
                                    <div className="skeleton h-10 w-48 mb-4"></div>
                                    <div className="skeleton h-6 w-32 mb-8"></div>
                                    <div className="flex gap-4">
                                        <div className="skeleton h-16 w-32"></div>
                                        <div className="skeleton h-16 w-32"></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <div>
                                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{product?.name}</h1>
                                            <p className="text-gray-500 font-medium">{product?.unit}</p>
                                        </div>

                                        {/* Price Fluctuation Badge */}
                                        <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-sm sm:text-base ${isUp ? "bg-red-50 text-red-600" : isDown ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                                            }`}>
                                            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                                            <span>{formattedChange}% {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}</span>
                                        </div>
                                    </div>

                                    {/* Pricing Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                                            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none">
                                                ৳{toBn(product?.price)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">গতকালের দাম</p>
                                            <p className="text-xl sm:text-2xl font-bold text-gray-600 leading-none">
                                                ৳{toBn(product?.previousPrice)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">সর্বোচ্চ (৭ দিন)</p>
                                            <p className="text-lg font-bold text-gray-600 leading-none mt-1">
                                                ৳{toBn(product?.high)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <p className="text-xs text-gray-500 mb-1">সর্বনিম্ন (৭ দিন)</p>
                                            <p className="text-lg font-bold text-gray-600 leading-none mt-1">
                                                ৳{toBn(product?.low)}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Placeholder for Price History Chart */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">দামের ইতিহাস (গত ৭ দিন)</h3>
                    {loading ? (
                        <div className="skeleton w-full h-64 rounded-2xl"></div>
                    ) : (
                        <div className="w-full h-64 border-2 border-dashed border-emerald-100 rounded-2xl flex flex-col items-center justify-center bg-emerald-50/30 text-emerald-800">
                            <span className="text-4xl mb-3">📈</span>
                            <p className="font-medium">চার্ট এবং গ্রাফের কাজ চলছে</p>
                            <p className="text-sm opacity-70 mt-1">API ইন্টিগ্রেশনের পর এখানে ডেটা দেখানো হবে</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default function ProductDetailPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner text-emerald-700 loading-lg"></span>
            </div>
        }>
            <ProductContent />
        </Suspense>
    );
}