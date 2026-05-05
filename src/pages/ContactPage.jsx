import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/sections/Contact';
import { PERSON } from '../mock';
import { Mail, MessageCircle, Instagram, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A0F1E', paddingTop: 120 }} className="pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>Get In Touch</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>
              Ready to Scale?<br />
              <span style={{ color: '#2563EB' }}>Let's Talk.</span>
            </h1>
          </motion.div>

          {/* Quick contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
            {[
              { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
              { icon: MapPin, label: 'Timezone', value: 'CET (Algeria)' },
              { icon: Mail, label: 'Email', value: PERSON.email },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,99,235,0.15)' }}>
                  <Icon size={16} style={{ color: '#60A5FA' }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>{label}</div>
                  <div className="text-sm font-medium" style={{ color: '#CBD5E1', fontFamily: 'DM Sans, sans-serif' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main contact form section */}
      <Contact />
    </main>
  );
}
