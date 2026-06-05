import { useState } from 'react';
import { X, CalendarPlus, Check, Clock, Phone, User, FileText, AlertCircle, MessageCircle } from 'lucide-react';
import { saveAppointment, type Appointment } from '../utils/historyStorage';
import { isValidIndianPhone, sanitizeText } from '../utils/validation';

interface Props {
  doctorName: string;
  facility: string;
  doctorPhone?: string;
  onClose: () => void;
}

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

export default function AppointmentModal({ doctorName, facility, doctorPhone, onClose }: Props) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', reason: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [booked, setBooked] = useState<Appointment | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 86_400_000).toISOString().split('T')[0];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone) e.phone = 'Phone number is required';
    else if (!isValidIndianPhone(form.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time slot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleBook = () => {
    if (!validate()) return;
    const appt = saveAppointment({
      doctorName: sanitizeText(doctorName),
      facility: sanitizeText(facility),
      patientName: sanitizeText(form.name),
      phone: form.phone,
      date: form.date,
      time: form.time,
      reason: sanitizeText(form.reason),
    });
    setBooked(appt);
    setStep('success');
  };

  const buildWhatsAppUrl = (appt: Appointment) => {
    const msg = encodeURIComponent(
      `Hello, I would like to book an appointment.\n\nPatient: ${appt.patientName}\nDate: ${appt.date}\nTime: ${appt.time}${appt.reason ? `\nReason: ${appt.reason}` : ''}\n\nContact: ${appt.phone}`
    );
    const number = doctorPhone?.replace(/\D/g, '');
    return `https://wa.me/${number?.startsWith('91') ? number : `91${number}`}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        <div className="bg-medical-600 p-5 text-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <CalendarPlus className="w-5 h-5" />
            <h2 className="font-bold text-lg">Book Appointment</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-medical-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <div className="p-5 space-y-4">
            <div className="bg-medical-50 rounded-2xl p-3 border border-medical-100">
              <p className="font-bold text-medical-800 text-sm">{doctorName}</p>
              <p className="text-medical-600 text-xs truncate">{facility}</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Your Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                placeholder="Full name"
                className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-medical-500 ${errors.name ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Mobile Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                placeholder="+91 98765 43210"
                className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-medical-500 ${errors.phone ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                <CalendarPlus className="w-3.5 h-3.5" /> Preferred Date
              </label>
              <input
                type="date"
                value={form.date}
                min={today}
                max={maxDate}
                onChange={e => { setForm({ ...form, date: e.target.value }); setErrors({ ...errors, date: '' }); }}
                className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-medical-500 ${errors.date ? 'border-red-400' : 'border-slate-200'}`}
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Preferred Time
              </label>
              <div className="flex flex-wrap gap-2">
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    onClick={() => { setForm({ ...form, time: t }); setErrors({ ...errors, time: '' }); }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                      form.time === t
                        ? 'bg-medical-600 text-white border-medical-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-medical-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Reason{' '}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                value={form.reason}
                onChange={e => setForm({ ...form, reason: e.target.value })}
                placeholder="e.g. Fever for 3 days, routine check-up..."
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-medical-500 resize-none"
              />
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Your request is saved locally. Use the WhatsApp button after confirming to send your details directly to the clinic.
              </p>
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3.5 rounded-2xl transition-all active:scale-95 shadow-float"
            >
              Confirm Appointment
            </button>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">Appointment Saved!</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Request for <strong>{booked?.doctorName}</strong> on{' '}
              <strong>{booked?.date}</strong> at <strong>{booked?.time}</strong> saved to your profile.
            </p>

            {doctorPhone && booked && (
              <a
                href={buildWhatsAppUrl(booked)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3.5 rounded-2xl transition-all mb-3 shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Notify Clinic via WhatsApp
              </a>
            )}

            {!doctorPhone && (
              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-3 text-xs text-slate-500 text-left">
                No phone number available for this facility. You can call them directly to confirm.
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-slate-100 text-slate-700 font-bold py-3.5 rounded-2xl hover:bg-slate-200 transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
