import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Download, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { PERSON, SKILLS, ABOUT_TIMELINE, TOOLS, METRICS_ALL } from '../mock';
import CountUp from 'react-countup';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutPage() {
  const { ref: heroRef, inView: heroIn } = useInView({ triggerOnce: true });
  const { ref: metricsRef, inView: metricsIn } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { ref: timelineRef, inView: timelineIn } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: toolsRef, inView: toolsIn } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A0F1E', paddingTop: 120 }} className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroIn ? 'visible' : 'hidden'}
            variants={fadeUp}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>
                About
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>
              The Story Behind<br />
              <span style={{ color: '#2563EB' }}>the Results</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.8' }}>
              {PERSON.bio}
            </p>
            <div className="flex items-center gap-2 mt-6">
              <MapPin size={14} style={{ color: '#2563EB' }} />
              <span className="text-sm" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>{PERSON.location}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section ref={metricsRef} style={{ background: '#0D1628' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS_ALL.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-black" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}>
                  {m.prefix && <span style={{ color: '#60A5FA' }}>{m.prefix}</span>}
                  {metricsIn ? <CountUp end={m.value} decimals={m.decimals} duration={2} delay={i * 0.15} /> : '0'}
                  <span style={{ color: '#60A5FA' }}>{m.suffix}</span>
                </div>
                <div className="text-xs mt-1.5 font-medium" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>{m.label}</div>
                <div className="text-xs mt-0.5" style={{ color: '#334155', fontFamily: 'DM Sans, sans-serif' }}>{m.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>
                Core Expertise
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.75' }}>
                Over 5 years, I've developed deep expertise across the full e-commerce stack — from acquisition to retention.
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <Badge key={skill} className="px-3 py-1.5 text-xs font-medium" style={{ background: 'rgba(37,99,235,0.08)', color: '#1D4ED8', border: '1px solid rgba(37,99,235,0.15)', fontFamily: 'DM Sans, sans-serif' }}>
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="mt-8 flex gap-4">
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white" style={{ background: '#2563EB', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>
                  <Download size={15} /> Download CV
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold" style={{ border: '1.5px solid #E2E8F0', color: '#0A0F1E', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>
                  Work Together <ArrowRight size={15} />
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {['E-Commerce Strategy', 'Paid Advertising (Meta, TikTok, Google)', 'Product Research & Validation', 'Store Design & CRO', 'TikTok Shop Growth', 'Brand Identity & Positioning'].map((s, i) => (
                <div key={s} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                  <CheckCircle size={16} style={{ color: '#2563EB', flexShrink: 0 }} />
                  <span className="text-sm font-medium" style={{ color: '#0A0F1E', fontFamily: 'DM Sans, sans-serif' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-black mb-12" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>Career Timeline</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #2563EB, transparent)' }} />
            <div className="flex flex-col gap-8">
              {ABOUT_TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={timelineIn ? 'visible' : 'hidden'}
                  className="flex gap-8 pl-16 relative"
                >
                  <div className="absolute left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#0A0F1E', border: '2px solid #2563EB' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#2563EB' }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold mb-1" style={{ fontFamily: 'JetBrains Mono, monospace', color: '#2563EB' }}>{item.year}</div>
                    <div className="text-lg font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>{item.title}</div>
                    <div className="text-sm" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section ref={toolsRef} className="py-20" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-black mb-10" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>Tools I Use Daily</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TOOLS.map((tool, i) => (
              <motion.div key={tool.name} custom={i} variants={fadeUp} initial="hidden" animate={toolsIn ? 'visible' : 'hidden'}
                className="p-4 rounded-xl text-center"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
              >
                <div className="text-sm font-semibold" style={{ color: '#0A0F1E', fontFamily: 'DM Sans, sans-serif' }}>{tool.name}</div>
                <div className="text-xs mt-1" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>{tool.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
