import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  TrendingUp, Search, Layers, ShoppingBag, Play, Package, ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../mock';

const iconMap = {
  TrendingUp, Search, Layers, ShoppingBag, Play, Package,
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="py-24 lg:py-32" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-px" style={{ background: '#2563EB' }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.14em' }}
            >
              Services
            </span>
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black leading-tight mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}
          >
            What I Do Best
          </h2>
          <p
            className="text-base"
            style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7' }}
          >
            End-to-end e-commerce growth services, built around one goal: making your store profitable.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || TrendingUp;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="group relative p-7 rounded-2xl"
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.08), 0 20px 40px rgba(37,99,235,0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(37,99,235,0.08)',
                    border: '1px solid rgba(37,99,235,0.12)',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <Icon size={22} style={{ color: '#2563EB' }} />
                </div>

                {/* Content */}
                <h3
                  className="text-lg font-bold mb-2.5"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7' }}
                >
                  {service.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: 'rgba(37,99,235,0.08)',
                      color: '#2563EB',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {service.tag}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {service.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold"
            style={{
              border: '1.5px solid #2563EB',
              color: '#2563EB',
              fontFamily: 'DM Sans, sans-serif',
              textDecoration: 'none',
              transition: 'background 0.2s ease, color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2563EB';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#2563EB';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View All Services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
