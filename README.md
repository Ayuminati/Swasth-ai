<div align="center">

# 🩺 SwasthAI

**AI-powered health assistant for every Indian**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev)

SwasthAI brings AI-driven healthcare guidance to everyone — no sign-up required, works offline after load, and speaks your language.
Built for India: elderly users, rural communities, and anyone who needs fast, trustworthy health information.

</div>

---

## Features

### 🤖 AI Symptom Checker
Describe your symptoms in plain text or tap quick-select chips. Answer a few follow-up questions (duration, severity, age group) and get a full analysis from **Gemini 2.5 Flash**:
- Urgency triage: Green (home care) · Yellow (see a doctor) · Red (emergency)
- Top possible conditions ranked by likelihood
- Personalised home remedies with step-by-step instructions
- Plain-language disclaimer in your chosen language
- Every result is saved to your symptom history automatically

### 🏥 Find Nearby Doctors & Facilities
Real-time facility search powered by **OpenStreetMap / Overpass API** — no Google Maps billing required:
- Detects your location and finds hospitals, clinics, pharmacies, and doctors within 5 km
- Live OpenStreetMap embed showing your position and surroundings
- Filter by facility type (Hospital · Clinic · Doctors · Pharmacy)
- Smart routing: coming from a Red-urgency result auto-filters to hospitals; Yellow floats hospitals/clinics to the top
- One-tap directions via Google Maps
- Direct call button (cleans messy OSM phone formats automatically; shows "No number" when unavailable)

### 📅 Book Appointments
Book directly from any facility card with no backend or account needed:
- Collects name, phone, date, preferred time slot, and reason
- Full input validation (Indian mobile number format)
- Appointment saved to your profile for easy reference
- **WhatsApp notification button** on the success screen — sends a pre-filled message with your booking details straight to the clinic's number
- View and cancel upcoming appointments from your Profile

### 🆘 Emergency SOS
An always-visible floating SOS button on every screen:
- One tap to call **108 (Ambulance)** or **112 (Emergency)** — uses native `tel:` deep links for instant calling
- Shows your personal emergency contacts from your profile for quick family/friend calls
- Works without internet after the page has loaded

### 💡 Health Tips
A curated library of India-specific wellness articles:
- Categories: Seasonal Health · Nutrition · Mental Health · Fitness
- Monsoon hygiene, summer hydration, Indian Thali nutrition balance, Pranayama, yoga for desk workers, and more
- Expand any tip to read the full article inline

### 👤 Profile & History
- Symptom history — every AI analysis stored with date, urgency colour, and full result
- Upcoming appointments with cancel support
- Emergency contacts (shown in SOS modal)
- Phone-number OTP verification gate for profile save (demo mode shows OTP on screen; plug in MSG91/Fast2SMS for production SMS)
- Functional logout with confirm step (clears all local data)

### 🌐 6-Language Support
Full UI translation across:

| Language | Native |
|---|---|
| English | English |
| Hindi | हिन्दी |
| Punjabi | ਪੰਜਾਬੀ |
| Tamil | தமிழ் |
| Bengali | বাংলা |
| Gujarati | ગુજરાતી |

Language preference is persisted across sessions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 3 + Framer Motion |
| Routing | React Router 7 |
| AI | Google Generative AI SDK — Gemini 2.5 Flash |
| Maps & Places | OpenStreetMap + Overpass API (free, no API key) |
| Icons | Lucide React |
| Storage | Browser `localStorage` (local-first, no database) |

---

## Architecture — Why No Backend?

SwasthAI is intentionally **local-first**:

- **Zero sign-up friction** — the target users are elderly or semi-literate people. A login screen is a barrier, not a feature.
- **Offline resilience** — symptom history, appointments, and contacts live in `localStorage`. They survive network drops.
- **Zero infrastructure cost** — no server to maintain, no database bills, no PII stored on a remote server.
- **Privacy by default** — your health data never leaves your device.

The only external calls are:
1. **Gemini API** — symptom analysis (requires your API key)
2. **Overpass API** — nearby facility search (free, open data)

> **Future backend** (when needed): Add a Node/Express layer for real SMS OTP, push appointment requests to the clinic's system, and sync history across devices. The frontend is structured so this can be added without a rewrite.

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com) account (free tier works)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/swasth-ai.git
cd swasth-ai
npm install
```

### Configure the API key

Create a `.env.local` file in the project root (this file is gitignored):

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get your key from [Google AI Studio → Get API key](https://aistudio.google.com/app/apikey).

### Run

```bash
npm run dev
```

Open `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── navigation/        # TopNav, BottomNav
│   ├── AppointmentModal   # Booking form + WhatsApp share
│   ├── OTPModal           # Phone verification (demo mode)
│   ├── SOSButton          # Floating emergency button
│   └── Layout             # Shell + toast overlay
├── contexts/
│   └── AppContext          # Language state, toast system
├── i18n/
│   └── translations        # All 6 language strings
├── pages/
│   ├── Home
│   ├── SymptomCheck        # AI symptom analysis flow
│   ├── FindDoctors         # Map + facility list
│   ├── HealthTips
│   └── Profile             # History, appointments, contacts
└── utils/
    ├── gemini              # Gemini API wrapper
    ├── historyStorage      # localStorage CRUD
    ├── maps                # Overpass API + geolocation
    └── validation          # Indian phone number, input sanitization
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key for symptom analysis |

All other data (facility search, maps) uses free public APIs that require no key.

---

## Roadmap

- [ ] Real SMS OTP via MSG91 / Fast2SMS
- [ ] Push notifications for appointment reminders
- [ ] Appointment sync to clinic via backend API
- [ ] Cross-device history sync
- [ ] Voice input for symptom entry
- [ ] More regional languages (Marathi, Telugu, Kannada)

---

## Disclaimer

SwasthAI is an informational tool only. It is **not a substitute for professional medical advice, diagnosis, or treatment.** Always consult a qualified healthcare provider for medical concerns. In an emergency, call **108** (Ambulance) or **112** (Emergency) immediately.

---

<div align="center">
Made with ❤️ for India
</div>
