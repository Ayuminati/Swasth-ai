import { useState, useEffect } from 'react';
import { Phone, X, AlertCircle } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export default function SOSButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    try {
      const stored = localStorage.getItem('swasth_contacts');
      if (stored) setContacts(JSON.parse(stored));
    } catch {}
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Emergency SOS"
        className="fixed bottom-24 right-4 md:bottom-8 md:right-6 z-40 w-14 h-14 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full shadow-lg flex items-center justify-center font-extrabold text-sm transition-all border-4 border-red-200 animate-pulse hover:animate-none"
      >
        SOS
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-red-600 p-5 text-white">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  <h2 className="text-xl font-extrabold">Emergency SOS</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-red-100 text-sm">Tap to call immediately</p>
            </div>

            <div className="p-5 space-y-3">
              <a
                href="tel:108"
                className="flex items-center gap-4 p-4 bg-red-50 border-2 border-red-500 rounded-2xl hover:bg-red-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-extrabold text-red-700 text-lg">108 — Ambulance</p>
                  <p className="text-red-500 text-xs font-medium">Free emergency service · 24/7</p>
                </div>
              </a>

              <a
                href="tel:112"
                className="flex items-center gap-4 p-4 bg-orange-50 border border-orange-200 rounded-2xl hover:bg-orange-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-extrabold text-orange-700 text-lg">112 — Emergency</p>
                  <p className="text-orange-500 text-xs font-medium">Police · Fire · Medical</p>
                </div>
              </a>

              {contacts.length > 0 && (
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Your Emergency Contacts
                  </p>
                  <div className="space-y-2">
                    {contacts.map(c => (
                      <a
                        key={c.id}
                        href={`tel:${c.phone.replace(/\s+/g, '')}`}
                        className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-medical-50 hover:border-medical-200 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm truncate">{c.name}</p>
                          <p className="text-xs text-slate-500 truncate">{c.relation} · {c.phone}</p>
                        </div>
                        <Phone className="w-4 h-4 text-medical-500 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {contacts.length === 0 && (
                <p className="text-xs text-slate-400 text-center pb-1">
                  Add emergency contacts in Profile for quick access here.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
