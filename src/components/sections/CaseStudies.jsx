import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { CASE_STUDIES } from '../../mock';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CaseCard({ cs, index, large = false }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative group rounded-2xl overflow-hidden"
      style={{
        background: '#0A0F1E',
        border: `1px solid ${hovered ? cs.accentColor + '40' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 50px ${cs.accentColor}18` : 'none',
        minHeight: large ? 340 : 280,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: cs.accentColor, opacity: hovered ? 1 : 0.4, transition: 'opacity 0.3s ease' }}
      />

      {/* Content */}
      <div className="p-7 h-full flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: cs.accentColor + '20',
                    color: cs.accentColor,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {cs.niche}
                </span>
              </div>
              <h3
                className="text-xl font-black"
                style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}
              >
                {cs.brand}
              </h3>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-md font-medium flex-shrink-0"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#94A3B8',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {cs.platform}
            </span>
          </div>

          {/* Result headline */}
          <p
            className="text-2xl lg:text-3xl font-black mb-2 leading-tight"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}
          >
            {cs.result}
          </p>
          <p
            className="text-sm"
            style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}
          >
            in {cs.period}
          </p>
        </div>

        <div>
          {/* Key metrics */}
          <div className="flex gap-5 mb-5 mt-4">
            {cs.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <div
                  className="text-lg font-bold"
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: cs.accentColor }}
                >
                  {m.value}
                </div>
                <div className="text-xs" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Strategy snippet */}
          <p
            className="text-xs mb-5 leading-relaxed"
            style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}
          >
            {cs.strategy}
          </p>

          {/* CTA */}
          <Link
            to={`/case-studies/${cs.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{
              color: hovered ? cs.accentColor : '#64748B',
              fontFamily: 'DM Sans, sans-serif',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
          >
            Read Case Study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="case-studies" className="py-24 lg:py-32" style={{ background: '#F1F5F9' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.14em' }}
              >
                Case Studies
              </span>
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black leading-tight"
              style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}
            >
              Results That Speak
            </h2>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0"
            style={{
              color: '#2563EB',
              textDecoration: 'none',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            All Case Studies <ArrowRight size={14} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CASE_STUDIES.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} index={i} large={i === 0 || i === 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
