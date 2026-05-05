import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Target, Lightbulb, Zap, TrendingUp } from 'lucide-react';
import { CASE_STUDIES } from '../mock';

const SECTIONS = [
  { icon: Target, label: 'The Problem', key: 'problem' },
  { icon: Lightbulb, label: 'Strategy', key: 'strategyDetail' },
  { icon: Zap, label: 'Execution', key: 'strategy' },
  { icon: TrendingUp, label: 'Results', key: 'resultsDetail' },
];

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const cs = CASE_STUDIES.find(c => c.slug === slug);

  if (!cs) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0F1E', paddingTop: 80 }}>
        <div className="text-center">
          <h1 className="text-3xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>Case Study Not Found</h1>
          <Link to="/case-studies" className="text-sm font-medium" style={{ color: '#2563EB', textDecoration: 'none' }}>Back to Case Studies</Link>
        </div>
      </div>
    );
  }

  const idx = CASE_STUDIES.findIndex(c => c.slug === slug);
  const next = CASE_STUDIES[idx + 1] || CASE_STUDIES[0];

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A0F1E', paddingTop: 100 }} className="pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/case-studies" className="inline-flex items-center gap-2 text-sm mb-8 block" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Back to Case Studies
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: cs.accentColor + '20', color: cs.accentColor, fontFamily: 'DM Sans, sans-serif' }}>{cs.niche}</span>
              <span className="text-xs px-2.5 py-1 rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>{cs.platform}</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>{cs.brand}</h1>
            <p className="text-xl font-bold" style={{ fontFamily: 'JetBrains Mono, monospace', color: cs.accentColor }}>{cs.result}</p>
          </motion.div>
        </div>
      </section>

      {/* Metrics highlight */}
      <section style={{ background: '#0D1628', borderTop: `1px solid ${cs.accentColor}20`, borderBottom: `1px solid ${cs.accentColor}20` }} className="py-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {cs.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'JetBrains Mono, monospace', color: cs.accentColor }}>{m.value}</div>
                <div className="text-xs mt-1" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SECTIONS.map(({ icon: Icon, label, key }) => (
              cs[key] && (
                <div key={key} className="p-7 rounded-2xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.08)' }}>
                      <Icon size={18} style={{ color: '#2563EB' }} />
                    </div>
                    <h3 className="text-lg font-bold" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>{label}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.75' }}>{cs[key]}</p>
                </div>
              )
            ))}
          </div>

          {/* Strategy full */}
          <div className="mt-8 p-8 rounded-2xl" style={{ background: '#0A0F1E' }}>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>Full Strategy Breakdown</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.8' }}>{cs.strategyDetail}</p>
            <p className="text-sm leading-relaxed" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.8' }}>{cs.resultsDetail}</p>
          </div>
        </div>
      </section>

      {/* Next case study */}
      <section className="py-12" style={{ background: '#F1F5F9' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>Next Case Study</span>
          <Link to={`/case-studies/${next.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#2563EB', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
            {next.brand} <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
