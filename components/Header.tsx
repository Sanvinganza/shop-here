'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useCart } from '@/app/[locale]/cart/context/CartContext';
import { useFavorites } from '@/app/[locale]/favorites/context/FavoritesContext';
import { GitCompare, Heart, ShoppingCart } from 'lucide-react';
import { useCompare } from '@/app/[locale]/compare/context/CompareContext';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('header');
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const { compare } = useCompare();

  return (
    <header className="bg-neutral-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="text-xl tracking-tight hover:text-neutral-700"
            >
              {t('logo')}
            </Link>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-2">
            <Link className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors" href={`/${locale}/favorites`}>
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 stroke-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors" href={`/${locale}/compare`}>
              <GitCompare className="w-6 h-6" />
              {compare.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {compare.length}
                </span>
              )}
            </Link>
            <Link className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors" href={`/${locale}/cart`}>
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}