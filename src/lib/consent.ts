import { useSyncExternalStore } from 'react';
import { PRIVACY_POLICY_VERSION } from './legal';

export const COOKIE_POLICY_VERSION = PRIVACY_POLICY_VERSION;
export const COOKIE_STORAGE_KEY = 'cookie-consent';
export const COOKIE_SETTINGS_EVENT = 'cyprus:open-cookie-settings';

export type ConsentSource = 'accept-all' | 'reject-all' | 'custom';

export interface CookieConsent {
  version: string;
  decidedAt: string;
  updatedAt: string;
  source: ConsentSource;
  categories: {
    essential: true;
    functional: boolean;
  };
}

const listeners = new Set<() => void>();
let currentConsent: CookieConsent | null = readConsent();

function readConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<CookieConsent>;
    if (
      value.version !== COOKIE_POLICY_VERSION ||
      typeof value.decidedAt !== 'string' ||
      !Number.isFinite(Date.parse(value.decidedAt)) ||
      typeof value.updatedAt !== 'string' ||
      !Number.isFinite(Date.parse(value.updatedAt)) ||
      !['accept-all', 'reject-all', 'custom'].includes(value.source || '') ||
      typeof value.categories?.functional !== 'boolean'
    ) {
      return null;
    }
    return {
      version: value.version,
      decidedAt: value.decidedAt,
      updatedAt: value.updatedAt,
      source: value.source as ConsentSource,
      categories: { essential: true, functional: value.categories.functional },
    };
  } catch {
    return null;
  }
}

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== COOKIE_STORAGE_KEY) return;
    currentConsent = readConsent();
    emitChange();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

export function useCookieConsent(): CookieConsent | null {
  return useSyncExternalStore(subscribe, () => currentConsent, () => null);
}

export function saveCookieConsent(functional: boolean, source: ConsentSource): boolean {
  const now = new Date().toISOString();
  const previous = currentConsent;
  const next: CookieConsent = {
    version: COOKIE_POLICY_VERSION,
    decidedAt: previous?.decidedAt || now,
    updatedAt: now,
    source,
    categories: { essential: true, functional },
  };
  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    return false;
  }
  currentConsent = next;
  emitChange();
  return true;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
