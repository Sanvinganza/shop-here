export const locales = ['en', 'ru', 'kk'] as const;
export const defaultLocale = 'ru' as const;
export type Locale = (typeof locales)[number];

export const localePrefix = 'always' as const;