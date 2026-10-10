import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/assets/logo-icon.png";

export default function SignUpPage() {
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
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">নতুন অ্যাকাউন্ট</h1>
                    <p className="text-gray-500 text-sm">বাজার দর-এ যোগ দিন</p>
                </div>

                {/* Form Section */}
                <form className="space-y-4">
                    {/* Name Field */}
                    <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-gray-700">পুরো নাম</span>
                        </label>
                        <input
                            type="text"
                            placeholder="আপনার নাম"
                            className="input input-bordered w-full focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors bg-gray-50/50"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5">
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
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-gray-700">পাসওয়ার্ড</span>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="input input-bordered w-full focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-colors bg-gray-50/50"
                            required
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-control w-full">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-bold text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</span>
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
                        className="btn w-full bg-emerald-700 hover:bg-emerald-800 text-white border-none mt-6 text-base font-bold rounded-xl shadow-sm"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                {/* Footer / Toggle to Sign In */}
                <p className="text-center text-sm text-gray-600 mt-8">
                    ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
                    <Link href="/signin" className="text-emerald-700 font-extrabold hover:underline">
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>
        </div>
    );
}