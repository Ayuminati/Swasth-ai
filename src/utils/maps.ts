export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  distance: string;
  rating: number;
  userRatingsTotal: number;
  openNow: boolean;
  address: string;
  photoUrl?: string;
  phone?: string;
  lat: number;
  lng: number;
}

export interface LocationResult {
  lat: number;
  lng: number;
  isFallback: boolean;
}

const FALLBACK_LOCATION = { lat: 30.900965, lng: 75.857277 }; // Ludhiana
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getUserLocation = (): Promise<LocationResult> =>
  new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ ...FALLBACK_LOCATION, isFallback: true });
      return;
    }
    const tid = setTimeout(
      () => resolve({ ...FALLBACK_LOCATION, isFallback: true }),
      8000
    );
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(tid);
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, isFallback: false });
      },
      () => {
        clearTimeout(tid);
        resolve({ ...FALLBACK_LOCATION, isFallback: true });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  });

export const searchPlaces = async (
  location?: { lat: number; lng: number },
  specialty?: string,
): Promise<Doctor[]> => {
  const { lat, lng } = location ?? FALLBACK_LOCATION;
  const params = new URLSearchParams({ lat: String(lat), lng: String(lng) });
  if (specialty && specialty !== 'All') params.set('specialty', specialty.toLowerCase());

  const res = await fetch(`${BASE_URL}/api/doctors?${params}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Failed to fetch doctors (${res.status})`);
  }
  return res.json() as Promise<Doctor[]>;
};
