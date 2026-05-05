import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, MessageCircle, MapPin } from 'lucide-react';
import { Separator } from '../ui/separator';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Paid Traffic & Ads', href: '/services' },
      { label: 'Product Research', href: '/services' },
      { label: 'Brand Strategy', href: '/services' },
      { label: 'Store Optimization', href: '/services' },
      { label: 'TikTok Shop Growth', href: '/services' },
      { label: 'Dropshipping Systems', href: '/services' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#070C1A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span
                className="text-2xl font-black"
                style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}
              >
                W<span style={{ color: '#2563EB' }}>.</span>Mostfaoui
              </span>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed max-w-xs"
              style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}
            >
              E-Commerce Strategist & Growth Operator. Building revenue machines for ambitious brands worldwide.
            </p>
            {/* Social */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:walid@mostfaoui.com"
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{
                  background: 'rgba(37,99,235,0.1)',
                  color: '#2563EB',
                  border: '1px solid rgba(37,99,235,0.2)',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://wa.me/213000000000"
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{
                  background: 'rgba(37,99,235,0.1)',
                  color: '#2563EB',
                  border: '1px solid rgba(37,99,235,0.2)',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="https://instagram.com/walidmostfaoui"
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{
                  background: 'rgba(37,99,235,0.1)',
                  color: '#2563EB',
                  border: '1px solid rgba(37,99,235,0.2)',
                  transition: 'background 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
            {/* Location */}
            <div className="mt-5 flex items-center gap-2">
              <MapPin size={14} style={{ color: '#2563EB' }} />
              <span className="text-xs" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>
                Algeria — Working Globally
              </span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.12em' }}
              >
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-sm"
                      style={{
                        color: '#64748B',
                        fontFamily: 'DM Sans, sans-serif',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#64748B'; }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Bottom */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}
          >
            © 2025 Walid Mostfaoui. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: '#334155', fontFamily: 'DM Sans, sans-serif' }}
          >
            E-Commerce Strategist & Growth Operator
          </p>
        </div>
      </div>
    </footer>
  );
}
