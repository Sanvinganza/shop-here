import type { Metadata } from 'next'
import './globals.css';

export const metadata: Metadata = {
  title: 'Shop-Here - Интернет магазин одежды и обуви',
  description: 'Лучшие товары по доступным ценам',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}