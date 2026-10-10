import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center px-4 py-12">

            {/* Header Outside Card */}
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            </div>

            {/* Main Form Card */}
            <div className="bg-white w-full max-w-md rounded-[1rem] p-6 sm:p-8 shadow-sm border border-gray-100">
                <form className="space-y-4">

                    <div className="form-control">
                        <label className="label pt-0 pb-1.5">
                            <span className="label-text font-semibold text-gray-700">নাম</span>
                        </label>
                        <input
                            type="text"
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
                            placeholder="আবার লিখুন"
                            className="input input-bordered w-full rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            required
                        />
                    </div>

                    <button
                        type="button"
                        className="btn w-full bg-[#059669] hover:bg-emerald-700 text-white border-none rounded-lg mt-2 font-bold"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                <div className="divider text-xs text-gray-400 my-6">অথবা</div>

                {/* Social Login Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button" className="btn flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-gray-700 font-medium shadow-none px-2 h-auto py-2.5 min-h-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 shrink-0">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        <span className="text-[13px] sm:text-sm">Google দিয়ে চালিয়ে যান</span>
                    </button>
                    <button type="button" className="btn flex-1 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-gray-700 font-medium shadow-none px-2 h-auto py-2.5 min-h-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        <span className="text-[13px] sm:text-sm">GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-8">
                    অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#059669] font-bold hover:underline">সাইন ইন করুন</Link>
                </p>
            </div>

            {/* Back Link */}
            <div className="mt-8">
                <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
}