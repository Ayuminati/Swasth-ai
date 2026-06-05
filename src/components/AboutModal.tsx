import { X, ShieldCheck } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../i18n/translations';

export default function AboutModal() {
  const { isAboutModalOpen, setIsAboutModalOpen, language } = useApp();
  const T = translations[language];

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsAboutModalOpen(false)}></div>

      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-medical-50 p-6 flex items-start justify-between border-b border-medical-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl text-medical-600 shadow-sm border border-medical-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{T.about.title}</h2>
              <p className="text-medical-600 text-sm font-medium">{T.about.subtitle}</p>
            </div>
          </div>
          <button onClick={() => setIsAboutModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-slate-600 leading-relaxed text-sm">{T.about.description}</p>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 text-sm">
            <h3 className="font-bold flex items-center gap-2 mb-1">{T.about.disclaimerTitle}</h3>
            <p className="opacity-90">{T.about.disclaimerText}</p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">Version 1.0.0-pilot (2026)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
