'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { SortWidget } from './SortWidget';
import { SortOption } from '@/types/sort'; // Используем централизованный тип
import { PriceFilter } from './PriceFilter';
import { RatingFilter } from './RatingFilter';
import { StockFilter } from './StockFilter';
import { Pagination } from './Pagination';
import { QuickView } from './QuickView';
import { SlidersHorizontal } from 'lucide-react';

// Временные данные для тестирования
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Беспроводные наушники',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1624564039739-035817ba4098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaGVhZHBob25lc3xlbnwxfHx8fDE3NjU3MDIyODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Премиальные наушники с активным шумоподавлением',
    category: 'Аудио',
    popularity: 95,
    rating: 4.8,
    inStock: true,
    stockCount: 15
  },
  {
    id: '2',
    name: 'Смарт-часы',
    price: 24990,
    image: 'https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXRjaHxlbnwxfHx8fDE3NjU2ODE5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Современные часы с мониторингом здоровья',
    category: 'Аксессуары',
    popularity: 88,
    rating: 4.6,
    inStock: true,
    stockCount: 8
  }
];

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  isInCompare: (productId: string) => boolean;
  viewedProducts: Product[];
}

export function ProductCatalog({
  onAddToCart,
  onToggleFavorite,
  onToggleCompare,
  onViewProduct,
  isFavorite,
  isInCompare,
  viewedProducts
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const itemsPerPage = 6;

  // Получаем уникальные категории
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(PRODUCTS.map(p => p.category)));
    return ['Все', ...uniqueCategories];
  }, []);

  // Фильтрация и сортировка товаров
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS;

    // Фильтр по категории
    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Фильтр по поиску
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Фильтр по рейтингу
    if (minRating > 0) {
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Фильтр по наличию
    if (stockFilter === 'inStock') {
      filtered = filtered.filter(p => p.inStock);
    } else if (stockFilter === 'outOfStock') {
      filtered = filtered.filter(p => !p.inStock);
    }

    // Сортировка
    const sorted = [...filtered];
    switch (sortBy) {
      case 'popularity':
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Для newest можно добавить поле createdAt
        sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy, priceRange, minRating, stockFilter]);

  // Пагинация
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  // Сброс страницы при изменении фильтров
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, priceRange, minRating, stockFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Все');
    setPriceRange([0, 150000]);
    setMinRating(0);
    setStockFilter('all');
    setSortBy('popularity');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Каталог товаров</h1>
        <p className="text-neutral-600">Найдите идеальные товары для себя</p>
      </div>

      {/* Поиск и сортировка */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
          </button>
          <SortWidget value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Боковая панель фильтров */}
        <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:w-64 flex-shrink-0`}>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <PriceFilter
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
            <RatingFilter
              minRating={minRating}
              onMinRatingChange={setMinRating}
            />
            <StockFilter
              stockFilter={stockFilter}
              onStockFilterChange={setStockFilter}
            />
            <button
              onClick={handleResetFilters}
              className="w-full py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
            >
              Сбросить все фильтры
            </button>
          </div>
        </aside>

        {/* Сетка товаров */}
        <div className="flex-1">
          {paginatedProducts.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-neutral-600">
                Показано {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedProducts.length)} из {filteredAndSortedProducts.length} товаров
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleFavorite={onToggleFavorite}
                    onToggleCompare={onToggleCompare}
                    onQuickView={(p) => {
                      setQuickViewProduct(p);
                      onViewProduct(p);
                    }}
                    isFavorite={isFavorite(product.id)}
                    isInCompare={isInCompare(product.id)}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-neutral-600 mb-4">Товары не найдены</p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Просмотренные товары */}
      {viewedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6">Вы недавно смотрели</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {viewedProducts.slice(0, 6).map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setQuickViewProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded mb-2"
                />
                <p className="text-sm truncate">{product.name}</p>
                <p className="text-xs">{product.price.toLocaleString('ru-RU')} ₽</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Быстрый просмотр */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
          isFavorite={isFavorite(quickViewProduct.id)}
          isInCompare={isInCompare(quickViewProduct.id)}
        />
      )}
    </div>
  );
}
