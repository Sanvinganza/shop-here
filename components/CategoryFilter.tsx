'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;

}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <div>
      <h3 className="mb-4">Категории</h3>
      <div className="space-y-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-black text-white shadow-md'
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
