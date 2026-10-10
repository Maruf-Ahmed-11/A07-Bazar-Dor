import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">৪০৪ - পেজ পাওয়া যায়নি</h2>
      <p className="text-gray-600 mb-8">আপনি যে পেজটি খুঁজছেন তা হয়তো ডিলিট হয়ে গেছে বা লিঙ্কটি ভুল।</p>
      <Link href="/" className="btn bg-emerald-700 hover:bg-emerald-800 text-white border-none">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}