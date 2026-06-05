export default function Footer() {
  return (
    <footer className="mt-12 py-8 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-slate-400">
          <a href="#" className="hover:text-medical-600 transition-colors">About</a>
          <span>•</span>
          <a href="#" className="hover:text-medical-600 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-medical-600 transition-colors">Terms of Use</a>
        </div>
        
        <p>© 2026 SwasthAI Health Ministry Pilot. All rights reserved.</p>
        
        <div className="flex items-center justify-center gap-2 mt-4 inline-flex px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
          <span className="text-xs font-semibold text-slate-600">Powered by</span>
          <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500">Gemini AI</span>
        </div>
      </div>
    </footer>
  );
}
