"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
    categoryNameBn: string;
}

function CategoryContent() {
    const params = useParams();
    const slug = params?.slug as string;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        async function fetchCategoryProducts() {
            try {
                const response = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch category products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategoryProducts();
    }, [slug]);

    const getUnitBn = (unit: string) => {
        switch (unit.toLowerCase()) {
            case "kg": return "প্রতি কেজি";
            case "l":
            case "liter":
            case "litre": return "প্রতি লিটার";
            case "dozen": return "প্রতি ডজন";
            case "hali": return "প্রতি হালি";
            default: return "প্রতি পিস";
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner text-emerald-700 loading-lg"></span>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">পণ্য পাওয়া যায়নি</h2>
                <p className="text-gray-500 mb-6">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই বা লিংকটি সঠিক নয়।</p>
                <Link href="/" className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none">
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    const categoryName = products[0].categoryNameBn;
    const categoryIcon = products[0].categoryIcon;

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <Link href="/" className="hover:text-emerald-700 transition-colors">হোম</Link>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">{categoryName}</span>
                </div>

                <div className="mb-8 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl sm:text-4xl">{categoryIcon}</span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{categoryName}</h1>
                    </div>
                    <p className="text-sm text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((p) => (
                        <ProductCard
                            key={p.id}
                            id={p.id}
                            name={p.nameBn}
                            icon={p.categoryIcon}
                            unit={getUnitBn(p.unit)}
                            price={p.today}
                            changeRate={p.change.dir === 'down' ? -p.change.pct : p.change.pct}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

// Wrap the component in Suspense to fix the Next.js prerendering block
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