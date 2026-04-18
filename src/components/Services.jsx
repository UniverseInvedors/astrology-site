import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLang } from '../hooks/useLang'
import { T } from '../data/translations'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const services = [
  {
    icon: '📿',
    title: 'Kundli Reading',
    desc: 'Deep analysis of your birth chart — planets, houses, doshas, and their impact on every aspect of your life.',
    accent: '#FFD700',
    gradient: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,140,0,0.04) 100%)',
  },
  {
    icon: '🔮',
    title: 'Life Prediction',
    desc: 'Accurate predictions about career, marriage, health, wealth, and life events based on planetary positions.',
    accent: '#9C27B0',
    gradient: 'linear-gradient(135deg, rgba(156,39,176,0.08) 0%, rgba(103,58,183,0.04) 100%)',
  },
  {
    icon: '⚡',
    title: 'Problem Resolution',
    desc: 'Identify upcoming obstacles and receive powerful remedies — rituals, gemstones, mantras — to neutralize them.',
    accent: '#FF3B3B',
    gradient: 'linear-gradient(135deg, rgba(255,59,59,0.08) 0%, rgba(233,30,99,0.04) 100%)',
  },
  {
    icon: '💑',
    title: 'Love & Marriage',
    desc: 'Kundli matching, relationship compatibility, marriage timing, and solutions for love-related problems.',
    accent: '#FF69B4',
    gradient: 'linear-gradient(135deg, rgba(255,105,180,0.08) 0%, rgba(236,64,122,0.04) 100%)',
  },
  {
    icon: '💼',
    title: 'Career & Business',
    desc: 'Guidance on the right career path, business timing, job changes, and financial growth strategies.',
    accent: '#2196F3',
    gradient: 'linear-gradient(135deg, rgba(33,150,243,0.08) 0%, rgba(3,169,244,0.04) 100%)',
  },
  {
    icon: '🏥',
    title: 'Health Astrology',
    desc: 'Predict health vulnerabilities from your chart and receive astrological remedies for well-being.',
    accent: '#4CAF50',
    gradient: 'linear-gradient(135deg, rgba(76,175,80,0.08) 0%, rgba(67,160,71,0.04) 100%)',
  },
  {
    icon: '💎',
    title: 'Gemstone Therapy',
    desc: 'Personalized gemstone recommendations based on your planetary chart to enhance positive energies.',
    accent: '#00BCD4',
    gradient: 'linear-gradient(135deg, rgba(0,188,212,0.08) 0%, rgba(0,172,193,0.04) 100%)',
  },
  {
    icon: '🕯️',
    title: 'Vastu & Remedies',
    desc: 'Vastu corrections, puja recommendations, and spiritual remedies to remove negative energies from your space.',
    accent: '#FF9800',
    gradient: 'linear-gradient(135deg, rgba(255,152,0,0.08) 0%, rgba(251,140,0,0.04) 100%)',
  },
  {
    icon: '🌟',
    title: 'Numerology',
    desc: 'Name correction, lucky numbers, and numerological analysis to align your life with cosmic vibrations.',
    accent: '#673AB7',
    gradient: 'linear-gradient(135deg, rgba(103,58,183,0.08) 0%, rgba(94,53,177,0.04) 100%)',
  },
]

