import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../../mock';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const CATEGORY_COLORS = {
  'Product Research': { bg: 'rgba(245,158,11,0.1)', text: '#D97706' },
  'TikTok Shop':      { bg: 'rgba(236,72,153,0.1)', text: '#DB2777' },
  'Dropshipping':     { bg: 'rgba(16,185,129,0.1)', text: '#059669' },
  'Meta Ads':         { bg: 'rgba(37,99,235,0.1)',  text: '#2563EB' },
  'Store Setup':      { bg: 'rgba(124,58,237,0.1)', text: '#7C3AED' },
};

export default function BlogPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="py-24 lg:py-32" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.14em' }}
              >
                Blog
              </span>
            </div>
            <h2
              className="text-4xl lg:text-5xl font-black leading-tight"
              style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}
            >
              Insights & Strategies
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0"
            style={{ color: '#2563EB', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}
          >
            All Articles <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const catStyle = CATEGORY_COLORS[post.category] || { bg: 'rgba(37,99,235,0.1)', text: '#2563EB' };
            return (
              <motion.div
                key={post.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none' }}
                  className="group block h-full"
                >
                  <div
                    className="h-full p-7 rounded-2xl"
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#2563EB';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,99,235,0.08)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Category */}
                    <span
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                      style={{
                        background: catStyle.bg,
                        color: catStyle.text,
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    >
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold leading-snug mb-3"
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        color: '#0A0F1E',
                        lineHeight: '1.4',
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p
                      className="text-sm leading-relaxed mb-6 line-clamp-3"
                      style={{
                        color: '#64748B',
                        fontFamily: 'DM Sans, sans-serif',
                        lineHeight: '1.7',
                      }}
                    >
                      {post.summary}
                    </p>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between pt-4"
                      style={{ borderTop: '1px solid #E2E8F0' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} style={{ color: '#94A3B8' }} />
                          <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>
                            {post.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} style={{ color: '#94A3B8' }} />
                          <span className="text-xs" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-xs font-semibold flex items-center gap-1"
                        style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
