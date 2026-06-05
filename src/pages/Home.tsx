import { ArrowRight, Activity, ShieldPlus, CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { translations } from '../i18n/translations';

export default function Home() {
  const { language, setIsAboutModalOpen } = useApp();
  const T = translations[language];

  return (
    <div className="space-y-8 pb-8 page-transition-enter-active">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-medical-600 to-medical-800 text-white p-8 md:p-12 shadow-float border border-medical-500/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-32 h-32 rounded-full bg-medical-400/20 blur-2xl"></div>

        <div className="relative z-10 max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-medical-50 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10 shadow-sm">
            {T.home.badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            {T.home.title} <br />
            <span className="text-medical-200">{T.home.titleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-medical-50/90 mb-8 max-w-lg leading-relaxed font-light">
            {T.home.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/symptoms" className="flex items-center gap-2 bg-white text-medical-700 font-bold py-3.5 px-6 rounded-2xl hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all active:scale-95 group">
              {T.home.getStarted}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button onClick={() => setIsAboutModalOpen(true)} className="flex items-center gap-2 bg-medical-700/50 text-white font-semibold py-3.5 px-6 rounded-2xl border border-medical-500/50 hover:bg-medical-700/80 transition-all active:scale-95 backdrop-blur-sm">
              {T.home.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-2xl font-bold text-slate-800">{T.home.whyTitle}</h2>
          <Link to="/tips" className="text-medical-600 text-sm font-semibold hover:underline">
            {T.home.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard icon={<Activity className="w-6 h-6 text-blue-500" />}    title={T.home.symptomCheckerTitle} desc={T.home.symptomCheckerDesc} bgClass="bg-blue-50" />
          <FeatureCard icon={<CalendarPlus className="w-6 h-6 text-purple-500" />} title={T.home.findDoctorsTitle}    desc={T.home.findDoctorsDesc}    bgClass="bg-purple-50" />
          <FeatureCard icon={<ShieldPlus className="w-6 h-6 text-emerald-500" />}  title={T.home.healthTipsTitle}     desc={T.home.healthTipsDesc}     bgClass="bg-emerald-50" />
        </div>
      </section>

      {/* Quick Action Banner */}
      <section className="bg-white rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-soft border border-slate-100 group cursor-pointer hover:border-medical-200 transition-all">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">{T.home.feelingUnwell}</h3>
          <p className="text-slate-500 text-sm">{T.home.consultNow}</p>
        </div>
        <Link to="/symptoms" className="bg-medical-50 text-medical-600 font-semibold py-2.5 px-5 rounded-xl hover:bg-medical-100 hover:scale-105 transition-all active:scale-95 block">
          {T.home.checkNow}
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, bgClass }: { icon: React.ReactNode; title: string; desc: string; bgClass: string }) {
  return (
    <div className="group bg-white rounded-3xl p-6 shadow-soft hover:shadow-float border border-slate-100 transition-all duration-300 hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-2xl ${bgClass} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}
