import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, MapPin, Star, Phone, Navigation, Loader2, AlertCircle, LocateFixed, CalendarPlus, X, Stethoscope } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getUserLocation, searchPlaces } from '../utils/maps';
import type { Doctor } from '../utils/maps';
import { useApp } from '../contexts/AppContext';
import { translations } from '../i18n/translations';
import AppointmentModal from '../components/AppointmentModal';

const SPECIALTIES = ['All', 'Hospital', 'Clinic', 'Doctors', 'Pharmacy'];

interface SymptomState {
  conditions: string[];
  urgency: 'Green' | 'Yellow' | 'Red';
}

function cleanPhone(raw: string): string {
  return raw.replace(/[^\d+]/g, '');
}

export default function FindDoctors() {
  const { language } = useApp();
  const T = translations[language];
  const { state } = useLocation();
  const symptomCtx = state as SymptomState | null;

  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  // Pre-select filter based on urgency when arriving from symptom check
  useEffect(() => {
    if (!symptomCtx) return;
    if (symptomCtx.urgency === 'Red') setSelectedSpecialty('Hospital');
    // Yellow keeps 'All' but sorts hospitals first (handled in useMemo)
  }, [symptomCtx]);

  const fetchNearby = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const locResult = await getUserLocation();
      setLocation({ lat: locResult.lat, lng: locResult.lng });
      setUsingFallback(locResult.isFallback);
      const docs = await searchPlaces(locResult);
      setAllDoctors(docs);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch nearby facilities.';
      setError(msg);
      try {
        const docs = await searchPlaces();
        setAllDoctors(docs);
        setError(null);
        setUsingFallback(true);
      } catch {
        // leave empty
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNearby(); }, [fetchNearby]);

  const doctors = useMemo(() => {
    let results = allDoctors;
    if (selectedSpecialty !== 'All') {
      results = results.filter(d =>
        d.specialization.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(d =>
        d.name.toLowerCase().includes(q) || d.address.toLowerCase().includes(q)
      );
    }
    // For Yellow urgency from symptom check, float hospitals and clinics to the top
    if (symptomCtx?.urgency === 'Yellow' && selectedSpecialty === 'All' && !searchQuery.trim()) {
      const priority = (d: Doctor) => {
        const s = d.specialization.toLowerCase();
        if (s === 'hospital') return 0;
        if (s === 'clinic') return 1;
        return 2;
      };
      results = [...results].sort((a, b) => priority(a) - priority(b));
    }
    return results;
  }, [allDoctors, selectedSpecialty, searchQuery, symptomCtx]);

  const mapEmbedUrl = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.05},${location.lat - 0.05},${location.lng + 0.05},${location.lat + 0.05}&layer=mapnik&marker=${location.lat},${location.lng}`
    : '';

  return (
    <div className="page-transition-enter-active pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{T.doctors.title}</h1>
        <p className="text-slate-500">{T.doctors.subtitle}</p>
      </div>

      {/* Symptom context banner */}
      {symptomCtx && !bannerDismissed && (
        <div className={`mb-4 rounded-2xl px-4 py-3 border flex items-start justify-between gap-3 text-sm ${
          symptomCtx.urgency === 'Red'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}>
          <div className="flex items-start gap-2">
            <Stethoscope className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">
                {symptomCtx.urgency === 'Red' ? 'Showing hospitals near you' : 'Showing clinics & hospitals near you'}
              </p>
              <p className="text-xs opacity-80">Based on your symptoms: {symptomCtx.conditions.slice(0, 3).join(', ')}</p>
            </div>
          </div>
          <button onClick={() => setBannerDismissed(true)} className="shrink-0 opacity-60 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!loading && usingFallback && (
        <div className="mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2 text-amber-800">
            <MapPin className="w-4 h-4 shrink-0 text-amber-500" />
            <span>Showing results near <strong>Ludhiana</strong> (default). Allow location access for results near you.</span>
          </div>
          <button
            onClick={fetchNearby}
            disabled={loading}
            className="shrink-0 flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-medium px-3 py-1.5 rounded-xl text-xs transition-colors disabled:opacity-50"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            Retry
          </button>
        </div>
      )}

      {!loading && !usingFallback && location && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm text-emerald-800">
          <LocateFixed className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Using your current location · showing facilities within 5 km</span>
        </div>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={T.doctors.searchPlaceholder}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {SPECIALTIES.map(specialty => (
          <button
            key={specialty}
            onClick={() => { setSelectedSpecialty(specialty); setSearchQuery(''); }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedSpecialty === specialty && !searchQuery
                ? 'bg-medical-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {specialty}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        <div className="h-[300px] lg:h-[600px] rounded-3xl overflow-hidden shadow-soft border border-slate-200 bg-slate-100 flex items-center justify-center relative z-0">
          {loading && !location ? (
            <div className="flex flex-col items-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p>{T.doctors.locating}</p>
            </div>
          ) : mapEmbedUrl ? (
            <iframe
              title="OpenStreetMap"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={mapEmbedUrl}
            />
          ) : (
            <div className="flex flex-col items-center text-slate-500 p-8 text-center bg-white h-full justify-center w-full">
              <MapPin className="w-12 h-12 text-slate-300 mb-3" />
              <p className="font-medium">{T.doctors.mapUnavailable}</p>
              <p className="text-sm mt-1">{T.doctors.mapHint}</p>
            </div>
          )}
        </div>

        <div className="space-y-4 lg:h-[600px] lg:overflow-y-auto pr-2 custom-scrollbar">
          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-2xl flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
              <p>{error}</p>
            </div>
          )}

          {loading && allDoctors.length === 0 ? (
            <div className="py-12 flex flex-col items-center gap-3 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-medical-500" />
              <p className="text-sm">Searching OpenStreetMap for nearby facilities…</p>
            </div>
          ) : doctors.length === 0 ? (
            <div className="py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-100">
              <Search className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <p className="font-medium text-lg">{T.doctors.noResults}</p>
              <p className="text-sm">{T.doctors.noResultsHint}</p>
            </div>
          ) : (
            doctors.map((doctor) => {
              const cleanedPhone = doctor.phone ? cleanPhone(doctor.phone) : null;
              return (
                <div key={doctor.id} className="bg-white p-5 rounded-3xl shadow-soft border border-slate-100 flex flex-col sm:flex-row gap-4 hover:shadow-float transition-all group">
                  <div className="flex gap-4 sm:w-full">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0 relative">
                      {doctor.photoUrl ? (
                        <img src={doctor.photoUrl} alt={doctor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-medical-50 text-medical-300">
                          <UserIcon />
                        </div>
                      )}
                      <div
                        className={`absolute top-1.5 right-1.5 w-3 h-3 rounded-full border-2 border-white ${doctor.openNow ? 'bg-green-500' : 'bg-slate-400'}`}
                        title={doctor.openNow ? T.doctors.open : T.doctors.closed}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-lg truncate pr-2">{doctor.name}</h3>
                      <p className="text-medical-600 text-sm font-medium mb-1.5 truncate">{doctor.specialization}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-2">
                        {doctor.rating > 0 && (
                          <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md font-medium">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {doctor.rating.toFixed(1)} <span className="opacity-70">({doctor.userRatingsTotal})</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" />{doctor.distance}</span>
                        <span className="flex items-center gap-1 text-slate-400 truncate max-w-[160px]" title={doctor.address}>• {doctor.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0 justify-center">
                    {cleanedPhone ? (
                      <a
                        href={`tel:${cleanedPhone}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-medical-600 hover:bg-medical-700 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{T.doctors.call}</span>
                      </a>
                    ) : (
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(doctor.name + ' phone number')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-100 text-slate-500 hover:bg-slate-200 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Find number</span>
                      </a>
                    )}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${doctor.lat},${doctor.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-medical-50 text-medical-700 hover:bg-medical-100 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{T.doctors.directions}</span>
                    </a>
                    <button
                      onClick={() => setBookingDoctor(doctor)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      <span>{T.doctors.bookAppointment}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      {bookingDoctor && (
        <AppointmentModal
          doctorName={bookingDoctor.name}
          facility={bookingDoctor.address}
          doctorPhone={bookingDoctor.phone ? cleanPhone(bookingDoctor.phone) : undefined}
          onClose={() => setBookingDoctor(null)}
        />
      )}
    </div>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
  );
}
