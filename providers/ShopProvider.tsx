'use client';

import { ReactNode } from 'react';
import { useShop } from '@/hooks/useShop';

export function ShopProvider({ children }: { children: ReactNode }) {
  const shop = useShop();

  if (shop.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка магазина...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
