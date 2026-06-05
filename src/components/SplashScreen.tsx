import { useEffect, useState } from 'react';
import { Stethoscope } from 'lucide-react';
import { cn } from '../utils/cn';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Unmount after 2.5 seconds (allowing for 500ms fade transition)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-medical-600 to-medical-800 text-white transition-opacity duration-500",
        isFading ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-medical-400/20 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        <div className="bg-white p-6 rounded-3xl shadow-float mb-6 transform transition-transform hover:scale-105 group">
          <Stethoscope className="w-16 h-16 text-medical-600 group-hover:rotate-12 transition-transform duration-500" />
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          SwasthAI
        </h1>
        
        <div className="text-center space-y-1">
          <p className="text-medical-100 font-medium tracking-wide">Your health, our priority</p>
          <p className="text-medical-50/80 text-sm">आपका स्वास्थ्य, हमारी जिम्मेदारी</p>
        </div>
        
        <div className="mt-12 flex space-x-2">
           <div className="w-2.5 h-2.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
           <div className="w-2.5 h-2.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
           <div className="w-2.5 h-2.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