export default function Services() {
  const lang = useLang()
  const t = T[lang]?.services || T.en.services
  const SERVICE_META = [
    { icon: '📿', accent: '#FFD700', gradient: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(255,140,0,0.04) 100%)' },
    { icon: '🔮', accent: '#9C27B0', gradient: 'linear-gradient(135deg, rgba(156,39,176,0.08) 0%, rgba(103,58,183,0.04) 100%)' },
    { icon: '⚡', accent: '#FF3B3B', gradient: 'linear-gradient(135deg, rgba(255,59,59,0.08) 0%, rgba(233,30,99,0.04) 100%)' },
    { icon: '💑', accent: '#FF69B4', gradient: 'linear-gradient(135deg, rgba(255,105,180,0.08) 0%, rgba(236,64,122,0.04) 100%)' },
    { icon: '💼', accent: '#2196F3', gradient: 'linear-gradient(135deg, rgba(33,150,243,0.08) 0%, rgba(3,169,244,0.04) 100%)' },
    { icon: '🏥', accent: '#4CAF50', gradient: 'linear-gradient(135deg, rgba(76,175,80,0.08) 0%, rgba(67,160,71,0.04) 100%)' },
    { icon: '💎', accent: '#00BCD4', gradient: 'linear-gradient(135deg, rgba(0,188,212,0.08) 0%, rgba(0,172,193,0.04) 100%)' },
    { icon: '🕯️', accent: '#FF9800', gradient: 'linear-gradient(135deg, rgba(255,152,0,0.08) 0%, rgba(251,140,0,0.04) 100%)' },
    { icon: '🌟', accent: '#673AB7', gradient: 'linear-gradient(135deg, rgba(103,58,183,0.08) 0%, rgba(94,53,177,0.04) 100%)' },
  ]
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0a0015 0%, #050520 50%, #0a0015 100%)',
        padding: 'clamp(80px, 10vw, 120px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Animated background stars */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              borderRadius: '50%',
              background: '#FFD700',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
              boxShadow: i % 5 === 0 ? '0 0 4px #FFD700' : 'none',
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)', position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 8vw, 96px)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.5))' }}>
              🌟
            </div>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.7rem',
              letterSpacing: '0.5em',
              color: 'rgba(255,215,0,0.5)',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              {t.sectionLabel}
            </p>
            <h2 className="section-title gold-text" style={{ marginBottom: 20 }}>
              {t.title}
            </h2>
            <div className="divine-divider" style={{ maxWidth: 400, margin: '0 auto 24px' }} />
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              maxWidth: 640,
              margin: '0 auto',
              lineHeight: 1.8,
            }}>
              {t.subtitle1} <span style={{ color: '#FFD700', fontWeight: 600 }}>{t.subtitle2}</span>{t.subtitle3}
            </p>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(20px, 3vw, 32px)',
          marginBottom: 'clamp(56px, 8vw, 96px)',
        }}>
          {t.items.map((s, i) => {
            const meta = SERVICE_META[i] || SERVICE_META[0]
            return (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  padding: 'clamp(24px, 4vw, 32px)',
                  borderRadius: 20,
                  background: meta.gradient,
                  border: `1px solid ${meta.accent}25`,
                  backdropFilter: 'blur(12px)',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.borderColor = `${meta.accent}50`
                  e.currentTarget.style.boxShadow = `0 12px 48px ${meta.accent}20, 0 0 0 1px ${meta.accent}15`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = `${meta.accent}25`
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${meta.accent}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ fontSize: 'clamp(2.2rem, 4vw, 2.8rem)', marginBottom: 20, filter: `drop-shadow(0 0 8px ${meta.accent}60)` }}>{meta.icon}</div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontWeight: 700, color: meta.accent, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)', lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.08em', color: `${meta.accent}90` }}>
                  <span>{t.consultNow}</span><span>→</span>
                </div>
              </div>
            </FadeIn>
            )
          })}
        </div>

        {/* Bottom CTA Card */}
        <FadeIn delay={0.3}>
          <div style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: 'clamp(32px, 5vw, 48px)',
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(255,215,0,0.06) 0%, rgba(139,0,139,0.08) 100%)',
            border: '1px solid rgba(255,215,0,0.2)',
            backdropFilter: 'blur(16px)',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            <div style={{
              fontSize: '3.5rem',
              marginBottom: 20,
              filter: 'drop-shadow(0 0 16px rgba(255,215,0,0.5))',
            }}>
              🔱
            </div>
            <h3 style={{
              fontFamily: 'Cinzel Decorative, serif',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              marginBottom: 16,
            }} className="gold-text">
              {t.ctaTitle}
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 560,
              margin: '0 auto 32px',
            }}>
              {t.ctaDesc1} <span style={{ color: '#FFD700', fontWeight: 600 }}>{t.ctaDesc2}</span>{t.ctaDesc3}
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 16,
            }}>
              <a
                href="https://wa.me/919735805602?text=Namaste%20Pandit%20Ji%2C%20I%20would%20like%20to%20consult%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 32px',
                  borderRadius: 999,
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#fff',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>💬</span>
                {t.whatsappNow}
              </a>
              <a
                href="tel:9434999869"
                className="call-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 32px',
                  borderRadius: 999,
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#000',
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(255,215,0,0.4)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>📞</span>
                {t.callLabel}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

