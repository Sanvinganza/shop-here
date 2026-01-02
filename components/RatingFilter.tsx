import { Star } from 'lucide-react';

interface RatingFilterProps {
  minRating: number;
  onMinRatingChange: (rating: number) => void;
}

export function RatingFilter({ minRating, onMinRatingChange }: RatingFilterProps) {
  const ratings = [4.5, 4.0, 3.5, 3.0];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3>Рейтинг</h3>
        {minRating > 0 && (
          <button
            onClick={() => onMinRatingChange(0)}
            className="text-xs text-neutral-500 hover:text-black transition-colors"
          >
            Сбросить
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => onMinRatingChange(0)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
            minRating === 0
              ? 'bg-black text-white'
              : 'hover:bg-neutral-100'
          }`}
        >
          Все товары
        </button>
        {ratings.map(rating => (
          <button
            key={rating}
            onClick={() => onMinRatingChange(rating)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
              minRating === rating
                ? 'bg-black text-white'
                : 'hover:bg-neutral-100'
            }`}
          >
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm">от {rating}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
