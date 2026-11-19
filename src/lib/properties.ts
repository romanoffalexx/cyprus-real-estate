import seed from '../../data/properties.seed.json';

export type Currency = 'EUR' | 'GBP' | 'USD';

export interface PropertyArea {
  label: string;
  size: number | null;
}

export interface Property {
  slug: string;
  name: string;
  type: string;
  developer: string;
  district: string;
  completionYear: string;
  priceFrom: number | null;
  currency: Currency;
  badge: string;
  shortDescription: string;
  description: string;
  areas: PropertyArea[];
  saleTypes: string[];
  images: string[];
  floorPlans: string[];
  lat: number | null;
  lng: number | null;
  pdfUrl: string;
  published: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertySlug: string;
  message: string;
  createdAt: string;
}

export const CURRENCIES: Currency[] = ['EUR', 'GBP', 'USD'];

const CURRENCY_SYMBOLS: Record<Currency, string> = { EUR: '€', GBP: '£', USD: '$' };

export function currencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency] ?? CURRENCY_SYMBOLS.EUR;
}

export function formatPrice(price: number | null, currency: Currency): string {
  if (price === null || !Number.isFinite(price)) return '';
  return `${currencySymbol(currency)}${new Intl.NumberFormat('ru-RU').format(price)}`;
}

export function propertyImage(property: Property): string {
  return property.images[0] ?? '/images/hero.jpg';
}

export function developerOptions(items: Property[]): string[] {
  const names = items.map((item) => item.developer).filter(Boolean);
  return [...new Set(names)].sort((a, b) => a.localeCompare(b, 'ru'));
}

export function filterByDeveloper(items: Property[], developer: string): Property[] {
  if (!developer) return items;
  return items.filter((item) => item.developer === developer);
}

export function emptyProperty(): Property {
  return {
    slug: '',
    name: '',
    type: '',
    developer: '',
    district: '',
    completionYear: '',
    priceFrom: null,
    currency: 'EUR',
    badge: '',
    shortDescription: '',
    description: '',
    areas: [],
    saleTypes: [],
    images: [],
    floorPlans: [],
    lat: null,
    lng: null,
    pdfUrl: '',
    published: false,
  };
}

const seedProperties = seed as Property[];

type FetchState = 'ok' | 'not-found' | 'unavailable';

async function getJson<T>(url: string): Promise<{ state: FetchState; data: T | null }> {
  try {
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (response.status === 404) return { state: 'not-found', data: null };
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { state: 'ok', data: (await response.json()) as T };
  } catch {
    return { state: 'unavailable', data: null };
  }
}

function onApiUnavailable(): never {
  throw new Error('CATALOG_UNAVAILABLE');
}

export async function fetchProperties(): Promise<Property[]> {
  const result = await getJson<Property[]>('/api/properties');
  if (result.state === 'ok') return result.data as Property[];
  // Без запущенного API локально каталог остаётся на демо-данных.
  if (import.meta.env.DEV) return seedProperties.filter((item) => item.published);
  return onApiUnavailable();
}

export async function fetchProperty(slug: string): Promise<Property | null> {
  const result = await getJson<Property>(`/api/properties/${encodeURIComponent(slug)}`);
  if (result.state === 'ok') return result.data as Property;
  if (result.state === 'not-found') return null;
  if (import.meta.env.DEV) {
    return seedProperties.find((item) => item.slug === slug && item.published) ?? null;
  }
  return onApiUnavailable();
}
