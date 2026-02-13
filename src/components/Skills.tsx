import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings, Cloud, Workflow, Server, Code } from 'lucide-react';

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: typeof Cloud;
  skills: Skill[];
}

export function Skills() {
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

  const categories: SkillCategory[] = [
    {
      title: 'Cloud & Infrastructure',
      icon: Cloud,
      skills: [
        { name: 'AWS (EC2, S3, VPC)', percentage: 85 },
        { name: 'Docker', percentage: 90 },
        { name: 'Kubernetes', percentage: 70 },
      ],
    },
    {
      title: 'CI/CD & Automation',
      icon: Workflow,
      skills: [
        { name: 'Jenkins', percentage: 75 },
        { name: 'Ansible', percentage: 75 },
        { name: 'Git/GitHub', percentage: 90 },
      ],
    },
    {
      title: 'Systems & Scripting',
      icon: Server,
      skills: [
        { name: 'Linux (Ubuntu)', percentage: 90 },
        { name: 'Shell Scripting', percentage: 80 },
        { name: 'systemd', percentage: 75 },
      ],
    },
    {
      title: 'Programming',
      icon: Code,
      skills: [
        { name: 'Python', percentage: 50 },
        { name: 'SQL', percentage: 90 },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="mb-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex items-center gap-3 mb-16"
      >
        <Settings className="w-7 h-7 text-[#00ff88]" />
        <h2 className="text-4xl font-extrabold">Technical Skills</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <SkillCard
            key={index}
            category={category}
            delay={index * 0.1}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}

interface SkillCardProps {
  category: SkillCategory;
  delay: number;
  isVisible: boolean;
}

function SkillCard({ category, delay, isVisible }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay }}
      className="group p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-700 hover:border-[#00ff88]/50 transition-all duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-6 h-6 text-[#00d9ff]" />
        <h3 className="text-2xl font-semibold text-[#00d9ff]">{category.title}</h3>
      </div>

      <div className="space-y-4">
        {category.skills.map((skill, skillIndex) => (
          <div key={skillIndex}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{skill.name}</span>
              <motion.span
                initial={{ opacity: 0, scale: 1 }}
                animate={
                  isHovered
                    ? { opacity: 1, scale: 1.1 }
                    : { opacity: 0, scale: 1 }
                }
                transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                className="text-xs font-mono text-slate-400"
              >
                {skill.percentage}%
              </motion.span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={
                  isHovered
                    ? { width: `${skill.percentage}%` }
                    : { width: 0 }
                }
                transition={{ duration: 1, ease: 'easeOut', delay: skillIndex * 0.1 }}
                className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d9ff] rounded-full shadow-[0_0_10px_rgba(0,255,136,0.5)]"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
