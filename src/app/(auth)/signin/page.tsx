"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client"; 

export default function SignInPage() {
    const router = useRouter();

    // Form State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await signIn.email({
            email,
            password,
        }, {
            onSuccess: () => {
                toast.success("সফলভাবে সাইন ইন হয়েছে!");
                setLoading(false); 
                window.location.href = "/"; 
            },
            onError: (ctx) => {
                toast.error(ctx.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।");
                setLoading(false);
            }
        });
    };

    const handleSocialLogin = async (provider: "google" | "github") => {
        await signIn.social({
            provider,
            callbackURL: "/", 
        });
    };

    return (
        <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center px-4 py-12">

            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">সাইন ইন</h1>
                <p className="text-sm text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>

            <div className="bg-white w-full max-w-md rounded-[1rem] p-6 sm:p-8 shadow-sm border border-gray-100">
                <form onSubmit={handleLogin} className="space-y-4">

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

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn w-full bg-[#059669] hover:bg-emerald-700 text-white border-none rounded-lg mt-2 font-bold disabled:bg-emerald-700/60 disabled:text-white"
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : "সাইন ইন"}
                    </button>
                </form>

                <div className="divider text-xs text-gray-400 my-6">অথবা</div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        className="btn flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm px-4 h-[42px] min-h-0 flex items-center justify-center gap-2"
                    >
                        {/* Official Google Brand SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                        </svg>
                        Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialLogin("github")}
                        className="btn flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-gray-700 font-medium shadow-sm px-4 h-[42px] min-h-0 flex items-center justify-center gap-2"
                    >
                        {/* Official GitHub Brand SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        GitHub
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-8">
                    অ্যাকাউন্ট নেই? <Link href="/signup" className="text-[#059669] font-bold hover:underline">সাইন আপ করুন</Link>
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