import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="w-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

                {/* Breadcrumb Navigation */}
                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <Link href="/" className="hover:text-emerald-700 transition-colors">হোম</Link>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">আমার প্রোফাইল</span>
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Left Sidebar / Quick Info */}
                    <div className="w-full md:w-1/3">
                        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
                            <div className="w-24 h-24 relative mx-auto rounded-full bg-gray-200 overflow-hidden shadow-sm mb-4 border-4 border-emerald-50">
                                {/* Same avatar used in the Navbar */}
                                <Image
                                    src="/avatar.png"
                                    alt="User Avatar"
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">Maruf Ahmed</h2>
                            <p className="text-gray-500 text-sm mb-6">maruf@example.com</p>

                            <div className="flex flex-col gap-2">
                                <button className="btn w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-none justify-start shadow-none">
                                    👤 প্রোফাইল তথ্য
                                </button>
                                <button className="btn w-full bg-transparent hover:bg-gray-50 text-gray-600 border-none justify-start shadow-none">
                                    🔖 সংরক্ষিত পণ্য (শীঘ্রই আসছে)
                                </button>
                                <button className="btn w-full bg-transparent hover:bg-red-50 text-red-500 border-none justify-start shadow-none mt-4">
                                    ↩ সাইন আউট
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content / Settings Form */}
                    <div className="w-full md:w-2/3">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">অ্যাকাউন্ট সেটিংস</h3>

                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Name Field */}
                                    <div className="form-control w-full">
                                        <label className="label pt-0 pb-1.5">
                                            <span className="label-text font-bold text-gray-700">পুরো নাম</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Maruf Ahmed"
                                            className="input input-bordered w-full focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-gray-50/50"
                                        />
                                    </div>

                                    {/* Phone Field */}
                                    <div className="form-control w-full">
                                        <label className="label pt-0 pb-1.5">
                                            <span className="label-text font-bold text-gray-700">মোবাইল নম্বর</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="+880 1..."
                                            className="input input-bordered w-full focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-gray-50/50"
                                        />
                                    </div>
                                </div>

                                {/* Email Field (Disabled) */}
                                <div className="form-control w-full">
                                    <label className="label pt-0 pb-1.5">
                                        <span className="label-text font-bold text-gray-700">ইমেইল ঠিকানা</span>
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="maruf@example.com"
                                        disabled
                                        className="input input-bordered w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                    />
                                    <label className="label pb-0">
                                        <span className="label-text-alt text-gray-500">ইমেইল পরিবর্তন করতে সাপোর্টে যোগাযোগ করুন।</span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none px-8 font-bold rounded-xl shadow-sm"
                                    >
                                        পরিবর্তন সেভ করুন
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}