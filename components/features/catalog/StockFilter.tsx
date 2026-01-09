'use client';

interface StockFilterProps {
  stockFilter: 'all' | 'inStock' | 'outOfStock';
  onStockFilterChange: (filter: 'all' | 'inStock' | 'outOfStock') => void;
}

export function StockFilter({ stockFilter, onStockFilterChange }: StockFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Наличие</h3>
      <div className="space-y-1">
        {(['all', 'inStock', 'outOfStock'] as const).map(filter => (
          <button
            key={filter}
            onClick={() => onStockFilterChange(filter)}
            className={`block w-full text-left px-3 py-2 rounded text-sm ${
              stockFilter === filter
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {filter === 'all' && 'Все товары'}
            {filter === 'inStock' && 'В наличии'}
            {filter === 'outOfStock' && 'Нет в наличии'}
          </button>
        ))}
      </div>
    </div>
  );
}
