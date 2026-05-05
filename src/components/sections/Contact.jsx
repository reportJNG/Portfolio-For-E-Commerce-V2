import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { Mail, MessageCircle, Instagram, Send, CheckCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { PERSON } from '../../mock';

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // Mock form submission
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ background: '#0A0F1E' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px" style={{ background: '#2563EB' }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.14em' }}
              >
                Contact
              </span>
            </div>

            <h2
              className="text-4xl lg:text-5xl font-black leading-tight mb-6"
              style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}
            >
              Let's Build Something{' '}
              <span style={{ color: '#2563EB' }}>Profitable</span>{' '}
              Together
            </h2>

            <p
              className="text-base mb-10 leading-relaxed"
              style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif', lineHeight: '1.75' }}
            >
              Whether you're looking to scale an existing store, launch a new brand, or optimize your ad spend — let's talk.
            </p>

            {/* Contact Methods */}
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: 'Email', value: PERSON.email, href: `mailto:${PERSON.email}` },
                { icon: MessageCircle, label: 'WhatsApp', value: PERSON.whatsapp, href: 'https://wa.me/213000000000' },
                { icon: Instagram, label: 'Instagram', value: PERSON.instagram, href: 'https://instagram.com/walidmostfaoui' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(37,99,235,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(37,99,235,0.3)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,99,235,0.15)' }}
                  >
                    <Icon size={18} style={{ color: '#60A5FA' }} />
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: '#475569', fontFamily: 'DM Sans, sans-serif' }}>
                      {label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: '#CBD5E1', fontFamily: 'DM Sans, sans-serif' }}>
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'rgba(37,99,235,0.15)' }}
                  >
                    <CheckCircle size={32} style={{ color: '#60A5FA' }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: 'Syne, sans-serif', color: '#FFFFFF' }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-sm" style={{ color: '#64748B', fontFamily: 'DM Sans, sans-serif' }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium"
                    style={{ color: '#2563EB', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-xs font-medium mb-1.5 block"
                        style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="text-sm"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: errors.name ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.1)',
                          color: '#FFFFFF',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                        {...register('name', { required: 'Name is required' })}
                      />
                      {errors.name && (
                        <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-xs font-medium mb-1.5 block"
                        style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="text-sm"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: errors.email ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.1)',
                          color: '#FFFFFF',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                        })}
                      />
                      {errors.email && (
                        <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="subject"
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="What do you need help with?"
                      className="text-sm"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#FFFFFF',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                      {...register('subject')}
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: '#94A3B8', fontFamily: 'DM Sans, sans-serif' }}
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your store, your goals, and what you're struggling with..."
                      rows={5}
                      className="text-sm resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: errors.message ? '1px solid #EF4444' : '1px solid rgba(255,255,255,0.1)',
                        color: '#FFFFFF',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                      {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Min 20 chars' } })}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: '#EF4444' }}>{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-sm font-semibold text-white"
                    style={{
                      background: loading ? '#1E3A5F' : '#2563EB',
                      fontFamily: 'DM Sans, sans-serif',
                      transition: 'background 0.2s ease, transform 0.2s ease',
                    }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#1D4ED8'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = loading ? '#1E3A5F' : '#2563EB'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
