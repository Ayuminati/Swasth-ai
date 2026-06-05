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

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

const FALLBACK_LOCATION = { lat: 30.900965, lng: 75.857277 }; // Ludhiana
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const SEARCH_RADIUS_M = 5000;
const FETCH_TIMEOUT_MS = 30_000;

export interface LocationResult {
  lat: number;
  lng: number;
  isFallback: boolean;
}

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

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getSpecialization(tags: Record<string, string>): string {
  if (tags['healthcare:speciality']) {
    const s = tags['healthcare:speciality'];
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  if (tags.amenity === 'hospital'  || tags.healthcare === 'hospital')  return 'Hospital';
  if (tags.amenity === 'clinic'    || tags.healthcare === 'clinic')    return 'Clinic';
  if (tags.amenity === 'doctors'   || tags.healthcare === 'doctor')    return 'Doctors';
  if (tags.amenity === 'pharmacy'  || tags.healthcare === 'pharmacy')  return 'Pharmacy';
  return 'Medical Facility';
}

export const searchPlaces = async (
  location?: { lat: number; lng: number }
): Promise<Doctor[]> => {
  const { lat, lng } = location ?? FALLBACK_LOCATION;

  const overpassQuery = `
[out:json][timeout:25];
(
  node["amenity"~"^(clinic|hospital|doctors|pharmacy)$"]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
  way["amenity"~"^(clinic|hospital|doctors|pharmacy)$"]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
  node["healthcare"~"^(doctor|clinic|hospital|pharmacy)$"]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
  way["healthcare"~"^(doctor|clinic|hospital|pharmacy)$"]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
);
out body center 40;`.trim();

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(overpassQuery)}`,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(tid);
  }

  if (!response.ok) throw new Error(`OpenStreetMap API error (${response.status}). Try again shortly.`);

  const data: { elements: OverpassElement[] } = await response.json();

  type WithDist = Doctor & { _dist: number };

  const results: WithDist[] = data.elements
    .filter(el => el.tags?.name)
    .map((el): WithDist | null => {
      const elLat = el.type === 'way' ? el.center?.lat : el.lat;
      const elLng = el.type === 'way' ? el.center?.lon : el.lon;
      if (elLat == null || elLng == null) return null;

      const dist = haversineKm(lat, lng, elLat, elLng);
      const tags = el.tags!;
      const addrParts = [
        tags['addr:housenumber'],
        tags['addr:street'],
        tags['addr:suburb'],
        tags['addr:city'],
      ].filter(Boolean);

      return {
        id: `osm-${el.type}-${el.id}`,
        name: tags.name,
        specialization: getSpecialization(tags),
        distance: dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`,
        _dist: dist,
        rating: 0,
        userRatingsTotal: 0,
        openNow: !tags.opening_hours || tags.opening_hours === '24/7',
        address: addrParts.length > 0 ? addrParts.join(', ') : 'View location on map',
        phone: tags.phone ?? tags['contact:phone'] ?? tags['contact:mobile'],
        lat: elLat,
        lng: elLng,
      };
    })
    .filter((d): d is WithDist => d !== null)
    .sort((a, b) => a._dist - b._dist)
    .slice(0, 30);

  // Strip the internal _dist field before returning
  return results.map(({ _dist: _, ...doc }) => doc);
};
