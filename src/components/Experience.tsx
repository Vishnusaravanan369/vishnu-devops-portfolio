import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, ChevronDown } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  highlights: string[];
  tech: string[];
}

export function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
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

  const experiences: ExperienceItem[] = [
    {
      title: 'DevOps Intern',
      company: 'Internship Studio',
      period: 'APR 2025 - Present',
      highlights: [
        'Gained hands-on experience in Linux administration, shell scripting, and version control with Git/GitHub, including branching and merge conflict resolution.',
        'Deployed Java applications on Apache Tomcat and automated CI/CD pipelines using Jenkins integrated with GitHub.',
        'Used Ansible for configuration management and built mini-DevOps projects combining Git, Jenkins, Ansible, and shell scripting.',
      ],
      tech: ['Linux', 'Git', 'Jenkins', 'Ansible', 'Tomcat'],
    },
  ];

  return (
    <section ref={sectionRef} className="mb-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex items-center gap-3 mb-16"
      >
        <Briefcase className="w-7 h-7 text-[#00d9ff]" />
        <h2 className="text-4xl font-extrabold">Experience</h2>
      </motion.div>

      {/* Timeline Line */}
      <div className="absolute left-6 top-24 bottom-0 w-0.5 bg-gradient-to-b from-[#00ff88] to-[#00d9ff] hidden md:block" />

      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <ExperienceCard
            key={index}
            experience={exp}
            index={index}
            isVisible={isVisible}
            isExpanded={expandedCard === index}
            onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function ExperienceCard({ experience, index, isVisible, isExpanded, onToggle }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1 }}
      className="relative md:pl-32"
    >
      {/* Timeline Dot */}
      <div className="absolute left-3 top-4 w-6 h-6 rounded-full bg-[#00ff88] border-8 border-[#0a0e27] animate-pulse-scale hidden md:block" />

      <div
        className={`p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border transition-all duration-500 cursor-pointer ${
          isExpanded
            ? 'border-[#00ff88] shadow-[0_20px_60px_rgba(0,255,136,0.2)]'
            : 'border-slate-700 hover:border-[#00d9ff]/50'
        }`}
        onClick={onToggle}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold text-[#00ff88] mb-2">{experience.title}</h3>
            <p className="text-lg text-[#00d9ff] mb-1">{experience.company}</p>
            <p className="text-sm font-mono text-slate-400">{experience.period}</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-6 h-6 text-[#00ff88]" />
          </motion.div>
        </div>

        {/* Expandable Content */}
        <motion.div
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={
            isExpanded
              ? { maxHeight: 384, opacity: 1 }
              : { maxHeight: 0, opacity: 0 }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="space-y-4 mb-6 pt-4">
            {experience.highlights.map((highlight, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-[#00ff88] mt-1">▸</span>
                <p className="text-sm text-slate-300 leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-800/50 border border-[#00d9ff]/30 text-xs font-mono text-[#00d9ff]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
