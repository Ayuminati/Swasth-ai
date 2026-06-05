import { useState, useRef, useEffect, useCallback } from 'react';
import { Stethoscope, Bell, Globe, Info } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useApp } from '../../contexts/AppContext';
import { LANGUAGES, translations } from '../../i18n/translations';

export default function TopNav() {
  const { language, setLanguage, setIsAboutModalOpen, showToast } = useApp();
  const T = translations[language];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [initials, setInitials] = useState('U');
  const langRef = useRef<HTMLDivElement>(null);

  const loadInitials = useCallback(() => {
    try {
      const p = localStorage.getItem('swasth_profile');
      if (p) setInitials(JSON.parse(p).initials || 'U');
    } catch {}
  }, []);

  useEffect(() => {
    loadInitials();
    window.addEventListener('storage', loadInitials);
    return () => window.removeEventListener('storage', loadInitials);
  }, [loadInitials]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const currentLang = LANGUAGES.find(l => l.code === language)!;

  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-medical-600 p-2 rounded-xl group-hover:bg-medical-700 transition-colors shadow-sm">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-medical-700 to-medical-500">
            SwasthAI
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          <NavLink to="/" className={({ isActive }) => cn('text-sm font-semibold transition-colors hover:text-medical-600', isActive ? 'text-medical-600' : 'text-slate-500')}>{T.nav.home}</NavLink>
          <NavLink to="/symptoms" className={({ isActive }) => cn('text-sm font-semibold transition-colors hover:text-medical-600', isActive ? 'text-medical-600' : 'text-slate-500')}>{T.nav.symptoms}</NavLink>
          <NavLink to="/doctors" className={({ isActive }) => cn('text-sm font-semibold transition-colors hover:text-medical-600', isActive ? 'text-medical-600' : 'text-slate-500')}>{T.nav.doctors}</NavLink>
          <NavLink to="/tips" className={({ isActive }) => cn('text-sm font-semibold transition-colors hover:text-medical-600', isActive ? 'text-medical-600' : 'text-slate-500')}>{T.nav.tips}</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setIsLangOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-xs font-bold text-slate-700 transition-colors"
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5" />
              {currentLang.short}
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-float border border-slate-100 overflow-hidden z-[60]">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors text-left',
                      lang.code === language
                        ? 'bg-medical-50 text-medical-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    <span>{lang.native}</span>
                    {lang.code === language && <span className="w-2 h-2 rounded-full bg-medical-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="p-2 text-slate-500 hover:text-medical-600 hover:bg-medical-50 rounded-full transition-colors"
            aria-label="About"
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            onClick={() => showToast(T.common.noNotifications, 'info')}
            className="p-2 text-slate-500 hover:text-medical-600 hover:bg-medical-50 rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/profile" className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-700 font-semibold cursor-pointer hover:bg-medical-200 transition-colors">
              {initials}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
