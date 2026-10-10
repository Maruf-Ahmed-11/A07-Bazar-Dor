"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp, signIn } from "@/lib/auth-client"; // Importing auth client

export default function SignUpPage() {
    const router = useRouter();

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড মিলছে না!");
            return;
        }

        if (password.length < 8) {
            toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
            return;
        }

        setLoading(true);

        // BetterAuth Sign Up call
        await signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: () => {
                toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
                router.push("/"); 
                router.refresh();
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
                setLoading(false);
            }
        });
    };

    const handleSocialLogin = async (provider: "google" | "github") => {
        await signIn.social({
            provider,
            callbackURL: "/", // Redirect to home page after social login
        });
    };

    return (
        <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center px-4 py-12">

            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>

            <div className="bg-white w-full max-w-md rounded-[1rem] p-6 sm:p-8 shadow-sm border border-gray-100">
                <form onSubmit={handleRegister} className="space-y-4">

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-semibold text-gray-700">নাম</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="যেমন: রহিম উদ্দিন"
                            className="input input-bordered w-full rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-semibold text-gray-700">ইমেইল</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="input input-bordered w-full rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-semibold text-gray-700">পাসওয়ার্ড</span>
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            className="input input-bordered w-full rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-semibold text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</span>
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="আবার লিখুন"
                            className="input input-bordered w-full rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full bg-[#059669] hover:bg-emerald-700 text-white border-none rounded-lg mt-2 font-bold disabled:bg-emerald-700/60 disabled:text-white"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>
                </form>

                <div className="divider text-xs text-gray-400 my-6">অথবা</div>

                {/* Social Login Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        className="btn flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm px-4 h-[42px] min-h-0 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialLogin("github")}
                        className="btn flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm px-4 h-[42px] min-h-0 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                            <path fill="currentColor" d="M12 2A10 10 0 0 0 8.84 21.5c.5.08.66-.23.66-.5V19.31C6.73 19.91 6.14 18 6.14 18A2.69 2.69 0 0 0 5 16.5c-.91-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1 2.15 2.15 0 0 0 2.91.83 2.16 2.16 0 0 1 .63-1.34C8 16.17 5.62 15.31 5.62 11.5a3.87 3.87 0 0 1 1-2.71 3.58 3.58 0 0 1 .1-2.64s.84-.27 2.75 1a9.63 9.63 0 0 1 5 0c1.91-1.29 2.75-1 2.75-1a3.58 3.58 0 0 1 .1 2.64 3.87 3.87 0 0 1 1 2.71c0 3.82-2.34 4.66-4.57 4.91a2.39 2.39 0 0 1 .69 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2Z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-8">
                    অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#059669] font-bold hover:underline">সাইন ইন করুন</Link>
                </p>
            </div>

            <div className="mt-8">
                <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}