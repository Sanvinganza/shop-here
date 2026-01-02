import { Package, PackageX } from 'lucide-react';

interface StockFilterProps {
  stockFilter: 'all' | 'inStock' | 'outOfStock';
  onStockFilterChange: (filter: 'all' | 'inStock' | 'outOfStock') => void;
}

export function StockFilter({ stockFilter, onStockFilterChange }: StockFilterProps) {
  return (
    <div>
      <h3 className="mb-4">Наличие</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onStockFilterChange('all')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
            stockFilter === 'all'
              ? 'bg-black text-white'
              : 'hover:bg-neutral-100'
          }`}
        >
          Все товары
        </button>
        <button
          onClick={() => onStockFilterChange('inStock')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
            stockFilter === 'inStock'
              ? 'bg-black text-white'
              : 'hover:bg-neutral-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span className="text-sm">В наличии</span>
        </button>
        <button
          onClick={() => onStockFilterChange('outOfStock')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
            stockFilter === 'outOfStock'
              ? 'bg-black text-white'
              : 'hover:bg-neutral-100'
          }`}
        >
          <PackageX className="w-4 h-4" />
          <span className="text-sm">Под заказ</span>
        </button>
      </div>
    </div>
  );
}
