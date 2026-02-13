import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  githubUrl?: string;
}

export function Projects() {
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

  const projects: Project[] = [
    {
      title: 'Kubernetes Cluster on AWS',
      description:
        'Built a single-node Kubernetes cluster on AWS EC2 using kubeadm with containerd (systemd cgroups) and required Linux networking configurations.',
      highlights: [
        'Installed and troubleshot Calico CNI, resolving Node NotReady and CrashLoopBackOff issues',
        'Diagnosed kube-apiserver (6443) connectivity issues and validated cluster health',
      ],
      tech: ['AWS', 'Kubernetes', 'kubeadm', 'Calico', 'containerd'],
      githubUrl: 'https://github.com/Vishnusaravanan369/Kubernetes-Search-Engine-Deployment',
    },
    {
      title: 'Cloud Deployment & DevOps Implementation',
      description:
        'Deployed web apps on AWS EC2 using Docker, Nginx, and custom Docker Hub images.',
      highlights: [
        'Managed containers with Docker CLI, improving resource usage and consistency',
        'Fixed deployment issues like 403 errors, port conflicts, and Dockerfile errors',
      ],
      tech: ['AWS', 'Docker', 'Nginx'],
      githubUrl: 'https://github.com/Vishnusaravanan369/Docker-Cloud-Deployment',
    },
    {
      title: 'Ansible-Based Multi-Node Setup on AWS',
      description:
        'Set up Ubuntu 24.04 EC2 instances with users, passwordless sudo, SSH access, and secure networking.',
      highlights: [
        'Configured Ansible with node private IPs and SSH trust for smooth automation',
        'Verified connectivity by running remote tasks like package installs and file creation',
      ],
      tech: ['AWS', 'Ansible', 'Ubuntu', 'SSH'],
      githubUrl: 'https://github.com/Vishnusaravanan369/Ansible-AWS-multi-node-setup',
    },
    {
      title: 'CI/CD Pipeline for Static Website Deployment',
      description:
        'Built an automated CI/CD pipeline using Jenkins Freestyle job to deploy a static website on a Linux server with Nginx.',
      highlights: [
        'Configured GitHub webhook integration for automatic build triggers on code push',
        'Set up Jenkins workspace to clone repository and copy files to Nginx web root',
        'Implemented post-build actions for deployment status notifications',
        'Configured Nginx virtual host for serving static content with custom domain',
      ],
      tech: ['Jenkins', 'GitHub', 'Nginx', 'Linux', 'Shell Scripting'],
      githubUrl: 'https://github.com/Vishnusaravanan369',
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
        <Code className="w-7 h-7 text-[#9d4edd]" />
        <h2 className="text-4xl font-extrabold">Projects</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
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

interface ProjectCardProps {
  project: Project;
  index: number;
  isVisible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function ProjectCard({ project, index, isVisible, isExpanded, onToggle }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border transition-all duration-500 cursor-pointer ${isExpanded
        ? 'border-[#9d4edd]/50 shadow-[0_20px_60px_rgba(157,78,221,0.2)]'
        : 'border-slate-700 hover:border-[#9d4edd]/50 hover:shadow-[0_20px_60px_rgba(157,78,221,0.2)]'
        }`}
      onClick={onToggle}
    >
      <h3 className="text-xl font-semibold text-[#9d4edd] hover:text-[#c084fc] transition-colors mb-4">
        {project.title}
      </h3>

      <p className="text-sm text-slate-300 leading-relaxed mb-6">{project.description}</p>

      {/* Expandable Highlights */}
      <motion.div
        initial={{ maxHeight: 0, opacity: 0 }}
        animate={
          isExpanded
            ? { maxHeight: 384, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="overflow-hidden mb-6"
      >
        <div className="space-y-2 pt-2">
          {project.highlights.map((highlight, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-[#9d4edd] text-sm">•</span>
              <p className="text-xs text-slate-400 leading-relaxed">{highlight}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-2 items-center">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-full bg-slate-800/50 border border-[#9d4edd]/30 text-xs font-mono text-[#9d4edd]"
          >
            {tech}
          </span>
        ))}
        {project.githubUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.githubUrl, '_blank');
            }}
            className="ml-auto p-2 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-[#00ff88] hover:bg-slate-700/50 transition-all duration-300 group"
            title="View on GitHub"
          >
            <Github className="w-4 h-4 text-slate-400 group-hover:text-[#00ff88] transition-colors" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
