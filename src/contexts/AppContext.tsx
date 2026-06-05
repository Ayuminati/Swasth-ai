import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../i18n/translations';

export interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isAboutModalOpen: boolean;
  setIsAboutModalOpen: (isOpen: boolean) => void;
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastItem['type']) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('swasth_language');
    return (stored as Language) || 'English';
  });
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('swasth_language', lang);
  };

  const showToast = useCallback((message: string, type: ToastItem['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{ language, setLanguage, isAboutModalOpen, setIsAboutModalOpen, toasts, showToast, dismissToast }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useApp must be used within an AppProvider');
  return context;
}
