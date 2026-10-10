"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut, authClient } from "@/lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();

    // Fetching current session state
    const { data: session, isPending } = useSession();

    // Form state for the name input
    const [name, setName] = useState("");
    const [prevSessionName, setPrevSessionName] = useState("");
    const [updating, setUpdating] = useState(false);

    // Sync the input field WITHOUT useEffect to solves the linter error completely
    if (session?.user?.name && session.user.name !== prevSessionName) {
        setPrevSessionName(session.user.name);
        setName(session.user.name);
    }

    // Protect the route: Redirect to signin if a logged-out user tries to access /profile
    useEffect(() => {
        if (!isPending && !session) {
            router.push("/signin");
        }
    }, [isPending, session, router]);

    // --- Handlers ---
    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("সফলভাবে সাইন আউট হয়েছেন");
                    router.push("/signin");
                    router.refresh();
                }
            }
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("নাম খালি রাখা যাবে না");
            return;
        }

        setUpdating(true);

        // BetterAuth API to update the user profile in MongoDB
        const { error } = await authClient.updateUser({
            name: name
        });

        if (error) {
            toast.error(error.message || "প্রোফাইল আপডেট করতে সমস্যা হয়েছে");
        } else {
            toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
            router.refresh(); // Refresh to update the name in the Navbar instantly
        }

        setUpdating(false);
    };

    // --- UI Rendering ---

    // Show skeleton loader while checking authentication
    if (isPending) {
        return (
            <div className="min-h-[70vh] bg-[#f4f7f6] flex flex-col items-center pt-12 px-4">
                <div className="w-full max-w-2xl space-y-6">
                    <div className="skeleton h-8 w-48"></div>
                    <div className="skeleton h-32 w-full rounded-2xl"></div>
                    <div className="skeleton h-64 w-full rounded-2xl"></div>
                </div>
            </div>
        );
    }

    // Prevent rendering the page content if redirecting
    if (!session) return null;

    return (
        <div className="min-h-[70vh] bg-[#f4f7f6] pb-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">আমার প্রোফাইল</h1>
                    <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                {/* Top Card: Profile Info & Sign Out */}
                <div className="bg-white rounded-[1rem] p-6 sm:p-8 shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row items-center sm:justify-between gap-6">

                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
                        <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt={session?.user?.name || "User"} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-emerald-700 text-white font-bold text-2xl sm:text-xl">
                                    {session?.user?.name?.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{session?.user?.name}</h2>
                            <p className="text-sm text-gray-500 mt-0.5">{session?.user?.email}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="btn bg-white border border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600 rounded-lg px-6 h-10 min-h-0 text-sm font-bold flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>
                        সাইন আউট
                    </button>
                </div>

                {/* Bottom Card: Update Information */}
                <div className="bg-white rounded-[1rem] p-6 sm:p-8 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য</h3>

                    <form onSubmit={handleUpdate}>
                        <div className="form-control mb-6">
                            <label className="label pt-0 pb-1.5">
                                <span className="label-text font-semibold text-gray-700">নাম</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full rounded-lg focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={updating || name === session?.user?.name}
                            className="btn w-full bg-[#059669] hover:bg-emerald-700 text-white border-none rounded-lg mt-2 font-bold disabled:bg-emerald-700/60 disabled:text-white"
                        >
                            {updating ? <span className="loading loading-spinner loading-sm"></span> : "আপডেট"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}