// TODO: API Placeholder - Later fetch this from /api/bazardor/products
const placeholderProducts = [
    { id: 1, name: "স্বর্ণমাছি চাল", price: "১৪৮", unit: "কেজি", change: 2.1, icon: "🍚" },
    { id: 2, name: "মিনিকেট চাল", price: "৯৯", unit: "কেজি", change: -2.9, icon: "🍚" },
    { id: 3, name: "বাটাম সাইজ চাল", price: "৬৬", unit: "কেজি", change: 3.1, icon: "🍚" },
    { id: 4, name: "মসুর ডাল", price: "১৪২", unit: "কেজি", change: 2.9, icon: "🫘" },
    { id: 5, name: "ছোলা", price: "১২০", unit: "কেজি", change: -2.4, icon: "🫘" },
    { id: 6, name: "আমন ডাল", price: "১৪৬", unit: "কেজি", change: 2.6, icon: "🫘" },
];

export default function PriceTicker() {
    // We duplicate the array 3 times to make the infinite scrolling loop perfectly smooth
    const marqueeItems = [...placeholderProducts, ...placeholderProducts, ...placeholderProducts];

    // Helper function to convert English numbers (2.1) to Bengali numerals (২.১)
    const toBengaliNumber = (num: number) => {
        return num.toLocaleString("bn-BD");
    };

    return (
        <div className="w-full bg-white border-b border-gray-100 overflow-hidden flex items-center h-10 relative">
            <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          animation: ticker 25s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

            <div className="animate-ticker">
                {marqueeItems.map((item, index) => {
                    const isUp = item.change > 0;
                    const isDown = item.change < 0;

                    return (
                        <div key={index} className="flex items-center gap-2 px-5 text-sm whitespace-nowrap">
                            <span className="text-gray-300 text-[10px]">●</span>

                            <span className="text-gray-600 font-medium ml-1">
                                {item.icon} {item.name}
                            </span>

                            <span className="text-gray-800">
                                {item.price} টাকা/{item.unit}
                            </span>

                            <span className={`flex items-center text-xs font-bold ${isUp ? "text-red-500" : isDown ? "text-emerald-600" : "text-gray-400"
                                }`}>
                                {isUp ? "▲ " : isDown ? "▼ " : "— "}
                                {toBengaliNumber(Math.abs(item.change))}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}