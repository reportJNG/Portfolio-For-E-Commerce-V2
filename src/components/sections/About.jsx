import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Download, MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import { PERSON, SKILLS } from '../../mock';

const orbs = [
  { size: 180, x: '30%', y: '20%', color: 'rgba(37,99,235,0.12)', delay: 0 },
  { size: 120, x: '65%', y: '55%', color: 'rgba(96,165,250,0.08)', delay: 1.5 },
  { size: 90, x: '15%', y: '70%', color: 'rgba(29,78,216,0.1)', delay: 0.8 },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="about" className="py-24 lg:py-32" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.14em' }}
              >
                About
              </span>
            </div>

            <h2
              className="text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}
            >
              5+ Years of Building<br />
              <span style={{ color: '#2563EB' }}>E-Commerce Revenue</span>
            </h2>

            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.8' }}
            >
              {PERSON.bio}
            </p>

            <div className="flex items-center gap-2 mb-8">
              <MapPin size={14} style={{ color: '#2563EB' }} />
              <span
                className="text-sm"
                style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}
              >
                {PERSON.location}
              </span>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs font-medium px-3 py-1"
                  style={{
                    background: 'rgba(37,99,235,0.08)',
                    color: '#1D4ED8',
                    border: '1px solid rgba(37,99,235,0.15)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white"
                style={{
                  background: '#2563EB',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1D4ED8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Full Story <ArrowRight size={15} />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold"
                style={{
                  border: '1.5px solid #E2E8F0',
                  color: '#0A0F1E',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#94A3B8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Download size={15} /> Download CV
              </a>
            </div>
          </motion.div>

          {/* Right — Abstract Visual */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #0A0F1E 0%, #0F1C3F 50%, #0A0F1E 100%)',
                maxWidth: 480,
              }}
            >
              {/* Floating orbs */}
              {orbs.map((orb, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: orb.size,
                    height: orb.size,
                    left: orb.x,
                    top: orb.y,
                    background: orb.color,
                    filter: 'blur(40px)',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    duration: 4 + orb.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: orb.delay,
                  }}
                />
              ))}

              {/* Center stats card */}
              <div
                className="relative z-10 p-8 rounded-2xl text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}
                >
                  <span style={{ color: '#60A5FA', fontSize: 28 }}>W</span>
                </div>
                <div className="text-5xl font-black mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>
                  $2.4M+
                </div>
                <div className="text-sm" style={{ color: '#60A5FA', fontFamily: 'DM Sans, sans-serif' }}>
                  Revenue Generated
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[['4.7x', 'Avg ROAS'], ['23+', 'Stores']].map(([v, l]) => (
                    <div key={l} className="text-center">
                      <div className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>{v}</div>
                      <div className="text-xs" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid lines decoration */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
