export default function Footer() {
  return (
    <footer className="w-full bg-[#eef5f1] border-t border-emerald-100 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <div className="font-medium text-emerald-800">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div className="text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
}