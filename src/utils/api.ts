import { auth } from '../config/firebase';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const token = await auth.currentUser?.getIdToken();
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });
}

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getProfile:   () => authFetch('/api/profile').then(r => json(r)),
  updateProfile: (data: unknown) =>
    authFetch('/api/profile', { method: 'PUT', body: JSON.stringify(data) }).then(r => json(r)),

  getAppointments: () => authFetch('/api/appointments').then(r => json(r)),
  createAppointment: (data: unknown) =>
    authFetch('/api/appointments', { method: 'POST', body: JSON.stringify(data) }).then(r => json(r)),
  cancelAppointment: (id: string) =>
    authFetch(`/api/appointments/${id}`, { method: 'DELETE' }).then(r => json(r)),

  getHistory: () => authFetch('/api/history').then(r => json(r)),
  saveHistory: (data: unknown) =>
    authFetch('/api/history', { method: 'POST', body: JSON.stringify(data) }).then(r => json(r)),
};
