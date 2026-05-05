import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { METRICS_HERO } from '../../mock';

export default function MetricsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      id="metrics"
      style={{
        background: '#0D1628',
        borderTop: '1px solid rgba(37,99,235,0.15)',
        borderBottom: '1px solid rgba(37,99,235,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {METRICS_HERO.map((metric, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center group px-4"
              style={{
                borderRight: i < METRICS_HERO.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <div
                className="text-4xl lg:text-5xl font-black tracking-tight"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#FFFFFF' }}
              >
                {metric.prefix && (
                  <span style={{ color: '#60A5FA' }}>{metric.prefix}</span>
                )}
                {inView ? (
                  <CountUp
                    end={metric.value}
                    decimals={metric.decimals}
                    duration={2.5}
                    delay={i * 0.2}
                    useEasing
                  />
                ) : (
                  '0'
                )}
                <span style={{ color: '#60A5FA' }}>{metric.suffix}</span>
              </div>
              <div
                className="mt-2.5 text-xs font-medium uppercase tracking-widest"
                style={{
                  color: '#475569',
                  fontFamily: 'DM Sans, sans-serif',
                  letterSpacing: '0.12em',
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
