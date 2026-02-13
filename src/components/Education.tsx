import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award } from 'lucide-react';

export function Education() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex items-center gap-3 mb-16"
      >
        <GraduationCap className="w-7 h-7 text-[#3b82f6]" />
        <h2 className="text-4xl font-extrabold">Education & Certification</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0 }}
          className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700 hover:border-[#3b82f6]/50 transition-all duration-500"
        >
          <div className="flex gap-4">
            <GraduationCap className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-[#3b82f6] mb-2">
                Bachelor of Engineering
              </h3>
              <p className="text-lg text-slate-300 mb-1">Computer Science and Engineering</p>
              <p className="text-sm text-slate-400 mb-2">Annamalai University, Chidambaram</p>
              <p className="text-sm text-slate-400 mb-4">2020 - 2024</p>
              <div className="inline-block px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30">
                <span className="text-sm font-mono text-[#3b82f6]">CGPA: 8.19</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certification Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700 hover:border-[#00ff88]/50 transition-all duration-500"
        >
          <div className="flex gap-4">
            <Award className="w-6 h-6 text-[#00ff88] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold text-[#00ff88] mb-2">DevOps and SQL</h3>
              <p className="text-lg text-slate-300 mb-1">QSpiders, Bengaluru</p>
              <p className="text-sm text-slate-400 mb-4">AUG 2024 - MAR 2025</p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-[#00ff88]">▸</span>
                  <p className="text-sm text-slate-400">Hands-on training in SQL and databases</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#00ff88]">▸</span>
                  <p className="text-sm text-slate-400">CI/CD, Git, and DevOps practices</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
