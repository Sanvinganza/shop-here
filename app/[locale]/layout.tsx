import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';

import { CartProvider } from '@/app/[locale]/cart/context/CartContext';
import { FavoritesProvider } from '@/app/[locale]/favorites/context/FavoritesContext';
import { CompareProvider } from '@/app/[locale]/compare/context/CompareContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <FavoritesProvider>
              <CompareProvider>
                {children}
              </CompareProvider>
            </FavoritesProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}