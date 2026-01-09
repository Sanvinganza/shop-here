'use client';

import { useState } from 'react';
import { ShopType, shops } from '@/config/shops';
import { Monitor, Shirt, ChevronDown } from 'lucide-react';
import { useShop } from '@/hooks/useShop';

export function ShopSwitcher() {
  const { shop, shopType, switchShop } = useShop();
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitch = (type: ShopType) => {
    switchShop(type);
    setIsOpen(false);
    // Можно обновить страницу для полной смены данных
    // window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{shop.icon}</span>
          <div className="text-left">
            <div className="font-medium text-sm">{shop.name}</div>
            <div className="text-xs text-gray-500">Сменить магазин</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 right-0 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">Выберите магазин:</div>
              
              <button
                onClick={() => handleSwitch('clothing')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  shopType === 'clothing' 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Shirt className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">UrbanStyle</div>
                  <div className="text-sm text-gray-500">Модная одежда</div>
                </div>
              </button>

              <button
                onClick={() => handleSwitch('periphery')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors mt-2 ${
                  shopType === 'periphery' 
                    ? 'bg-gray-100 border border-gray-300' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">GamerGear Pro</div>
                  <div className="text-sm text-gray-500">Игровая периферия</div>
                </div>
              </button>

              <div className="mt-3 pt-3 border-t border-gray-200 px-2">
                <div className="text-xs text-gray-500">
                  Настройка сохраняется в браузере
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
