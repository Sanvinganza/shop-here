'use client';

import { useState, useEffect } from 'react';

interface PriceFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

export function PriceFilter({ priceRange, onPriceRangeChange }: PriceFilterProps) {
  const [localRange, setLocalRange] = useState(priceRange);
  const minPrice = 0;
  const maxPrice = 150000;

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, localRange[1] - 1000);
    setLocalRange([newMin, localRange[1]]);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, localRange[0] + 1000);
    setLocalRange([localRange[0], newMax]);
  };

  const handleApply = () => {
    onPriceRangeChange(localRange);
  };

  const handleReset = () => {
    const defaultRange: [number, number] = [minPrice, maxPrice];
    setLocalRange(defaultRange);
    onPriceRangeChange(defaultRange);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3>Цена</h3>
        <button
          onClick={handleReset}
          className="text-xs text-neutral-500 hover:text-black transition-colors"
        >
          Сбросить
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-neutral-600">От</label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1000}
            value={localRange[0]}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-full accent-black"
          />
          <div className="text-sm bg-neutral-100 px-3 py-2 rounded">
            {localRange[0].toLocaleString('ru-RU')} ₽
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-neutral-600">До</label>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1000}
            value={localRange[1]}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-full accent-black"
          />
          <div className="text-sm bg-neutral-100 px-3 py-2 rounded">
            {localRange[1].toLocaleString('ru-RU')} ₽
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md"
        >
          Применить
        </button>
      </div>
    </div>
  );
}
