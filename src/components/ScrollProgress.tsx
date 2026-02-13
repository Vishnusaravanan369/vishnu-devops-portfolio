interface ScrollProgressProps {
  progress: number;
}

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
      <div
        className="h-full bg-gradient-to-r from-[#00ff88] via-[#00d9ff] to-[#3b82f6] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
