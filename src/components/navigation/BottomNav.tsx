import { Home, ClipboardPlus, Search, Lightbulb, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useApp } from '../../contexts/AppContext';
import { translations } from '../../i18n/translations';

const NAV_ITEMS = [
  { icon: Home,         key: 'home'     as const, path: '/'         },
  { icon: ClipboardPlus,key: 'symptoms' as const, path: '/symptoms' },
  { icon: Search,       key: 'doctors'  as const, path: '/doctors'  },
  { icon: Lightbulb,    key: 'tips'     as const, path: '/tips'     },
  { icon: User,         key: 'profile'  as const, path: '/profile'  },
];

export default function BottomNav() {
  const { language } = useApp();
  const T = translations[language];

  return (
    <nav className="fixed bottom-0 inset-x-0 h-20 bg-white border-t border-slate-200 z-50 md:hidden px-2 pb-safe shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.05)] pt-1">
      <ul className="flex items-center justify-between h-full max-w-md mx-auto relative content-center pb-2">
        {NAV_ITEMS.map(({ icon: Icon, key, path }) => (
          <li key={path} className="flex-1 h-full">
            <NavLink
              to={path}
              end={path === '/'}
              className="flex flex-col items-center justify-center w-full h-full gap-1 outline-none group"
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    'p-1.5 rounded-full transition-all duration-300',
                    isActive
                      ? 'bg-medical-50 text-medical-600 shadow-sm transform -translate-y-1'
                      : 'bg-transparent text-slate-400 group-hover:text-slate-600'
                  )}>
                    <Icon
                      className={cn('w-[22px] h-[22px] transition-all', isActive ? 'text-medical-600' : '')}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span className={cn(
                    'text-[11px] font-medium transition-all duration-300 leading-none',
                    isActive ? 'text-medical-600' : 'text-slate-400 group-hover:text-slate-600'
                  )}>
                    {T.nav[key]}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
