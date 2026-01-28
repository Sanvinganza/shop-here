'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { Product } from '@/app/[locale]/types';

interface CompareContextType {
  compare: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compare, setCompare] = useState<Product[]>([]);

  useEffect(() => {
    const savedCompare = localStorage.getItem('compare');
    if (savedCompare) {
      try {
        setCompare(JSON.parse(savedCompare));
      } catch (error) {
        console.error('Error parsing compare from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compare));
  }, [compare]);

  const toggleCompare = useCallback((product: Product) => {
    setCompare(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Можно сравнить не более 4 товаров');
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const isInCompare = useCallback((productId: string) => {
    return compare.some(p => p.id === productId);
  }, [compare]);

  const removeFromCompare = useCallback((productId: string) => {
    setCompare(prev => prev.filter(p => p.id !== productId));
  }, []);

  const value = {
    compare,
    toggleCompare,
    isInCompare,
    removeFromCompare,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}