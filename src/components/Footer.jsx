import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../hooks/useLang'
import { T } from '../data/translations'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Pandit Ji' },
  { href: '#services', label: 'Services' },
  { href: '#credentials', label: 'Certifications' },
  { href: '#dos-donts', label: "Do's & Don'ts" },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

const contactItems = [
  { icon: '📞', label: '+91 94349 99869 (Call)', href: 'tel:9434999869', hoverColor: '#F5C842' },
  { icon: '📱', label: '+91 97358 05602 (Call)', href: 'tel:9735805602', hoverColor: '#F5C842' },
  { icon: '💬', label: '+91 97358 05602 (WhatsApp)', href: 'https://wa.me/919735805602', hoverColor: '#4ade80', external: true },
  { icon: '✉️', label: 'subratamukherjeetheimmortal@gmail.com', href: 'mailto:subratamukherjeetheimmortal@gmail.com', hoverColor: '#60C8FF' },
]

export default function Footer() {
  const lang = useLang()
  const t = T[lang]?.footer || T.en.footer
  const quickLinks = [
    { href: '#home', label: t.links?.[0] || 'Home' },
    { href: '#about', label: t.links?.[1] || 'About Pandit Ji' },
    { href: '#services', label: t.links?.[2] || 'Services' },
    { href: '#credentials', label: t.links?.[3] || 'Certifications' },
    { href: '#dos-donts', label: t.links?.[4] || "Do's & Don'ts" },
    { href: '#gallery', label: t.links?.[5] || 'Gallery' },
    { href: '#contact', label: t.links?.[6] || 'Contact' },
  ]
  return (
    <footer style={{
      position: 'relative',
      background: '#000',
      overflow: 'hidden',
    }}>
      {/* Gold top border line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.6) 25%, rgba(255,255,255,0.9) 50%, rgba(255,215,0,0.6) 75%, transparent 100%)',
      }} />

      {/* Subtle bg glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse at top, rgba(255,215,0,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: 'clamp(48px, 7vw, 88px) clamp(16px, 5vw, 48px) clamp(32px, 5vw, 56px)',
      }}>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          marginBottom: 'clamp(32px, 5vw, 56px)',
        }}>

          {/* Brand column */}
          <FadeIn delay={0}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Logo */}
              <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
                <span style={{ fontSize: '2.4rem', filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.6))' }}>🔱</span>
                <div>
                  <div className="cinzel-deco" style={{
                    color: '#FFD700',
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    lineHeight: 1.2,
                  }}>
                    Trikaldarshi
                  </div>
                  <div className="cinzel" style={{
                    color: 'rgba(255,215,0,0.45)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>
                    PANDIT SUBRATA KR. MUKHERJEE
                  </div>
                </div>
              </a>

              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, rgba(255,215,0,0.3), transparent)',
              }} />

              <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)', lineHeight: 1.75, fontFamily: 'Raleway, sans-serif' }}>
                {t.tagline}
              </p>

              {/* Credential pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['B.A. Astrology', 'M.A.R.P (Cal)', 'M.B.A'].map((q) => (
                  <span key={q} className="cinzel" style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    background: 'rgba(255,215,0,0.06)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    color: 'rgba(255,215,0,0.65)',
                    fontSize: '0.62rem',
                  }}>
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Quick Links column */}
          <FadeIn delay={0.1}>
            <div>
              <h4 className="cinzel" style={{ color: '#FFD700', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '24px' }}>
                {t.quickLinks}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {quickLinks.map(({ href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ x: 4, color: '#FFD700' }}
                    transition={{ duration: 0.2 }}
                    className="cinzel"
                    style={{
                      color: 'rgba(255,255,255,0.48)',
                      fontSize: '0.8rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    <span style={{ color: 'rgba(255,215,0,0.35)', fontSize: '0.6rem' }}>▸</span>
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Contact column */}
          <FadeIn delay={0.2}>
            <div>
              <h4 className="cinzel" style={{ color: '#FFD700', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '24px' }}>
                {t.contactTitle}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {contactItems.map(({ icon, label, href, hoverColor, external }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    whileHover={{ color: hoverColor }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      color: 'rgba(255,255,255,0.52)',
                      fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
                      textDecoration: 'none',
                      fontFamily: 'Raleway, sans-serif',
                      transition: 'color 0.25s ease',
                      wordBreak: 'break-all',
                    }}
                  >
                    <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
                    {label}
                  </motion.a>
                ))}

                {/* Address */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  color: 'rgba(255,255,255,0.42)',
                  fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
                  fontFamily: 'Raleway, sans-serif',
                }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>📍</span>
                  <span>Vill: Al-Pursuri, P.O. Agar, Dist: Paschim Medinipur, West Bengal</span>                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Divider */}
        <div className="divine-divider" style={{ marginBottom: 'clamp(20px, 3vw, 32px)' }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          textAlign: 'center',
        }}>
          <p className="cinzel" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.68rem' }}>
            {t.copyright}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Reg. No: ARP/PA/1479/19', 'M.A.R.P (Cal)', 'B.A. Astrology'].map((c, i, arr) => (
              <span key={c} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="cinzel" style={{ color: 'rgba(255,215,0,0.38)', fontSize: '0.65rem' }}>{c}</span>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(255,215,0,0.18)', fontSize: '0.65rem' }}>·</span>
                )}
              </span>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.82rem' }}>
            🕉️ {t.mantra}
          </p>
        </div>
      </div>
    </footer>
  )
}


