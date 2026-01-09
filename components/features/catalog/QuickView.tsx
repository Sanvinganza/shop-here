'use client';

import { X, ShoppingBag, Heart, BarChart } from 'lucide-react';
import { Product } from '@/lib/types';

interface QuickViewProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isFavorite: boolean;
  isInCompare: boolean;
}

export function QuickView({
  product,
  onClose,
  onAddToCart,
  onToggleFavorite,
  onToggleCompare,
  isFavorite,
  isInCompare
}: QuickViewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {product.price.toLocaleString('ru-RU')} ₽
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Цвета</h4>
                  <div className="flex gap-2">
                    {product.colors.map(color => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Размеры</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:border-primary"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => onAddToCart(product)}
                  className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  В корзину
                </button>
                <button
                  onClick={() => onToggleFavorite(product)}
                  className={`p-3 rounded-lg ${
                    isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-100'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => onToggleCompare(product)}
                  className={`p-3 rounded-lg ${
                    isInCompare ? 'bg-blue-50 text-blue-500' : 'bg-gray-100'
                  }`}
                >
                  <BarChart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
