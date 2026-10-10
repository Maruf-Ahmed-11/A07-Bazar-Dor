import Link from "next/link";

export interface ProductProps {
  id: string | number;
  name: string;
  icon: string;
  unit: string;
  price: number;
  changeRate: number;
}

export default function ProductCard({ id, name, icon, unit, price, changeRate }: ProductProps) {
  // Helper to convert English numbers to Bengali numbers
  const toBengaliNumber = (num: number) => {
    return num.toLocaleString("bn-BD");
  };

  // Determine price fluctuation status
  const isUp = changeRate > 0;
  const isDown = changeRate < 0;
  
  // Format the change percentage to always show 1 decimal place positively
  const formattedChange = toBengaliNumber(Number(Math.abs(changeRate).toFixed(1)));

  return (
    <Link 
      href={`/product/${id}`}
      className="block bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer group"
    >
      {/* Top Section: Icon & Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:bg-emerald-50 transition-colors">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-0.5">{name}</h3>
          <p className="text-xs text-gray-500">{unit}</p>
        </div>
      </div>

      {/* Bottom Section: Price & Fluctuation Badge */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] text-gray-400 font-medium mb-1">আজকের দাম</p>
          <div className="flex items-baseline gap-1">
            <span className="font-extrabold text-gray-900 text-lg sm:text-xl leading-none">
              {toBengaliNumber(price)}
            </span>
            <span className="text-gray-600 text-sm font-medium">টাকা</span>
          </div>
        </div>

        {/* Change Rate Badge */}
        <div className={`flex items-center gap-0.5 text-xs font-bold ${
          isUp ? "text-red-500" : isDown ? "text-emerald-600" : "text-gray-400"
        }`}>
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{formattedChange}%</span>
        </div>
      </div>
    </Link>
  );
}