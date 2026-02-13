import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, Github, Terminal, Check } from 'lucide-react';

export function Hero() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactButtons = [
    {
      icon: Mail,
      text: 'vishnusaravanan369@gmail.com',
      color: '#00ff88',
      action: () => handleCopy('vishnusaravanan369@gmail.com', 'email')
    },
    {
      icon: Phone,
      text: '+91 8660299231',
      color: '#00d9ff',
      action: () => handleCopy('+91 8660299231', 'phone')
    },
    {
      icon: Linkedin,
      text: 'LinkedIn',
      color: '#3b82f6',
      action: () => window.open('https://www.linkedin.com/in/vishnu-saravanan369/', '_blank')
    },
    {
      icon: Github,
      text: 'GitHub',
      color: '#9d4edd',
      action: () => window.open('https://github.com/Vishnusaravanan369', '_blank')
    },
  ];

  return (
    <section className="mb-32 text-center pt-16">
      {/* Pipeline Indicator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mb-12 animate-pulse-slow" />

      {/* Terminal Badge */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-xl border border-[#00ff88]/30 mb-8"
      >
        <Terminal className="w-4 h-4 text-[#00ff88]" />
        <span className="font-mono text-[#00ff88] text-sm">$ whoami</span>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold mb-3"
        style={{
          background: 'linear-gradient(135deg, #00ff88 0%, #00d9ff 50%, #9d4edd 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}
      >
        VISHNU SARAVANAN
      </motion.h1>

      {/* Job Title */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-2xl md:text-3xl font-light text-[#00d9ff] mb-12"
        style={{ letterSpacing: '0.02em' }}
      >
        DevOps Engineer
      </motion.p>

      {/* Contact Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {contactButtons.map((button, index) => {
          const Icon = button.icon;
          const isCopied = copiedField === button.text;

          return (
            <button
              key={index}
              onClick={button.action}
              className="group flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-slate-700 hover:scale-105 transition-all duration-300"
              style={{
                borderColor: `var(--hover-border, #334155)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.setProperty('--hover-border', button.color);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--hover-border', '#334155');
              }}
            >
              {isCopied ? (
                <Check className="w-[18px] h-[18px] transition-transform duration-300 text-[#00ff88]" />
              ) : (
                <Icon className="w-[18px] h-[18px] group-hover:rotate-12 transition-transform duration-300" />
              )}
              <span className="text-sm">{button.text}</span>
            </button>
          );
        })}
      </motion.div>
    </section>
  );
}
