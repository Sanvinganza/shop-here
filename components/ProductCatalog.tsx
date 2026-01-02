import { useState, useMemo } from 'react';
import { Product } from '../app/page';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { SearchBar } from './SearchBar';
import { SortWidget } from './SortWidget';
import { PriceFilter } from './PriceFilter';
import { RatingFilter } from './RatingFilter';
import { StockFilter } from './StockFilter';
import { Pagination } from './Pagination';
import { QuickView } from './QuickView';
import { SlidersHorizontal } from 'lucide-react';

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
  },
  {
    id: '3',
    name: 'Портативная колонка',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1674303324806-7018a739ed11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMHNwZWFrZXJ8ZW58MXx8fHwxNzY1Njc2MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Мощная беспроводная колонка с глубоким басом',
    category: 'Аудио',
    popularity: 78,
    rating: 4.4,
    inStock: true,
    stockCount: 25
  },
  {
    id: '4',
    name: 'Ноутбук Pro',
    price: 89990,
    image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjU3NzQ5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Мощный ноутбук для работы и творчества',
    category: 'Компьютеры',
    popularity: 92,
    rating: 4.9,
    inStock: true,
    stockCount: 5
  },
  {
    id: '5',
    name: 'Смартфон X',
    price: 54990,
    image: 'https://images.unsplash.com/photo-1732998360037-4857039d77a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2NTc2OTY1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Флагманский смартфон с продвинутой камерой',
    category: 'Телефоны',
    popularity: 98,
    rating: 4.7,
    inStock: false,
    stockCount: 0
  },
  {
    id: '6',
    name: 'Профессиональная камера',
    price: 129990,
    image: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY1NjkxNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Беззеркальная камера для профессионалов',
    category: 'Фото',
    popularity: 85,
    rating: 4.9,
    inStock: true,
    stockCount: 3
  },
  {
    id: '7',
    name: 'Механическая клавиатура',
    price: 15990,
    image: 'https://images.unsplash.com/photo-1705488387173-b3e4890259ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXlib2FyZCUyMG1lY2hhbmljYWx8ZW58MXx8fHwxNzY1NzY3NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'RGB клавиатура с переключателями Cherry MX',
    category: 'Компьютеры',
    popularity: 82,
    rating: 4.5,
    inStock: true,
    stockCount: 12
  },
  {
    id: '8',
    name: 'Игровая мышь',
    price: 6990,
    image: 'https://images.unsplash.com/photo-1594008671689-8d8b9480cae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VzZSUyMGdhbWluZ3xlbnwxfHx8fDE3NjU3OTA0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Эргономичная мышь с высоким DPI',
    category: 'Компьютеры',
    popularity: 75,
    rating: 4.3,
    inStock: true,
    stockCount: 30
  },
  {
    id: '9',
    name: 'Монитор 4K',
    price: 45990,
    image: 'https://images.unsplash.com/photo-1668979324665-7218b59db345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25pdG9yJTIwZGlzcGxheXxlbnwxfHx8fDE3NjU3MTEzNTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Профессиональный монитор с IPS панелью',
    category: 'Компьютеры',
    popularity: 90,
    rating: 4.8,
    inStock: true,
    stockCount: 7
  },
  {
    id: '10',
    name: 'Планшет Pro',
    price: 64990,
    image: 'https://images.unsplash.com/photo-1760708369071-e8a50a8979cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2V8ZW58MXx8fHwxNzY1NjY1NDk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Планшет с поддержкой стилуса для творчества',
    category: 'Телефоны',
    popularity: 87,
    rating: 4.7,
    inStock: false,
    stockCount: 0
  },
  {
    id: '11',
    name: 'Беспроводные наушники-вкладыши',
    price: 9990,
    image: 'https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHN8ZW58MXx8fHwxNzY1NzA4NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Компактные наушники с зарядным кейсом',
    category: 'Аудио',
    popularity: 93,
    rating: 4.6,
    inStock: true,
    stockCount: 20
  },
  {
    id: '12',
    name: 'Фитнес-браслет',
    price: 4990,
    image: 'https://images.unsplash.com/photo-1532435109783-fdb8a2be0baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHdhdGNoJTIwZml0bmVzc3xlbnwxfHx8fDE3NjU2OTA4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Водонепроницаемый браслет с GPS',
    category: 'Аксессуары',
    popularity: 72,
    rating: 4.2,
    inStock: true,
    stockCount: 18
  }
];

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating';

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
