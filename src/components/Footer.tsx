import { FileText, ExternalLink } from 'lucide-react';

export function Footer() {
  const handleViewResume = () => {
    // Replace this URL with actual Google Drive link
    window.open('https://drive.google.com/file/d/1rdwhW2iYEbqUoQkXjfpiEQbPco_LM7NU/view?usp=drive_link', '_blank');
  };

  return (
    <footer className="border-t border-slate-800 py-16 text-center">
      <div className="max-w-6xl mx-auto px-6">
        {/* View Resume Button */}
        <div className="mb-8">
          <button
            onClick={handleViewResume}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-slate-700 hover:border-[#00ff88] hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,255,136,0.3)] transition-all duration-300"
          >
            <FileText className="w-5 h-5 text-[#00ff88] group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-base font-semibold text-slate-200 group-hover:text-[#00ff88] transition-colors">
              View Resume
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#00ff88] transition-colors" />
          </button>
        </div>

        <p className="text-sm font-mono mb-2">
          <span className="text-slate-500">$ </span>
          <span className="text-[#00ff88]">echo</span>
          <span className="text-slate-300"> "Built with </span>
          <span className="text-[#00d9ff]">passion</span>
          <span className="text-slate-300"> & </span>
          <span className="text-[#9d4edd]">precision</span>
          <span className="text-slate-300">"</span>
        </p>
        <p className="text-xs font-mono text-slate-500">
          $ exit 0 → <span className="text-[#00ff88]">Session ended successfully</span>
        </p>
      </div>
    </footer>
  );
}