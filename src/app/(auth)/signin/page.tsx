import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/assets/logo-icon.png";

export default function SignInPage() {
    return (
        <div className="w-full min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white max-w-md w-full rounded-[2rem] p-8 sm:p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">

                {/* Header Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 relative bg-emerald-700 rounded-xl flex items-center justify-center overflow-hidden shadow-sm mb-4">
                        <Image
                            src={logoIcon}
                            alt="বাজার দর Logo"
                            fill
                            className="object-cover"
                            sizes="56px"
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">স্বাগতম!</h1>
                    <p className="text-gray-500 text-sm">আপনার অ্যাকাউন্টে সাইন ইন করুন</p>
                </div>

                {/* Form Section */}
                <form className="space-y-5">
                    {/* Email Field */}
                    <div className="form-control w-full">
                        <label className="label pt-0">
                            <span className="label-text font-bold text-gray-700">ইমেইল ঠিকানা</span>
                        </label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="input input-bordered w-full focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors bg-gray-50/50"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-control w-full">
                        <label className="label pt-0">
                            <span className="label-text font-bold text-gray-700">পাসওয়ার্ড</span>
                            {/* Note: a dummy link for now */}
                            <a href="#" className="label-text-alt text-emerald-700 font-bold hover:underline">
                                পাসওয়ার্ড ভুলে গেছেন?
                            </a>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors bg-gray-50/50"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        className="btn w-full bg-emerald-700 hover:bg-emerald-800 text-white border-none mt-4 text-base font-bold rounded-xl shadow-sm"
                    >
                        সাইন ইন করুন
                    </button>
                </form>

                {/* Footer / Toggle to Sign Up */}
                <p className="text-center text-sm text-gray-600 mt-8">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/signup" className="text-emerald-700 font-extrabold hover:underline">
                        নতুন অ্যাকাউন্ট তৈরি করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}