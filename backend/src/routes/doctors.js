import { Router } from 'express';

const router = Router();
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const SEARCH_RADIUS_M = 5000;
const FETCH_TIMEOUT_MS = 30_000;
const FALLBACK_LOCATION = { lat: 30.900965, lng: 75.857277 }; // Ludhiana

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getSpecialization(tags) {
  if (tags['healthcare:speciality']) {
    const s = tags['healthcare:speciality'];
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  if (tags.amenity === 'hospital' || tags.healthcare === 'hospital') return 'Hospital';
  if (tags.amenity === 'clinic'   || tags.healthcare === 'clinic')   return 'Clinic';
  if (tags.amenity === 'doctors'  || tags.healthcare === 'doctor')   return 'Doctors';
  if (tags.amenity === 'pharmacy' || tags.healthcare === 'pharmacy') return 'Pharmacy';
  return 'Medical Facility';
}

const ALL_TYPES = {
  amenity:    '~"^(clinic|hospital|doctors|pharmacy)$"',
  healthcare: '~"^(doctor|clinic|hospital|pharmacy)$"',
};

const SPECIALTY_MAP = {
  hospital: { amenity: '"hospital"', healthcare: '"hospital"' },
  clinic:   { amenity: '"clinic"',   healthcare: '"clinic"' },
  doctors:  { amenity: '"doctors"',  healthcare: '"doctor"' },
  pharmacy: { amenity: '"pharmacy"', healthcare: '"pharmacy"' },
};

router.get('/', async (req, res) => {
  const lat = parseFloat(req.query.lat) || FALLBACK_LOCATION.lat;
  const lng = parseFloat(req.query.lng) || FALLBACK_LOCATION.lng;
  const specialty = req.query.specialty?.toLowerCase();

  const filters = (specialty && specialty !== 'all' && SPECIALTY_MAP[specialty])
    ? SPECIALTY_MAP[specialty]
    : ALL_TYPES;

  const query = `
[out:json][timeout:25];
(
  node["amenity"${filters.amenity}]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
  way["amenity"${filters.amenity}]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
  node["healthcare"${filters.healthcare}]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
  way["healthcare"${filters.healthcare}]["name"](around:${SEARCH_RADIUS_M},${lat},${lng});
);
out body center 40;`.trim();

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const upstream = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`,
      signal: controller.signal,
    });
    clearTimeout(tid);

    if (!upstream.ok) {
      return res.status(502).json({ error: `OpenStreetMap API error (${upstream.status})` });
    }

    const data = await upstream.json();

    const doctors = data.elements
      .filter(el => el.tags?.name)
      .map(el => {
        const elLat = el.type === 'way' ? el.center?.lat : el.lat;
        const elLng = el.type === 'way' ? el.center?.lon : el.lon;
        if (elLat == null || elLng == null) return null;

        const dist = haversineKm(lat, lng, elLat, elLng);
        const tags = el.tags;
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
          phone: tags.phone ?? tags['contact:phone'] ?? tags['contact:mobile'] ?? null,
          lat: elLat,
          lng: elLng,
        };
      })
      .filter(d => d !== null)
      .sort((a, b) => a._dist - b._dist)
      .slice(0, 30)
      .map(({ _dist, ...doc }) => doc);

    res.json(doctors);
  } catch (err) {
    clearTimeout(tid);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Request to OpenStreetMap timed out. Please try again.' });
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;
