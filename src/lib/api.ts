import type { Lead, Property } from './properties';

const TOKEN_KEY = 'cyprus.admin.token';

export const MAX_UPLOAD_MB = 8;

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null): void {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(path, { ...init, headers });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && typeof payload.error === 'string' ? payload.error : 'Ошибка запроса';
    if (response.status === 401) setToken(null);
    throw new ApiError(response.status, message);
  }
  return payload as T;
}

export const login = (password: string) =>
  request<{ token: string }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });

export const listProperties = () => request<Property[]>('/api/admin/properties');
export const saveProperty = (property: Property) =>
  request<Property>(`/api/admin/properties/${encodeURIComponent(property.slug)}`, {
    method: 'PUT',
    body: JSON.stringify(property),
  });
export const deleteProperty = (slug: string) =>
  request<{ ok: true }>(`/api/admin/properties/${encodeURIComponent(slug)}`, { method: 'DELETE' });

export const listLeads = () => request<Lead[]>('/api/admin/leads');
export const deleteLead = (id: string) =>
  request<{ ok: true }>(`/api/admin/leads/${encodeURIComponent(id)}`, { method: 'DELETE' });

export async function uploadImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('read-error'));
    reader.readAsDataURL(file);
  });
  const result = await request<{ url: string }>('/api/admin/upload', {
    method: 'POST',
    body: JSON.stringify({ dataUrl }),
  });
  return result.url;
}

export async function submitLead(input: {
  name: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
  propertySlug: string;
  website: string;
}): Promise<void> {
  await request<{ ok: true }>('/api/leads', { method: 'POST', body: JSON.stringify(input) });
}
