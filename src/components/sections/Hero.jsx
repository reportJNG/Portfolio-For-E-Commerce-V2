import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import HeroScene from '../three/HeroScene';
import { PERSON } from '../../mock';

const nameWords = PERSON.name.split(' ');

const charVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.3 + i * 0.045, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden"
      style={{
        background: '#0A0F1E',
        minHeight: '100vh',
      }}
    >
      {/* Three.js Background */}
      <HeroScene />

      {/* Subtle radial overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(37,99,235,0.07) 0%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(37,99,235,0.12)',
              border: '1px solid rgba(37,99,235,0.3)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#2563EB' }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: '#60A5FA', fontFamily: 'DM Sans, sans-serif' }}
            >
              Available for new projects
            </span>
          </motion.div>

          {/* Animated Name */}
          <div
            className="overflow-hidden"
            style={{ perspective: '800px' }}
          >
            <h1
              className="text-6xl lg:text-8xl font-black tracking-tight leading-none mb-0"
              style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}
            >
              {nameWords.map((word, wIdx) => {
                const prevLetters = nameWords.slice(0, wIdx).join(' ').length + (wIdx > 0 ? 1 : 0);
                return (
                  <span key={wIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: wIdx < nameWords.length - 1 ? '0.2em' : 0 }}>
                    {word.split('').map((char, cIdx) => (
                      <motion.span
                        key={cIdx}
                        custom={prevLetters + cIdx}
                        variants={charVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ display: 'inline-block' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                );
              })}
            </h1>
          </div>

          {/* Title */}
          <motion.p
            className="mt-5 text-lg lg:text-xl font-medium tracking-wide uppercase"
            style={{
              color: '#60A5FA',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.08em',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {PERSON.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-2xl lg:text-3xl font-bold leading-snug"
            style={{ color: '#E2E8F0', fontFamily: 'Syne, sans-serif' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.6 }}
          >
            "I don't just sell products —{' '}
            <span style={{ color: '#2563EB' }}>I build revenue machines.</span>"
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white"
              style={{
                background: '#2563EB',
                fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none',
                transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1D4ED8';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(37,99,235,0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#2563EB';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Work With Me <ArrowRight size={16} />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold"
              style={{
                border: '1.5px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, transform 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              See My Work
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="mt-14 flex flex-wrap gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            {[['$2.4M+', 'Revenue Generated'], ['4.7x', 'Avg ROAS'], ['23+', 'Stores Scaled']].map(([val, label]) => (
              <div key={label}>
                <div
                  className="text-2xl font-black"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}
                >
                  {val}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        style={{ zIndex: 10 }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.15em' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ color: '#2563EB' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
