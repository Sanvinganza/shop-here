'use client';

import React, { useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ToastContainer } from '@/components/Toast';
import { useAppState } from '@/app/[locale]/hooks/useAppStore';

// Lazy-load heavier sections to reduce initial bundle
const Cart = dynamic(() => import('@/components/Cart').then(m => m.Cart), { ssr: true });
const Checkout = dynamic(() => import('@/components/Checkout').then(m => m.Checkout), { ssr: true });
const OrderConfirmation = dynamic(() => import('@/components/OrderConfirmation').then(m => m.OrderConfirmation), { ssr: true });
const Favorites = dynamic(() => import('@/components/Favorites').then(m => m.Favorites), { ssr: true });
const Compare = dynamic(() => import('@/components/Compare').then(m => m.Compare), { ssr: true });

// Centralized view constants to avoid stringly-typed usage
const VIEWS = {
  CATALOG: 'catalog',
  CART: 'cart',
  CHECKOUT: 'checkout',
  CONFIRMATION: 'confirmation',
  FAVORITES: 'favorites',
  COMPARE: 'compare',
} as const;

// type View = typeof VIEWS[keyof typeof VIEWS];

export function MainContent() {
  const {
    view,
    setView,
    cart,
    totalPrice,
    favorites,
    compare,
    viewedProducts,
    toasts,
    setToasts,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isInCompare,
    addToViewed,
    removeFromFavorites,
    removeFromCompare,
    handleCheckout,
    orderNumber,
  } = useAppState();

  // Memoized handlers to avoid unnecessary re-renders
  const goToCheckout = useCallback(() => setView(VIEWS.CHECKOUT), [setView]);
  const goToCatalog = useCallback(() => setView(VIEWS.CATALOG), [setView]);
  const goToCart = useCallback(() => setView(VIEWS.CART), [setView]);

  const handleToastClose = useCallback((id: string | number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, [setToasts]);

  // Guard confirmation view when orderNumber is missing
  const canShowConfirmation = useMemo(() => Boolean(orderNumber), [orderNumber]);

  return (
    <>
      <main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        aria-label="Main content"
      >
        {view === VIEWS.CATALOG && (
          <ProductCatalog
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onViewProduct={addToViewed}
            isFavorite={isFavorite}
            isInCompare={isInCompare}
            viewedProducts={viewedProducts}
          />
        )}

        {view === VIEWS.CART && (
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onProceedToCheckout={goToCheckout}
            onContinueShopping={goToCatalog}
            totalPrice={totalPrice}
          />
        )}

        {view === VIEWS.CHECKOUT && (
          <Checkout
            cart={cart}
            totalPrice={totalPrice}
            onBack={goToCart}
            onSubmit={handleCheckout}
          />
        )}

        {view === VIEWS.CONFIRMATION && canShowConfirmation && (
          <OrderConfirmation
            orderNumber={orderNumber!}
            onContinueShopping={goToCatalog}
          />
        )}

        {view === VIEWS.FAVORITES && (
          <Favorites
            favorites={favorites}
            onAddToCart={addToCart}
            onRemoveFromFavorites={removeFromFavorites}
          />
        )}

        {view === VIEWS.COMPARE && (
          <Compare
            compare={compare}
            onAddToCart={addToCart}
            onRemoveFromCompare={removeFromCompare}
          />
        )}
      </main>

      <ToastContainer
        toasts={toasts}
        onClose={handleToastClose}
      />
    </>
  );
}