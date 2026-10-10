"use client";

import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/assets/logo-icon.png";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Type declare
interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

export default function Navbar() {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const session = null;

    useEffect(() => {
        // Delaying the mount state slightly to prevent hydration errors
        const timer = setTimeout(() => setIsMounted(true), 1);

        async function fetchCategories() {
            try {
                const response = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        }

        fetchCategories();

        return () => clearTimeout(timer);
    }, []);

    const dateString = isMounted
        ? new Intl.DateTimeFormat("bn-BD", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date())
        : "";

    return (
        <nav className="w-full bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4">

                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 relative bg-emerald-700 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                        <Image
                            src={logoIcon}
                            alt="বাজার দর Logo"
                            fill
                            className="object-cover"
                            sizes="40px"
                            priority
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-gray-900 leading-none mb-1.5">বাজার দর</h1>
                        <p className="text-xs text-gray-500 font-medium">{dateString}</p>
                    </div>
                </Link>

                <div>
                    {session ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition-colors">
                                <div className="w-8 h-8 relative rounded-full bg-gray-200 overflow-hidden shadow-sm">
                                    <Image src="/avatar.png" alt="User Avatar" fill className="object-cover" sizes="32px" />
                                </div>
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    Maruf ▾
                                </span>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow-lg bg-white border border-gray-100 rounded-box w-48 mt-2">
                                <li><Link href="/profile" className="text-gray-700 hover:text-emerald-700">👤 আমার প্রোফাইল</Link></li>
                                <li><button className="text-red-500 hover:text-red-600 w-full text-left">↩ সাইন আউট</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link href="/signin" className="text-sm font-bold text-gray-600 hover:text-emerald-700 px-2">সাইন ইন</Link>
                            <Link href="/signup" className="btn btn-sm bg-emerald-700 hover:bg-emerald-800 text-white border-none rounded-md px-5 font-bold">সাইন আপ</Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 sm:gap-4 w-max">
                    {categories.length === 0 ? (
                        <span className="text-sm text-gray-400">ক্যাটাগরি লোড হচ্ছে...</span>
                    ) : (
                        categories.map((category) => {
                            const isActive = pathname === `/category/${category.slug}`;
                            return (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${isActive
                                        ? "bg-emerald-700 text-white shadow-md"
                                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                                        }`}
                                >
                                    <span className="text-base">{category.icon}</span>
                                    <span>{category.nameBn}</span>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </nav>
    );
}