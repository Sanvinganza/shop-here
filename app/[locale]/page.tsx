'use client';

import { Header } from '@/components/Header';
import { MainContent } from '@/components/MainContent';
import { AppStateProvider } from '@/providers/AppStateProvider';

export default function Page() {
  return (
    <AppStateProvider>
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <MainContent />
      </div>
    </AppStateProvider>
  );
}