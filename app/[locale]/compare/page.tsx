'use client';

import { GitCompare, Link } from 'lucide-react';
import { useCompare } from '@/app/[locale]/compare/context/CompareContext';
import { Header } from '@/components/Header';
import { Compare } from '@/components/Compare';
import { useCart } from '@/app/[locale]/cart/context/CartContext';

export default function ComparePage() {
  const { compare, removeFromCompare } = useCompare();
  const { addToCart } = useCart();

  if (compare.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <GitCompare className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
          <h2 className="mb-4">Список сравнения пуст</h2>
          <p className="text-neutral-600">Добавьте товары для сравнения характеристик</p>
        </div>
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-neutral-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            href="/" 
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            ← Вернуться к покупкам
          </Link>
          <h1 className="text-2xl font-bold mt-4">Избранное</h1>
        </div>
        
        <Compare
          compare={compare}
          onAddToCart={addToCart}
          onRemoveFromCompare={removeFromCompare}
        />
      </main>
    </div>
  );
}
