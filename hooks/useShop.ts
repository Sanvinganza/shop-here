'use client';

import { useEffect, useState, useCallback } from 'react';
import { getShopConfig } from '@/config/shops';

export function useShop() {
  const [shopType, setShopType] = useState<'periphery' | 'clothing'>('clothing');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Загружаем из localStorage
    const savedShopType = localStorage.getItem('shopType') as 'periphery' | 'clothing';
    
    if (savedShopType && (savedShopType === 'periphery' || savedShopType === 'clothing')) {
      setShopType(savedShopType);
    }
    
    setIsLoading(false);
  }, []); // Только при монтировании

  // Обертка для setShopType с сохранением в localStorage
  const switchShop = useCallback((newShopType: 'periphery' | 'clothing') => {
    setShopType(newShopType);
    localStorage.setItem('shopType', newShopType);
    
    // Отправляем кастомное событие для синхронизации между вкладками
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'shopType',
      newValue: newShopType,
      storageArea: localStorage
    }));
    
    // Также отправляем наше событие для компонентов
    window.dispatchEvent(new Event('shopChanged'));
  }, []);

  const shop = getShopConfig(shopType);

  return {
    shop,
    shopType,
    isLoading,
    switchShop, // Исправлено: switchShop вместо setShopType
    setShopType: switchShop // Альтернативное имя для совместимости
  };
}