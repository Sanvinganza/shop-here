import { GitCompare } from 'lucide-react';

interface CompareButtonProps {
  onClick: () => void;
  count: number;
}

export function CompareButton({ onClick, count }: CompareButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      title="Сравнение"
    >
      <GitCompare className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}