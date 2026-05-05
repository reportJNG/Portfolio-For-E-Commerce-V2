import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Search, Layers, ShoppingBag, Play, Package, CheckCircle } from 'lucide-react';
import { SERVICES } from '../mock';

const iconMap = { TrendingUp, Search, Layers, ShoppingBag, Play, Package };

const PROCESS = [
  { step: '01', title: 'Discovery Call', description: "We start with a deep-dive audit of your current situation — store, ads, products, and goals. I'll identify the biggest opportunities and build a roadmap." },
  { step: '02', title: 'Strategy Build', description: 'Based on findings, I build a tailored strategy: which channels to focus on, what products to push, how to structure campaigns, and clear KPIs.' },
  { step: '03', title: 'Execution', description: 'I execute the plan with precision — launching campaigns, building systems, and testing creatives. Full transparency on all metrics.' },
  { step: '04', title: 'Scale & Optimize', description: 'Once winning systems are in place, we scale aggressively. Weekly reviews, rapid iteration, and constant optimization to compound results.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

export default function ServicesPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: procRef, inView: procIn } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A0F1E', paddingTop: 120 }} className="pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>Services</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>
              How I Can Help<br /><span style={{ color: '#2563EB' }}>Your Business</span>
            </h1>
            <p className="text-lg" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.75' }}>
              Six specialized services designed to take e-commerce brands from struggling to scaling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || TrendingUp;
              return (
                <motion.div
                  key={service.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="p-8 rounded-2xl"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.12)' }}>
                      <Icon size={22} style={{ color: '#2563EB' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>{service.title}</h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7' }}>{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(37,99,235,0.08)', color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>{service.tag}</span>
                        <span className="text-sm font-bold" style={{ color: '#2563EB', fontFamily: 'JetBrains Mono, monospace' }}>{service.highlight}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={procRef} className="py-20" style={{ background: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-black mb-12 text-center" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>The Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <motion.div key={step.step} custom={i} variants={fadeUp} initial="hidden" animate={procIn ? 'visible' : 'hidden'}
                className="p-6 rounded-2xl relative"
                style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}
              >
                <div className="text-4xl font-black mb-4" style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(37,99,235,0.15)' }}>{step.step}</div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>{step.title}</h3>
                <p className="text-sm" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7' }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#0A0F1E' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>
            Ready to Scale?
          </h2>
          <p className="text-base mb-8" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>Let's start with a free 30-minute strategy call.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-semibold text-white"
            style={{ background: '#2563EB', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>
            Book a Strategy Call <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
