import { Heart } from 'lucide-react';

interface FavoritesButtonProps {
  onClick: () => void;
  count: number;
}

export function FavoritesButton({ onClick, count }: FavoritesButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      title="Избранное"
    >
      <Heart className={`w-6 h-6 ${count > 0 ? 'fill-red-500 stroke-red-500' : ''}`} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}