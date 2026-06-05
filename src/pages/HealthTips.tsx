import { useState, useMemo } from 'react';
import { Lightbulb, Info, Leaf, Activity, Brain, Droplets, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { useApp } from '../contexts/AppContext';
import { translations } from '../i18n/translations';

type Category = 'All' | 'Nutrition' | 'Fitness' | 'Mental Health' | 'Seasonal Health';

interface Tip {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: Category;
  readTime: string;
  icon: 'leaf' | 'activity' | 'brain' | 'droplets';
}

const TIPS_DATABASE: Tip[] = [
  { id: 't1', title: 'Monsoon Hygiene: Preventing Dengue', shortDesc: 'Empty stagnant water from coolers and pots weekly to prevent mosquito breeding.', fullDesc: 'During the Indian monsoon season, dengue and malaria cases skyrocket due to stagnant water. Make it a weekend habit to completely empty and dry out desert coolers, plant pots, old tires, and bird baths. Use mosquito repellents and wear full-sleeved clothing during dawn and dusk. If you experience sudden high fever with severe body ache, seek medical attention immediately rather than relying on self-medication.', category: 'Seasonal Health', readTime: '3 min', icon: 'droplets' },
  { id: 't2', title: 'Summer Hydration Secrets', shortDesc: 'Why Nimbu Pani is better than plain water during peak summers.', fullDesc: 'When the Indian summer peaks, you lose significant essential salts through sweat. Drinking plain water hydrates you, but it doesn\'t replenish lost sodium and potassium, which can lead to cramps or heat exhaustion. Substituting a few glasses of water with Nimbu Pani with a pinch of rock salt or drinking fresh coconut water can instantly restore electrolyte balance and keep you energized.', category: 'Seasonal Health', readTime: '4 min', icon: 'droplets' },
  { id: 't3', title: 'Balancing the Indian Thali', shortDesc: 'How to ensure your daily meals have the right protein-to-carb ratio.', fullDesc: 'A traditional Indian diet can sometimes be carbohydrate-heavy, relying heavily on rice and roti. To balance your Thali, aim to fill half your plate with vegetables, one quarter with complex carbs (like bajra roti or brown rice), and one quarter with protein (dal, paneer, eggs, or lean meat). Adding a bowl of homemade curd not only adds protein but also provides essential probiotics for gut health.', category: 'Nutrition', readTime: '5 min', icon: 'leaf' },
  { id: 't4', title: 'The Power of Morning Sunlight', shortDesc: 'Just 15 minutes of early morning sun can drastically improve your vitamin D levels and mood.', fullDesc: 'Despite living in a sunny country, a vast majority of Indians suffer from Vitamin D deficiency due to indoor lifestyles. Exposing your arms and legs to the early morning sun (before 9 AM) for just 15-20 minutes can trigger natural Vitamin D synthesis. This not only strengthens bones but significantly stabilizes mood, improves sleep quality, and boosts your immune system.', category: 'Mental Health', readTime: '3 min', icon: 'brain' },
  { id: 't5', title: 'Yoga at Your Desk', shortDesc: '3 simple stretches to relieve neck and back pain during long working hours.', fullDesc: 'Sitting for extended periods can wreak havoc on your posture. Try these three desk-friendly stretches: 1. Seated Spinal Twist: Sit sideways on your chair, grab the backrest, and gently twist. 2. Neck Rolls: Slowly drop your chin to your chest and roll your head ear-to-shoulder. 3. Wrist Stretches: Extend your arm and gently pull your fingers backward. Doing these for 2 minutes every couple of hours can prevent chronic pain.', category: 'Fitness', readTime: '2 min', icon: 'activity' },
  { id: 't6', title: 'Managing Stress with Pranayama', shortDesc: 'How Anulom Vilom (Alternate Nostril Breathing) lowers cortisol in minutes.', fullDesc: 'Stress triggers the release of cortisol, which over time can lead to hypertension and anxiety. Anulom Vilom is a simple yogic breathing technique that balances the left and right hemispheres of the brain. By slowly inhaling through one nostril and exhaling through the other, you force your parasympathetic nervous system to activate. Just 5 minutes of this before bed can drastically improve sleep latency and quality.', category: 'Mental Health', readTime: '4 min', icon: 'brain' },
];

const CATEGORIES: Category[] = ['All', 'Seasonal Health', 'Nutrition', 'Mental Health', 'Fitness'];

export default function HealthTips() {
  const { language } = useApp();
  const T = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);

  const loc = (tip: Tip, field: 'title' | 'shortDesc' | 'fullDesc') => {
    const content = T.tipContent[tip.id];
    if (!content) return tip[field];
    if (field === 'fullDesc') return content.fullDesc ?? tip.fullDesc;
    return content[field];
  };

  const dailyTips = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today.getTime() - start.getTime()) / 86400000);
    return [
      TIPS_DATABASE[dayOfYear % TIPS_DATABASE.length],
      TIPS_DATABASE[(dayOfYear + 2) % TIPS_DATABASE.length],
      TIPS_DATABASE[(dayOfYear + 4) % TIPS_DATABASE.length],
    ];
  }, []);

  const filteredTips = useMemo(() => {
    if (selectedCategory === 'All') return TIPS_DATABASE;
    return TIPS_DATABASE.filter(t => t.category === selectedCategory);
  }, [selectedCategory]);

  const toggleExpand = (id: string) => setExpandedTipId(prev => (prev === id ? null : id));

  const getIcon = (type: string, className: string) => {
    switch (type) {
      case 'leaf':     return <Leaf     className={className} />;
      case 'activity': return <Activity className={className} />;
      case 'brain':    return <Brain    className={className} />;
      case 'droplets': return <Droplets className={className} />;
      default:         return <Info     className={className} />;
    }
  };

  return (
    <div className="page-transition-enter-active pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{T.tips.title}</h1>
        <p className="text-slate-500">{T.tips.subtitle}</p>
      </div>

      <h2 className="font-bold text-lg text-slate-800 mb-4 px-1 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        {T.tips.todayTitle}
      </h2>

      <div className="flex overflow-x-auto gap-4 pb-6 mb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {dailyTips.map(tip => (
          <div
            key={`daily-${tip.id}`}
            className="snap-center shrink-0 w-[280px] sm:w-[320px] bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-6 border border-indigo-100 shadow-soft cursor-pointer hover:shadow-float transition-all"
            onClick={() => toggleExpand(`daily-${tip.id}`)}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
              {getIcon(tip.icon, 'w-5 h-5')}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-white/60 px-2 py-0.5 rounded-md mb-2 inline-block">
              {T.tips.categories[tip.category] ?? tip.category}
            </span>
            <h3 className="font-bold text-slate-800 mb-2 leading-tight">{loc(tip, 'title')}</h3>
            <div className={cn('text-slate-600 text-sm leading-relaxed transition-all duration-300', expandedTipId === `daily-${tip.id}` ? '' : 'line-clamp-2')}>
              {expandedTipId === `daily-${tip.id}` ? loc(tip, 'fullDesc') : loc(tip, 'shortDesc')}
            </div>
            <button className="text-indigo-600 text-sm font-bold mt-4 flex items-center gap-1 group">
              {expandedTipId === `daily-${tip.id}` ? T.tips.showLess : T.tips.readMore}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-medical-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {T.tips.categories[category] ?? category}
          </button>
        ))}
      </div>

      <h2 className="font-bold text-lg text-slate-800 mb-4 px-1">{T.tips.exploreTitle}</h2>
      <div className="grid grid-cols-1 gap-4">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white p-5 rounded-3xl shadow-soft border border-slate-100 hover:border-medical-200 transition-colors cursor-pointer group"
            onClick={() => toggleExpand(tip.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-medical-600 bg-medical-50 px-2.5 py-1 rounded-md">
                {T.tips.categories[tip.category] ?? tip.category}
              </span>
              <p className="text-slate-400 text-xs flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded-md">
                <Info className="w-3.5 h-3.5" /> {tip.readTime}
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-medical-500">
                {getIcon(tip.icon, 'w-6 h-6')}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-2 group-hover:text-medical-600 transition-colors leading-tight">{loc(tip, 'title')}</h3>
                <div className={cn('text-slate-500 text-sm leading-relaxed transition-all duration-300', expandedTipId === tip.id ? '' : 'line-clamp-2')}>
                  {expandedTipId === tip.id ? loc(tip, 'fullDesc') : loc(tip, 'shortDesc')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
