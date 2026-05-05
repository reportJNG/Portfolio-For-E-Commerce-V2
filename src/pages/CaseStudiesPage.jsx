import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { CASE_STUDIES } from '../mock';

const PLATFORMS = ['All', 'Shopify', 'WooCommerce', 'TikTok Shop'];

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeFilter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.platform.includes(activeFilter));

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A0F1E', paddingTop: 120 }} className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>Portfolio</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>
              Case Studies
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.75' }}>
              Real brands, real results. Here's the work that speaks for itself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-16" style={{ background: '#F1F5F9' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            <Filter size={14} style={{ color: '#94A3B8' }} />
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setActiveFilter(p)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: activeFilter === p ? '#2563EB' : 'rgba(255,255,255,0.6)',
                  color: activeFilter === p ? '#FFFFFF' : '#475569',
                  border: activeFilter === p ? 'none' : '1px solid #E2E8F0',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((cs, i) => (
              <motion.div
                key={cs.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <Link to={`/case-studies/${cs.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    className="group p-7 rounded-2xl h-full relative"
                    style={{
                      background: '#0A0F1E',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = cs.accentColor + '40';
                      e.currentTarget.style.boxShadow = `0 20px 50px ${cs.accentColor}18`;
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: cs.accentColor, opacity: 0.5 }} />
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ background: cs.accentColor + '20', color: cs.accentColor, fontFamily: 'DM Sans, sans-serif' }}>{cs.niche}</span>
                        <h3 className="text-2xl font-black mt-2" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>{cs.brand}</h3>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: '#94A3B8', fontFamily: 'DM Sans, sans-serif', flexShrink: 0 }}>{cs.platform}</span>
                    </div>
                    <p className="text-2xl font-black mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>{cs.result}</p>
                    <p className="text-sm mb-5" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>in {cs.period}</p>
                    <div className="flex gap-5 mb-5">
                      {cs.metrics.map(m => (
                        <div key={m.label}>
                          <div className="text-lg font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: cs.accentColor }}>{m.value}</div>
                          <div className="text-xs" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>
                      View Case Study <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
