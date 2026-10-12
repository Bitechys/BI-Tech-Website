import en from './en';
import ar from './ar';

export type Lang = 'en' | 'ar';
export const LANGS: Lang[] = ['en', 'ar'];

const dicts = { en, ar };

export function getDict(lang: Lang) {
  return dicts[lang];
}

/**
 * Path of the home page for a language under a base (live: '', preview: '/preview/connect').
 * Always ends with a slash (trailingSlash: 'always').
 */
export function homePath(lang: Lang, base = '') {
  return `${base}/${lang === 'ar' ? 'ar/' : ''}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'ar' : 'en';
}

/** Western digits are used in both languages (common in Gulf business sites); format numbers here if that changes. */
export function num(n: number | string) {
  return String(n);
}
