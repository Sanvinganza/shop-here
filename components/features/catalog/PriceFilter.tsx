'use client';

interface PriceFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export function PriceFilter({ priceRange, onPriceRangeChange }: PriceFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Цена</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>От: {priceRange[0].toLocaleString('ru-RU')} ₽</span>
          <span>До: {priceRange[1].toLocaleString('ru-RU')} ₽</span>
        </div>
        <div className="relative pt-1">
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="absolute top-0 w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
