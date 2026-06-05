import { useState, useEffect } from 'react';
import { User, Settings, HeartPulse, FileText, LogOut, Phone, Clock, Plus, Trash2, Edit2, Check, AlertCircle, Save, CalendarPlus } from 'lucide-react';
import { isValidIndianPhone, isValidAge, sanitizeText } from '../utils/validation';
import { useApp } from '../contexts/AppContext';
import { translations } from '../i18n/translations';
import { loadSymptomHistory, loadAppointments, cancelAppointment, type SymptomRecord, type Appointment } from '../utils/historyStorage';
import OTPModal from '../components/OTPModal';

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

interface HealthSummary {
  age: string;
  bloodGroup: string;
  allergies: string;
}

const STORAGE_KEYS = { profile: 'swasth_profile', summary: 'swasth_summary', contacts: 'swasth_contacts' };

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function Profile() {
  const { language } = useApp();
  const T = translations[language];

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [contactPhoneError, setContactPhoneError] = useState('');

  const [userProfile, setUserProfile] = useState(() =>
    loadFromStorage(STORAGE_KEYS.profile, { name: 'Your Name', phone: '', initials: 'YN' })
  );
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [summary, setSummary] = useState<HealthSummary>(() =>
    loadFromStorage(STORAGE_KEYS.summary, { age: '', bloodGroup: '', allergies: 'None' })
  );
  const [contacts, setContacts] = useState<EmergencyContact[]>(() =>
    loadFromStorage(STORAGE_KEYS.contacts, [])
  );
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', relation: '', phone: '' });

  const [symptomHistory, setSymptomHistory] = useState<SymptomRecord[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => { localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(userProfile)); }, [userProfile]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.summary, JSON.stringify(summary)); }, [summary]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.contacts, JSON.stringify(contacts)); }, [contacts]);

  useEffect(() => {
    setSymptomHistory(loadSymptomHistory());
    setAppointments(loadAppointments());
  }, []);

  const isPhoneVerified =
    !!userProfile.phone &&
    localStorage.getItem('swasth_phone_verified') === userProfile.phone;

  const handleSaveProfile = () => {
    if (userProfile.phone && !isValidIndianPhone(userProfile.phone)) {
      setPhoneError(T.common.phoneError);
      return;
    }
    setPhoneError('');
    const verifiedPhone = localStorage.getItem('swasth_phone_verified');
    if (userProfile.phone && userProfile.phone !== verifiedPhone) {
      setShowOTPModal(true);
    } else {
      setIsEditingProfile(false);
    }
  };

  const handleProfileVerified = (phone: string) => {
    localStorage.setItem('swasth_phone_verified', phone);
    setShowOTPModal(false);
    setIsEditingProfile(false);
  };

  const handleSaveSummary = () => {
    if (summary.age && !isValidAge(summary.age)) { setAgeError(T.common.ageError); return; }
    setAgeError('');
    setIsEditingSummary(false);
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone || contacts.length >= 3) return;
    if (!isValidIndianPhone(newContact.phone)) { setContactPhoneError(T.common.phoneError); return; }
    setContactPhoneError('');
    setContacts([...contacts, {
      id: Date.now().toString(),
      name: sanitizeText(newContact.name),
      relation: sanitizeText(newContact.relation),
      phone: newContact.phone,
    }]);
    setNewContact({ name: '', relation: '', phone: '' });
    setIsAddingContact(false);
  };

  const removeContact = (id: string) => setContacts(contacts.filter(c => c.id !== id));

  const handleCancelAppointment = (id: string) => {
    cancelAppointment(id);
    setAppointments(loadAppointments());
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="page-transition-enter-active pb-24">
      {showOTPModal && (
        <OTPModal onVerified={handleProfileVerified} onClose={() => setShowOTPModal(false)} />
      )}

      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100 mb-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div className="w-20 h-20 rounded-full bg-medical-100 flex items-center justify-center text-medical-700 text-2xl font-bold shrink-0 shadow-inner">
            {userProfile.initials}
          </div>
          <button
            onClick={() => isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)}
            className="p-2 text-slate-400 hover:text-medical-600 bg-slate-50 rounded-xl transition-colors"
            aria-label={isEditingProfile ? T.profile.save : T.profile.edit}
          >
            {isEditingProfile ? <Save className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
          </button>
        </div>

        {isEditingProfile ? (
          <div className="space-y-3 mt-4">
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1 block">{T.profile.fullName}</label>
              <input
                type="text"
                value={userProfile.name}
                onChange={e => {
                  const n = sanitizeText(e.target.value);
                  setUserProfile({ ...userProfile, name: n, initials: n.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'U' });
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-medical-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1 block">{T.profile.phoneNumber}</label>
              <input
                type="tel"
                value={userProfile.phone}
                onChange={e => { setUserProfile({ ...userProfile, phone: e.target.value }); setPhoneError(''); }}
                placeholder="+91 98765 43210"
                className={`w-full bg-slate-50 border rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-medical-500 ${phoneError ? 'border-red-400' : 'border-slate-200'}`}
              />
              {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">{userProfile.name}</h1>
            {userProfile.phone && <p className="text-slate-500 mb-3">{userProfile.phone}</p>}
            {isPhoneVerified ? (
              <span className="inline-block bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {T.profile.verifiedCheck}
              </span>
            ) : (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="inline-block bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded hover:bg-medical-50 hover:text-medical-600 transition-colors"
              >
                Tap to set up profile →
              </button>
            )}
          </div>
        )}
      </div>

      {/* Emergency Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <a href="tel:108" className="bg-red-50 hover:bg-red-100 border border-red-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <AlertCircle className="w-5 h-5 fill-red-600/20" />
          </div>
          <span className="font-bold text-red-700 text-sm">{T.profile.callAmbulance}</span>
          <span className="text-xs text-red-500 mt-1">{T.profile.ambulance}</span>
        </a>
        <a href="tel:18001801104" className="bg-medical-50 hover:bg-medical-100 border border-medical-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-colors group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-medical-100 text-medical-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5 fill-medical-600/20" />
          </div>
          <span className="font-bold text-medical-700 text-sm">{T.profile.callHelpline}</span>
          <span className="text-xs text-medical-500 mt-1">{T.profile.healthIndia}</span>
        </a>
      </div>

      {/* Health Summary */}
      <div className="bg-white rounded-3xl shadow-soft border border-slate-100 p-6 mb-8 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            {T.profile.healthSummary}
          </h2>
          <button
            onClick={() => isEditingSummary ? handleSaveSummary() : setIsEditingSummary(true)}
            className="text-medical-600 text-sm font-bold flex items-center gap-1 bg-medical-50 px-3 py-1.5 rounded-lg hover:bg-medical-100 transition-colors"
          >
            {isEditingSummary ? <><Check className="w-4 h-4" /> {T.profile.save}</> : <><Edit2 className="w-4 h-4" /> {T.profile.edit}</>}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: T.profile.age, value: summary.age ? `${summary.age} ${T.profile.ageUnit}` : '—', field: 'age' as const, inputType: 'number', min: '0', max: '120' },
            { label: T.profile.blood, value: summary.bloodGroup || '—', field: 'bloodGroup' as const, inputType: 'text' },
            { label: T.profile.allergies, value: summary.allergies || '—', field: 'allergies' as const, inputType: 'text' },
          ].map(({ label, value, field, inputType, min, max }) => (
            <div key={field} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-1 font-medium">{label}</p>
              {isEditingSummary ? (
                <>
                  <input
                    type={inputType}
                    min={min}
                    max={max}
                    value={summary[field]}
                    onChange={e => { setSummary({ ...summary, [field]: e.target.value }); if (field === 'age') setAgeError(''); }}
                    className={`w-full bg-white border rounded p-1 text-sm font-bold text-slate-800 outline-none focus:border-medical-500 ${field === 'age' && ageError ? 'border-red-400' : 'border-slate-200'}`}
                  />
                  {field === 'age' && ageError && <p className="text-xs text-red-500 mt-1">{ageError}</p>}
                </>
              ) : (
                <p className={`font-bold text-slate-800 truncate ${field === 'bloodGroup' ? 'text-rose-600' : ''}`} title={value}>{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-3xl shadow-soft border border-slate-100 p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            {T.profile.emergencyContacts}
            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{contacts.length}/3</span>
          </h2>
          {contacts.length < 3 && !isAddingContact && (
            <button onClick={() => setIsAddingContact(true)} className="text-medical-600 p-1.5 bg-medical-50 rounded-lg hover:bg-medical-100 transition-colors" aria-label={T.profile.addContact}>
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {contacts.map(contact => (
            <div key={contact.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">{contact.name.charAt(0)}</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{contact.name}</h3>
                  <p className="text-xs text-slate-500">{contact.relation} • {contact.phone}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="p-2 text-medical-600 bg-medical-50 rounded-xl hover:bg-medical-100 transition-colors" aria-label={`Call ${contact.name}`}>
                  <Phone className="w-4 h-4" />
                </a>
                <button onClick={() => removeContact(contact.id)} className="p-2 text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100 md:opacity-100" aria-label={`Remove ${contact.name}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {isAddingContact && (
            <div className="p-4 rounded-2xl border border-medical-200 bg-medical-50/50 space-y-3">
              <input type="text" placeholder={T.profile.contactName} value={newContact.name} onChange={e => setNewContact({ ...newContact, name: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-medical-500" />
              <div className="flex gap-2">
                <input type="text" placeholder={T.profile.contactRelation} value={newContact.relation} onChange={e => setNewContact({ ...newContact, relation: e.target.value })} className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-medical-500" />
                <input type="tel" placeholder={T.profile.contactPhone} value={newContact.phone} onChange={e => { setNewContact({ ...newContact, phone: e.target.value }); setContactPhoneError(''); }} className={`flex-1 bg-white border rounded-xl px-3 py-2 text-sm outline-none focus:border-medical-500 ${contactPhoneError ? 'border-red-400' : 'border-slate-200'}`} />
              </div>
              {contactPhoneError && <p className="text-xs text-red-500">{contactPhoneError}</p>}
              <div className="flex gap-2 pt-1">
                <button onClick={handleAddContact} disabled={!newContact.name || !newContact.phone} className="flex-1 bg-medical-600 text-white font-bold py-2 rounded-xl text-sm disabled:opacity-50">{T.profile.save}</button>
                <button onClick={() => { setIsAddingContact(false); setContactPhoneError(''); }} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-2 rounded-xl text-sm">Cancel</button>
              </div>
            </div>
          )}

          {contacts.length === 0 && !isAddingContact && (
            <p className="text-sm text-slate-500 text-center py-4">{T.profile.noContacts}</p>
          )}
        </div>
      </div>

      {/* My Appointments */}
      <div className="space-y-4 mb-8">
        <h2 className="font-bold text-lg text-slate-800 px-2 flex items-center gap-2">
          <CalendarPlus className="w-5 h-5 text-purple-500" />
          {T.profile.appointmentsTitle}
        </h2>
        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center">
            <CalendarPlus className="w-10 h-10 mx-auto text-slate-200 mb-2" />
            <p className="text-sm text-slate-500">{T.profile.noAppointments}</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden divide-y divide-slate-50">
            {appointments.slice(0, 5).map(appt => (
              <div key={appt.id} className="p-4 flex gap-3 items-start">
                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${appt.status === 'upcoming' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-800 text-sm truncate">{appt.doctorName}</h3>
                    {appt.status === 'upcoming' ? (
                      <button onClick={() => handleCancelAppointment(appt.id)} className="shrink-0 text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                        {T.profile.cancelAppt}
                      </button>
                    ) : (
                      <span className="shrink-0 text-xs text-slate-400 font-medium">Cancelled</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate">{appt.facility}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {appt.date} · {appt.time}
                    {appt.status === 'upcoming' && (
                      <span className="ml-1 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{T.profile.upcomingAppt}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Symptom History */}
      <div className="space-y-4 mb-8">
        <h2 className="font-bold text-lg text-slate-800 px-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-500" />
          {T.profile.recentChecks}
        </h2>
        {symptomHistory.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-6 text-center">
            <FileText className="w-10 h-10 mx-auto text-slate-200 mb-2" />
            <p className="text-sm text-slate-500">No symptom checks yet. Use the Symptom Checker to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden divide-y divide-slate-50">
            {symptomHistory.slice(0, 5).map(record => (
              <div key={record.id} className="p-4 hover:bg-slate-50 transition-colors flex gap-4 items-start">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${record.urgency === 'Red' ? 'bg-red-500' : record.urgency === 'Yellow' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800">{record.result}</h3>
                    <span className="text-xs font-medium flex items-center gap-1 text-slate-400 shrink-0 ml-2">
                      <Clock className="w-3 h-3" /> {record.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-1">{record.symptoms}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Log Out */}
      {!showLogoutConfirm ? (
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full bg-slate-50 text-slate-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-red-500 transition-colors mt-8"
        >
          <LogOut className="w-5 h-5" />
          {T.profile.logOut}
        </button>
      ) : (
        <div className="mt-8 p-5 bg-red-50 border border-red-100 rounded-2xl space-y-3">
          <p className="text-sm font-bold text-red-700 text-center">Clear all local data and reset the app?</p>
          <div className="flex gap-3">
            <button onClick={handleLogout} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-red-700 transition-colors">
              Yes, Clear Data
            </button>
            <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
