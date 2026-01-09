'use client';

import { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, X } from 'lucide-react';
import { CartItem } from '@/lib/types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
  isOpen = true
}: CartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalAmount = items.reduce(
    (sum, item) => sum + (item.product?.price || item.price || 0) * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
        isExpanded ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="text-xl font-bold">Корзина</h2>
                <span className="px-2 py-1 bg-neutral-100 rounded text-sm">
                  {totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-neutral-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                <p className="text-neutral-600">Добавьте товары из каталога</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-neutral-200 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={item.product?.image || '/placeholder-image.jpg'}
                        alt={item.product?.name || 'Товар'}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="mb-1">{item.product?.name || 'Без названия'}</h3>
                          <p className="text-neutral-600 text-sm mb-3">
                            {item.product?.category || 'Без категории'}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 hover:bg-neutral-100 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-neutral-500" />
                        </button>
                      </div>

                      {/* Size and Color */}
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="flex gap-2 mb-3">
                          {item.selectedSize && (
                            <span className="px-2 py-1 bg-neutral-100 rounded text-xs">
                              Размер: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="px-2 py-1 bg-neutral-100 rounded text-xs">
                              Цвет: {item.selectedColor}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-neutral-100 rounded"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="mb-1">
                            {((item.product?.price || item.price || 0) * item.quantity).toLocaleString('ru-RU')} ₽
                          </p>
                          <p className="text-sm text-neutral-500">
                            {(item.product?.price || item.price || 0).toLocaleString('ru-RU')} ₽ × {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-neutral-200 p-6">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold">Итого:</span>
                <span className="text-2xl font-bold">
                  {totalAmount.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors">
                Перейти к оформлению
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 border border-neutral-300 rounded-lg font-medium mt-3 hover:bg-neutral-50 transition-colors"
              >
                Продолжить покупки
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
