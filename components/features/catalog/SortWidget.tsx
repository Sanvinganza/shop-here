'use client';

import { SortOption } from '@/types/sort';

interface SortWidgetProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortWidget({ value, onChange }: SortWidgetProps) {
  const sortOptions = [
    { value: 'popularity', label: 'По популярности' },
    { value: 'price-asc', label: 'По возрастанию цены' },
    { value: 'price-desc', label: 'По убыванию цены' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'newest', label: 'Сначала новые' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as SortOption);
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[200px]"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}

// Экспортируем тип для использования в других файлах
export type { SortOption };
