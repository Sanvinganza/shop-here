'use client';

import { Favorites } from '@/components/Favorites';
import Link from 'next/link';
import { useFavorites } from '@/app/[locale]/favorites/context/FavoritesContext';
import { useCart } from '@/app/[locale]/cart/context/CartContext';
import { Header } from '@/components/Header';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

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
        
        <Favorites
          favorites={favorites}
          onAddToCart={addToCart}
          onRemoveFromFavorites={removeFromFavorites}
        />
      </main>
    </div>
  );
}