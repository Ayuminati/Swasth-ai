import type { SymptomAnalysisResult } from './gemini';

export interface SymptomRecord {
  id: string;
  date: string;
  symptoms: string;
  result: string;
  urgency: 'Green' | 'Yellow' | 'Red';
}

export interface Appointment {
  id: string;
  doctorName: string;
  facility: string;
  date: string;
  time: string;
  patientName: string;
  phone: string;
  reason: string;
  status: 'upcoming' | 'cancelled';
  createdAt: string;
}

const KEYS = {
  symptoms: 'swasth_symptom_history',
  appointments: 'swasth_appointments',
};

function load<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key);
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const loadSymptomHistory = (): SymptomRecord[] =>
  load<SymptomRecord[]>(KEYS.symptoms, []);

export const saveSymptomRecord = (
  symptoms: string,
  result: SymptomAnalysisResult
): void => {
  const history = loadSymptomHistory();
  const record: SymptomRecord = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    symptoms,
    result: result.conditions[0] ?? 'Unknown',
    urgency: result.urgencyLevel,
  };
  localStorage.setItem(KEYS.symptoms, JSON.stringify([record, ...history].slice(0, 20)));
};

export const loadAppointments = (): Appointment[] =>
  load<Appointment[]>(KEYS.appointments, []);

export const saveAppointment = (
  appt: Omit<Appointment, 'id' | 'createdAt' | 'status'>
): Appointment => {
  const existing = loadAppointments();
  const newAppt: Appointment = {
    ...appt,
    id: Date.now().toString(),
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEYS.appointments, JSON.stringify([newAppt, ...existing]));
  return newAppt;
};

export const cancelAppointment = (id: string): void => {
  const updated = loadAppointments().map(a =>
    a.id === id ? { ...a, status: 'cancelled' as const } : a
  );
  localStorage.setItem(KEYS.appointments, JSON.stringify(updated));
};
