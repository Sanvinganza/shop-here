'use client';

import { useAppState } from '@/app/[locale]/hooks/useAppStore';
import { createContext, useContext, ReactNode } from 'react';

const AppStateContext = createContext<ReturnType<typeof useAppState> | null>(null);

interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const appState = useAppState();
  
  return (
    <AppStateContext.Provider value={appState}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppStateContext() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppStateContext must be used within AppStateProvider');
  }
  return context;
}