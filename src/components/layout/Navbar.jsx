import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const isActive = (href) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled || !isHome
          ? 'rgba(10, 15, 30, 0.92)'
          : 'transparent',
        backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
        borderBottom: scrolled || !isHome ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 group"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-xl font-black tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}
            >
              W<span style={{ color: '#2563EB' }}>.</span>Mostfaoui
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg"
                style={{
                  color: isActive(href) ? '#FFFFFF' : '#94A3B8',
                  fontFamily: 'DM Sans, sans-serif',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { if (!isActive(href)) e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseLeave={e => { if (!isActive(href)) e.currentTarget.style.color = '#94A3B8'; }}
              >
                {label}
                {isActive(href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(37, 99, 235, 0.15)', zIndex: -1 }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold text-white"
              style={{
                background: '#2563EB',
                fontFamily: 'DM Sans, sans-serif',
                textDecoration: 'none',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1D4ED8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Let's Talk
            </Link>
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg"
              style={{ color: '#FFFFFF', background: 'rgba(255,255,255,0.08)' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ background: 'rgba(10, 15, 30, 0.97)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="px-3 py-3 rounded-lg text-sm font-medium"
                  style={{
                    color: isActive(href) ? '#FFFFFF' : '#94A3B8',
                    background: isActive(href) ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                    fontFamily: 'DM Sans, sans-serif',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 px-3 py-3 rounded-lg text-sm font-semibold text-white text-center"
                style={{ background: '#2563EB', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none' }}
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
