'use client';

import { useState, useCallback } from 'react';

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export function useSort(initialValue: SortOption = 'popularity') {
  const [sortBy, setSortBy] = useState<SortOption>(initialValue);

  // Обертка для использования с SortWidget
  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
  }, []);

  return {
    sortBy,
    setSortBy,
    handleSortChange
  };
}
