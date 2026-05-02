"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './locales/en.json';
import bn from './locales/bn.json';

export type Locale = 'en' | 'bn';

const translations: Record<Locale, Record<string, any>> = { en, bn };

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
});

/**
 * Resolves a dot-separated key against a nested JSON object.
 * Falls back to English if the key is missing in the active locale,
 * and returns the key itself as a last resort.
 */
function resolveKey(obj: Record<string, any>, key: string): string | null {
  const parts = key.split('.');
  let val: any = obj;
  for (const k of parts) {
    if (val && typeof val === 'object' && k in val) {
      val = val[k];
    } else {
      return null;
    }
  }
  return typeof val === 'string' ? val : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('hayat-lang') as Locale | null;
    if (saved === 'bn' || saved === 'en') {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      document.body.setAttribute('data-lang', saved);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('hayat-lang', newLocale);
    document.documentElement.lang = newLocale;
    document.body.setAttribute('data-lang', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    // Try the current locale first
    const result = resolveKey(translations[locale], key);
    if (result !== null) return result;

    // Fallback to English
    if (locale !== 'en') {
      const fallback = resolveKey(translations.en, key);
      if (fallback !== null) return fallback;
    }

    // Last resort: return the key itself
    return key;
  }, [locale]);

  // SSR/hydration: render children immediately with default (en) locale.
  // After mount, the effect above will set the correct locale from localStorage.
  // This avoids the blank flash caused by visibility:hidden.

  return (
    <LanguageContext.Provider value={{ locale: mounted ? locale : 'en', setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
