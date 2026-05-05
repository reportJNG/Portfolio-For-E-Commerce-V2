import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar, Search } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Input } from '../components/ui/input';
import { BLOG_POSTS } from '../mock';

const CATEGORY_COLORS = {
  'Product Research': { bg: 'rgba(245,158,11,0.1)', text: '#D97706' },
  'TikTok Shop':      { bg: 'rgba(236,72,153,0.1)', text: '#DB2777' },
  'Dropshipping':     { bg: 'rgba(16,185,129,0.1)', text: '#059669' },
  'Meta Ads':         { bg: 'rgba(37,99,235,0.1)',  text: '#2563EB' },
  'Store Setup':      { bg: 'rgba(124,58,237,0.1)', text: '#7C3AED' },
};

const ALL_CATS = ['All', ...Object.keys(CATEGORY_COLORS)];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = BLOG_POSTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.summary.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A0F1E', paddingTop: 120 }} className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>Blog</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}>Insights &<br />Strategies</h1>
            <p className="text-lg max-w-xl" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>Tactical e-commerce knowledge from 5+ years in the trenches.</p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="py-8" style={{ background: '#0D1628', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {ALL_CATS.map(cat => {
                const color = CATEGORY_COLORS[cat];
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      background: activeCategory === cat ? (color?.bg || 'rgba(37,99,235,0.2)') : 'rgba(255,255,255,0.04)',
                      color: activeCategory === cat ? (color?.text || '#60A5FA') : '#64748B',
                      border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      fontFamily: 'DM Sans, sans-serif',
                      transition: 'background 0.2s ease, color 0.2s ease',
                    }}
                  >{cat}</button>
                );
              })}
            </div>
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }} />
              <Input
                placeholder="Search articles..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-8 text-sm"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>No articles found.</p>
            </div>
          ) : (
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => {
                const catStyle = CATEGORY_COLORS[post.category] || { bg: 'rgba(37,99,235,0.1)', text: '#2563EB' };
                return (
                  <motion.div key={post.id} custom={i} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                      <div
                        className="h-full p-7 rounded-2xl"
                        style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,99,235,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'DM Sans, sans-serif' }}>{post.category}</span>
                        <h3 className="text-lg font-bold leading-snug mb-3" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E', lineHeight: '1.4' }}>{post.title}</h3>
                        <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7' }}>{post.summary}</p>
                        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5"><Calendar size={12} style={{ color: '#94A3B8' }} /><span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>{post.date}</span></div>
                            <div className="flex items-center gap-1.5"><Clock size={12} style={{ color: '#94A3B8' }} /><span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>{post.readTime}</span></div>
                          </div>
                          <span className="text-xs font-semibold flex items-center gap-1" style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>Read <ArrowRight size={12} /></span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
