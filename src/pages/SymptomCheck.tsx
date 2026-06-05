import { useState } from 'react';
import { ClipboardPlus, ArrowRight, Loader2, AlertCircle, CheckCircle2, AlertTriangle, Droplets, BedDouble, Coffee, Leaf, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeSymptoms, type SymptomAnalysisResult } from '../utils/gemini';
import { saveSymptomRecord } from '../utils/historyStorage';
import { cn } from '../utils/cn';
import { useApp } from '../contexts/AppContext';
import { translations } from '../i18n/translations';

const CHIPS_EN = ['Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Body Ache', 'Sore Throat'];
const AGE_GROUPS_EN = ['Under 18', '18-35', '36-50', '51-65', 'Over 65'];
const DURATIONS_EN = ['Less than 24 hours', '1-3 days', '3-7 days', 'More than a week'];

export default function SymptomCheck() {
  const { language } = useApp();
  const T = translations[language];
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState(5);
  const [ageGroup, setAgeGroup] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SymptomAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleChip = (chip: string) => {
    setSelectedChips(prev => prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]);
  };

  const handleNext = () => {
    if (step === 1 && (symptoms.trim() !== '' || selectedChips.length > 0)) setStep(2);
  };

  const handleAnalyze = async () => {
    if (!duration || !ageGroup || isAnalyzing) return;
    setIsAnalyzing(true);
    setError(null);
    setStep(3);
    try {
      const combinedSymptoms = [symptoms, ...selectedChips].filter(Boolean).join(', ');
      const analysis = await analyzeSymptoms(combinedSymptoms, duration, severity, ageGroup, language);
      setResult(analysis);
      saveSymptomRecord(combinedSymptoms, analysis);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while analyzing symptoms.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRemedyIcon = (keyword: string) => {
    const kw = keyword.toLowerCase();
    if (kw.includes('water') || kw.includes('fluid')) return <Droplets className="w-5 h-5 text-blue-500" />;
    if (kw.includes('bed') || kw.includes('rest'))   return <BedDouble className="w-5 h-5 text-indigo-500" />;
    if (kw.includes('tea') || kw.includes('steam'))  return <Coffee    className="w-5 h-5 text-amber-600" />;
    return <Leaf className="w-5 h-5 text-emerald-500" />;
  };

  const urgencyColors = {
    Green:  'bg-emerald-50 border-emerald-200 text-emerald-800',
    Yellow: 'bg-amber-50 border-amber-200 text-amber-800',
    Red:    'bg-red-50 border-red-200 text-red-800',
  };

  const urgencyIcons = {
    Green:  <CheckCircle2  className="w-6 h-6 text-emerald-600" />,
    Yellow: <AlertTriangle className="w-6 h-6 text-amber-600" />,
    Red:    <AlertCircle   className="w-6 h-6 text-red-600" />,
  };

  const urgencyLabels = {
    Green:  T.symptoms.homeCareLabel,
    Yellow: T.symptoms.seeDoctorLabel,
    Red:    T.symptoms.emergencyLabel,
  };

  return (
    <div className="page-transition-enter-active max-w-2xl mx-auto pt-6 pb-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="w-14 h-14 bg-medical-100 rounded-2xl flex items-center justify-center text-medical-600 shadow-sm border border-medical-200/50 mb-4">
            <ClipboardPlus className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{T.symptoms.greeting}</h1>
          <p className="text-slate-500 text-sm">{T.symptoms.subtitle}</p>
        </div>
      </div>

      {/* Step 1: Symptoms Input */}
      {step === 1 && (
        <div className="bg-white rounded-3xl shadow-soft p-6 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-lg font-bold text-slate-800 mb-4">{T.symptoms.step1Title}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {CHIPS_EN.map(chip => (
              <button
                key={chip}
                onClick={() => toggleChip(chip)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
                  selectedChips.includes(chip)
                    ? 'bg-medical-100 border-medical-300 text-medical-800 shadow-sm scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                )}
              >
                {T.symptoms.chipLabels[chip] ?? chip}
              </button>
            ))}
          </div>

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder={T.symptoms.textareaPlaceholder}
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-medical-500 focus:border-medical-500 outline-none transition-all resize-none mb-6"
          />

          <button
            onClick={handleNext}
            disabled={symptoms.trim() === '' && selectedChips.length === 0}
            className="w-full bg-medical-600 text-white font-bold py-3.5 rounded-2xl hover:bg-medical-700 shadow-float transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 disabled:hover:bg-medical-600 flex justify-center items-center gap-2"
          >
            {T.symptoms.continue}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Step 2: Follow-up Questions */}
      {step === 2 && (
        <div className="bg-white rounded-3xl shadow-soft p-6 border border-slate-100 animate-in fade-in slide-in-from-right-8 duration-500">
          <h2 className="text-lg font-bold text-slate-800 mb-6">{T.symptoms.step2Title}</h2>

          <div className="space-y-6">
            {/* Duration */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">{T.symptoms.durationLabel}</label>
              <div className="flex flex-wrap gap-2">
                {DURATIONS_EN.map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                      duration === d ? 'bg-medical-100 border-medical-300 text-medical-800' : 'bg-white border-slate-200 text-slate-600'
                    )}
                  >
                    {T.symptoms.durationLabels[d] ?? d}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                <span>{T.symptoms.severityLabel}</span>
                <span className="text-medical-600 bg-medical-50 px-2 py-0.5 rounded-md">{severity}/10</span>
              </label>
              <p className="text-xs text-slate-400 mb-3">{T.symptoms.severityHint}</p>
              <input
                type="range" min="1" max="10" value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full accent-medical-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>{T.symptoms.mild}</span>
                <span>{T.symptoms.moderate}</span>
                <span>{T.symptoms.severe}</span>
              </div>
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3">{T.symptoms.ageGroupLabel}</label>
              <div className="flex flex-wrap gap-2">
                {AGE_GROUPS_EN.map(a => (
                  <button
                    key={a}
                    onClick={() => setAgeGroup(a)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all border',
                      ageGroup === a ? 'bg-medical-100 border-medical-300 text-medical-800' : 'bg-white border-slate-200 text-slate-600'
                    )}
                  >
                    {T.symptoms.ageGroupLabels[a] ?? a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              {T.symptoms.back}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!duration || !ageGroup}
              className="flex-1 bg-medical-600 text-white font-bold py-3.5 rounded-2xl hover:bg-medical-700 shadow-float transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {T.symptoms.analyzeNow}
              <Loader2 className={cn('w-5 h-5', isAnalyzing ? 'animate-spin block' : 'hidden')} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Loading / Results */}
      {step === 3 && (
        <div className="animate-in fade-in duration-500">
          {isAnalyzing ? (
            <div className="bg-white rounded-3xl shadow-soft p-12 border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className="relative w-24 h-24 mb-8 bg-medical-50 rounded-[2.5rem] flex items-center justify-center shadow-inner overflow-hidden">
                <Activity className="w-12 h-12 text-medical-600 animate-pulse relative z-10" />
                <div className="absolute inset-0 border-[6px] border-medical-200 rounded-[2.5rem] border-t-medical-600 animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{T.symptoms.analyzing}</h3>
              <p className="text-slate-500 mb-8 max-w-xs leading-relaxed">{T.symptoms.analyzingSubtitle}</p>
              <div className="flex gap-2 bg-slate-100 px-5 py-3 rounded-full shadow-sm border border-slate-200">
                <span className="w-2.5 h-2.5 bg-medical-500 rounded-full typing-dot"></span>
                <span className="w-2.5 h-2.5 bg-medical-500 rounded-full typing-dot"></span>
                <span className="w-2.5 h-2.5 bg-medical-500 rounded-full typing-dot"></span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-red-800 mb-2">{T.symptoms.analysisFailed}</h3>
              <p className="text-red-600 mb-6 font-medium text-sm leading-relaxed max-w-sm">{error}</p>
              <button onClick={() => { setStep(2); setError(null); }} className="bg-white border border-red-200 text-red-600 font-bold py-3 px-8 rounded-2xl hover:bg-red-50 transition-all whitespace-nowrap">
                {T.symptoms.tryAgain}
              </button>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className={cn('rounded-3xl p-6 border shadow-sm', urgencyColors[result.urgencyLevel])}>
                <div className="flex items-center gap-3 mb-3">
                  {urgencyIcons[result.urgencyLevel]}
                  <h3 className="text-lg font-bold">{urgencyLabels[result.urgencyLevel]}</h3>
                </div>
                <p className="text-sm opacity-90 leading-relaxed font-medium">{result.urgencyReason}</p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100">
                <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-slate-400" />
                  {T.symptoms.possibleConditions}
                </h3>
                <ul className="space-y-3">
                  {result.conditions.map((condition, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-medical-50 text-medical-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <span className="text-slate-700 font-medium">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {result.homeRemedies.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-soft border border-slate-100">
                  <h3 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-500" />
                    {T.symptoms.homeCareTitle}
                  </h3>
                  <div className="space-y-4">
                    {result.homeRemedies.map((remedy, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                          {getRemedyIcon(remedy.iconKeyword)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm mb-1">{remedy.name}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{remedy.instruction}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-amber-50 rounded-2xl p-5 flex items-start gap-3 border border-amber-200 shadow-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                  {T.symptoms.disclaimer}{' '}
                  <span className="font-normal">{result.disclaimer}</span>
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => { setStep(1); setResult(null); setSymptoms(''); setSelectedChips([]); }} className="flex-1 bg-white border border-slate-200 text-slate-600 font-bold py-3.5 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                  {T.symptoms.startOver}
                </button>
                {result.urgencyLevel !== 'Green' && (
                  <button
                    onClick={() => navigate('/doctors', { state: { conditions: result.conditions, urgency: result.urgencyLevel } })}
                    className="flex-1 bg-medical-600 text-white font-bold py-3.5 rounded-2xl flex justify-center items-center hover:bg-medical-700 shadow-float transition-all"
                  >
                    {T.symptoms.findDoctor}
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
