import { useSyncExternalStore } from 'react';

export type Lang = 'id' | 'en';
export type Theme = 'light' | 'dark';

const LANG_KEY = 'qm_lang';
const THEME_KEY = 'qm_theme';
const PREF_EVENT = 'qm-prefs-change';

function getStoredLang(): Lang {
  if (typeof window === 'undefined') return 'id';
  const saved = window.localStorage.getItem(LANG_KEY);
  return saved === 'en' ? 'en' : 'id';
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem(THEME_KEY);
  return saved === 'dark' ? 'dark' : 'light';
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(PREF_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(PREF_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function setLang(next: Lang) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LANG_KEY, next);
  document.documentElement.lang = next;
  window.dispatchEvent(new CustomEvent(PREF_EVENT));
}

export function toggleLang() {
  setLang(getStoredLang() === 'id' ? 'en' : 'id');
}

export function setTheme(next: Theme) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(THEME_KEY, next);
  document.documentElement.setAttribute('data-theme', next);
  window.dispatchEvent(new CustomEvent(PREF_EVENT));
}

export function toggleTheme() {
  setTheme(getStoredTheme() === 'light' ? 'dark' : 'light');
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getStoredLang, () => 'id');
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getStoredTheme, () => 'light');
}
