import { Product } from '@/app/[locale]/types';
import { X, ShoppingCart, Heart, GitCompare, Star, Package, PackageX } from 'lucide-react';

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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <h2>Быстрый просмотр</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Изображение */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg bg-neutral-100"
              />
              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                <span className="text-xs">{product.rating}</span>
              </div>
              {!product.inStock && (
                <div className="absolute bottom-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Под заказ
                </div>
              )}
            </div>

            {/* Информация */}
            <div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h3 className="mb-4">{product.name}</h3>
              <p className="text-neutral-600 mb-6">{product.description}</p>

              <div className="mb-6 pb-6 border-b border-neutral-200">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl">{product.price.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span>{product.rating} / 5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {product.inStock ? (
                      <>
                        <Package className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">В наличии: {product.stockCount} шт</span>
                      </>
                    ) : (
                      <>
                        <PackageX className="w-4 h-4 text-red-600" />
                        <span className="text-red-600">Под заказ</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  disabled={!product.inStock}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.inStock ? 'Добавить в корзину' : 'Недоступно'}</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onToggleFavorite(product)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors border ${
                      isFavorite
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 stroke-red-500' : ''}`} />
                    <span className="text-sm">{isFavorite ? 'В избранном' : 'В избранное'}</span>
                  </button>

                  <button
                    onClick={() => onToggleCompare(product)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors border ${
                      isInCompare
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <GitCompare className="w-5 h-5" />
                    <span className="text-sm">{isInCompare ? 'В сравнении' : 'Сравнить'}</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-sm mb-2">Характеристики</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Категория:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Рейтинг:</span>
                    <span>{product.rating} / 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Популярность:</span>
                    <span>{product.popularity}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
