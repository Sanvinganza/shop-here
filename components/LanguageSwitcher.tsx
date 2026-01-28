'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ReactCountryFlag from "react-country-flag";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  
  const getLocaleFromPath = () => {
    const segments = pathname.split('/').filter(Boolean);
    const localeInPath = segments[0];
    return ['ru', 'en', 'kk'].includes(localeInPath) ? localeInPath : 'ru';
  };
  
  const [selectedLocale, setSelectedLocale] = useState(getLocaleFromPath());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedLocale(getLocaleFromPath());
  }, [pathname]);

  const changeLanguage = (newLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    
    const currentLocaleInPath = segments[0];
    const hasLocale = ['ru', 'en', 'kk'].includes(currentLocaleInPath);
    
    let newSegments;
    if (hasLocale) {
      segments[0] = newLocale;
      newSegments = segments;
    } else {
      newSegments = [newLocale, ...segments];
    }
    
    const newPath = '/' + newSegments.join('/');
    
    setSelectedLocale(newLocale);
    setIsOpen(false);
    
    router.push(newPath);
    
    setTimeout(() => {
      router.refresh();
    }, 50);
  };
  const getLanguageTitle = (locale: string) => {
    switch(locale) {
      case 'ru': return 'Русский';
      case 'en': return 'English';
      case 'kk': return 'Қазақша';
      default: return 'Language';
    }
  };
  
  const getCountryCode = (locale: string) => {
    switch(locale) {
      case 'ru': return 'RU';
      case 'en': return 'US';
      case 'kk': return 'KZ';
      default: return 'RU';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2 hover:bg-neutral-100 rounded-lg transition-colors group"
          title={getLanguageTitle(selectedLocale)}
        >
          <ReactCountryFlag
            countryCode={getCountryCode(selectedLocale)}
            svg
            style={{
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        </button>
        
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            <div className="absolute top-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 min-w-[3.5rem]" style={{left: '-1em'}}>
              {(['ru', 'en', 'kk'] as const).map((locale) => {
                return (
                  <button
                    key={locale}
                    onClick={() => changeLanguage(locale)}
                    className={`flex items-center justify-center w-full p-3 hover:bg-neutral-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      selectedLocale === locale ? 'bg-neutral-100' : ''
                    }`}
                    title={getLanguageTitle(locale)}
                  >
                    <div className="relative">
                      <ReactCountryFlag
                        countryCode={getCountryCode(locale)}
                        svg
                        style={{
                          width: '1.5rem',
                          height: '1.5rem',
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}