import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../../mock';

const FLAG_CODES = {
  MA: '🇲🇦', FR: '🇫🇷', AE: '🇦🇪',
  DE: '🇩🇪', DZ: '🇩🇿',
};

function TestimonialCard({ t }) {
  return (
    <div
      className="flex-none w-80 lg:w-96 p-7 rounded-2xl snap-start"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={14} style={{ color: '#FBBF24', fill: '#FBBF24' }} />
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-sm leading-relaxed mb-6"
        style={{
          color: '#CBD5E1',
          fontFamily: 'DM Sans, sans-serif',
          lineHeight: '1.75',
        }}
      >
        “{t.text}”
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)' }}
        >
          <span
            className="text-sm font-bold"
            style={{ color: '#60A5FA', fontFamily: 'Syne, sans-serif' }}
          >
            {t.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-sm font-semibold"
              style={{ color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif' }}
            >
              {t.name}
            </span>
            <span className="text-base">{FLAG_CODES[t.flag] || ''}</span>
          </div>
          <div
            className="text-xs"
            style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}
          >
            {t.role} · {t.country}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref: headRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 340;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  return (
    <section id="testimonials" className="py-24 lg:py-32" style={{ background: '#0A0F1E' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.14em' }}
              >
                Testimonials
              </span>
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black leading-tight"
              style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}
            >
              What Clients Say
            </h2>
          </motion.div>

          {/* Arrow Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canLeft}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: canLeft ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: canLeft ? '#60A5FA' : '#334155',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canRight}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: canRight ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: canRight ? '#60A5FA' : '#334155',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 0 ? 20 : 6,
                height: 6,
                background: i === 0 ? '#2563EB' : 'rgba(255,255,255,0.15)',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
