"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

// Dummy Data - To be replaced by API later
const dummyCategories = [
    { name: "চাল", slug: "chal", icon: "🍚" },
    { name: "ডাল", slug: "dal", icon: "🥣" },
    { name: "সবজি", slug: "vegetable", icon: "🥬" },
];

const dummyProducts = [
    { id: "1", category: "chal", name: "স্বর্ণমাছি চাল", unit: "প্রতি কেজি", price: 148, changeRate: 2.1, icon: "🍚" },
    { id: "2", category: "chal", name: "মিনিকেট চাল", unit: "প্রতি কেজি", price: 99, changeRate: -2.9, icon: "🍚" },
    { id: "3", category: "chal", name: "নাজির চাল", unit: "প্রতি কেজি", price: 74, changeRate: 0, icon: "🍚" },
    { id: "4", category: "chal", name: "বাটাম সাইজ চাল", unit: "প্রতি কেজি", price: 66, changeRate: 3.1, icon: "🍚" },
    { id: "5", category: "dal", name: "মসুর ডাল", unit: "প্রতি কেজি", price: 142, changeRate: 2.9, icon: "🫘" },
    { id: "6", category: "vegetable", name: "পেঁয়াজ", unit: "প্রতি কেজি", price: 54, changeRate: 12.5, icon: "🧅" },
];

// 1. The inner component holding all the logic(Separating because keeps giving error)
function CategoryContent() {
    const params = useParams();
    const slug = params?.slug as string;

    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        if (!slug) return;
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [slug]);

    if (!slug) return null;

    const category = dummyCategories.find((c) => c.slug === slug);
    const categoryProducts = dummyProducts.filter((p) => p.category === slug);

    // Sorting Logic
    const sortedProducts = [...categoryProducts].sort((a, b) => {
        if (sortBy === "low-to-high") return a.price - b.price;
        if (sortBy === "high-to-low") return b.price - a.price;
        return 0;
    });

    if (!loading && !category) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">ক্যাটাগরি পাওয়া যায়নি</h2>
                <p className="text-gray-500 mb-6">আপনি যে ক্যাটাগরিটি খুঁজছেন তা আমাদের তালিকায় নেই।</p>
                <Link href="/" className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none">
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    const toBn = (num: number) => num.toLocaleString("bn-BD");

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-4xl">
                            {loading ? <span className="skeleton w-10 h-10 rounded-full"></span> : category?.icon}
                        </div>
                        <div>
                            {loading ? (
                                <>
                                    <div className="skeleton h-8 w-24 mb-2"></div>
                                    <div className="skeleton h-4 w-40"></div>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{category?.name}</h1>
                                    <p className="text-sm text-gray-500">{toBn(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                        <label htmlFor="sort" className="text-sm font-medium text-gray-600 whitespace-nowrap">সাজান</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            disabled={loading}
                            className="select select-sm select-ghost bg-transparent border-none focus:outline-none focus:bg-transparent text-gray-800 font-medium w-full sm:w-auto"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low-to-high">দাম: কম থেকে বেশি</option>
                            <option value="high-to-low">দাম: বেশি থেকে কম</option>
                        </select>
                    </div>
                </div>

                {!loading && (
                    <p className="text-sm text-gray-500 font-medium mb-4">
                        মোট <span className="text-emerald-700 font-bold">{toBn(categoryProducts.length)}টি</span> পণ্য দেখানো হচ্ছে
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
                                <div className="flex gap-4 items-center">
                                    <div className="skeleton w-14 h-14 rounded-2xl"></div>
                                    <div className="flex flex-col gap-2">
                                        <div className="skeleton h-5 w-20"></div>
                                        <div className="skeleton h-3 w-12"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mt-4">
                                    <div className="skeleton h-8 w-16"></div>
                                    <div className="skeleton h-4 w-12"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        sortedProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    )}
                </div>

                {!loading && sortedProducts.length === 0 && category && (
                    <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl mt-4">
                        <p className="text-gray-500 mb-4">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।</p>
                    </div>
                )}

            </div>
        </div>
    );
}

// 2. The main exported component that wraps the inner component in Suspense
export default function CategoryPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner text-emerald-700 loading-lg"></span>
            </div>
        }>
            <CategoryContent />
        </Suspense>
    );
}