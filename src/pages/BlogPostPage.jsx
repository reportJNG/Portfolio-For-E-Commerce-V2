import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../mock';

const CATEGORY_COLORS = {
  'Product Research': { bg: 'rgba(245,158,11,0.1)', text: '#D97706' },
  'TikTok Shop':      { bg: 'rgba(236,72,153,0.1)', text: '#DB2777' },
  'Dropshipping':     { bg: 'rgba(16,185,129,0.1)', text: '#059669' },
  'Meta Ads':         { bg: 'rgba(37,99,235,0.1)',  text: '#2563EB' },
  'Store Setup':      { bg: 'rgba(124,58,237,0.1)', text: '#7C3AED' },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFFFF', paddingTop: 80 }}>
        <div className="text-center">
          <h1 className="text-3xl font-black mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>Article Not Found</h1>
          <Link to="/blog" className="text-sm font-medium" style={{ color: '#2563EB', textDecoration: 'none' }}>Back to Blog</Link>
        </div>
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[post.category] || { bg: 'rgba(37,99,235,0.1)', text: '#2563EB' };
  const related = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

  const lines = post.content.split('\n').filter(Boolean);

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0A0F1E', paddingTop: 100 }} className="pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm mb-8 block" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}>
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: catStyle.bg, color: catStyle.text, fontFamily: 'DM Sans, sans-serif' }}>{post.category}</span>
            <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-5" style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF', lineHeight: '1.25' }}>{post.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5"><Calendar size={13} style={{ color: '#475569' }} /><span className="text-sm" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>{post.date}</span></div>
              <div className="flex items-center gap-1.5"><Clock size={13} style={{ color: '#475569' }} /><span className="text-sm" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>{post.readTime}</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article content */}
      <section className="py-12" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {/* Summary block */}
          <div className="p-6 rounded-xl mb-10" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderLeft: '4px solid #2563EB' }}>
            <p className="text-base" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.75' }}>{post.summary}</p>
          </div>

          {/* Content */}
          <div className="prose-custom">
            {lines.map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-2xl font-black mt-10 mb-4" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>{line.replace('## ', '')}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="text-xl font-bold mt-8 mb-3" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold mb-2" style={{ color: '#0A0F1E', fontFamily: 'DM Sans, sans-serif' }}>{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="text-base mb-2 ml-4" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7' }}>{line.replace('- ', '')}</li>;
              }
              if (/^\d+\./.test(line)) {
                return <li key={i} className="text-base mb-2 ml-4 list-decimal" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.7' }}>{line.replace(/^\d+\.\s/, '')}</li>;
              }
              return <p key={i} className="text-base mb-4" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.8' }}>{line}</p>;
            })}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 flex items-center gap-3" style={{ borderTop: '1px solid #E2E8F0' }}>
            <Share2 size={16} style={{ color: '#94A3B8' }} />
            <span className="text-sm" style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}>Share this article</span>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12" style={{ background: '#F8FAFC' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h3 className="text-xl font-black mb-6" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E' }}>Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map(p => {
                const cs = CATEGORY_COLORS[p.category] || { bg: 'rgba(37,99,235,0.1)', text: '#2563EB' };
                return (
                  <Link key={p.id} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="p-5 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', transition: 'border-color 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                    >
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: cs.bg, color: cs.text }}>{p.category}</span>
                      <p className="mt-2 text-sm font-bold leading-snug" style={{ fontFamily: 'Syne, sans-serif', color: '#0A0F1E', lineHeight: '1.4' }}>{p.title}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}>Read <ArrowLeft size={11} className="rotate-180" /></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
