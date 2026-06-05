import { Outlet } from 'react-router-dom';
import { X } from 'lucide-react';
import TopNav from './navigation/TopNav';
import BottomNav from './navigation/BottomNav';
import Footer from './Footer';
import AboutModal from './AboutModal';
import SOSButton from './SOSButton';
import { useApp } from '../contexts/AppContext';

export default function Layout() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      <TopNav />
      <main className="flex-1 w-full max-w-md md:max-w-7xl mx-auto pt-16 pb-24 md:pb-6 px-4 sm:px-6 lg:px-8 mt-4">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <AboutModal />
      <SOSButton />

      {toasts.length > 0 && (
        <div className="fixed top-20 right-4 z-[300] space-y-2 w-[calc(100vw-2rem)] max-w-xs pointer-events-none">
          {toasts.map(toast => (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border text-sm font-medium animate-in slide-in-from-right-4 duration-300 ${
                toast.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : toast.type === 'warning'
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-slate-800 border-slate-700 text-white'
              }`}
            >
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                onClick={() => dismissToast(toast.id)}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
