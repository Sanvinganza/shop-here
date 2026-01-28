import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '@/app/i18n/config';
import { Language } from '@/app/[locale]/types';

export default getRequestConfig(async ({locale}) => {
  if (!locale || !locales.includes(locale as Language)) {
    locale = defaultLocale;
  }
  
  return {
    locale: locale as Language,
    messages: (await import(`../../public/locales/${locale}/common.json`)).default
  };
});