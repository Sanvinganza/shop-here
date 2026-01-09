'use client';

import { Star } from 'lucide-react';

interface RatingFilterProps {
  minRating: number;
  onMinRatingChange: (rating: number) => void;
}

export function RatingFilter({ minRating, onMinRatingChange }: RatingFilterProps) {
  const ratings = [4, 3, 2, 1, 0];

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Рейтинг</h3>
      <div className="space-y-1">
        {ratings.map(rating => (
          <button
            key={rating}
            onClick={() => onMinRatingChange(rating)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded text-sm ${
              minRating === rating
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span>{rating}+ звезд</span>
          </button>
        ))}
      </div>
    </div>
  );
}
