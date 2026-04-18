import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../hooks/useLang'
import { T } from '../data/translations'

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 48 : direction === 'down' ? -48 : 0,
        x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const qualifications = [
  { icon: '🎓', label: 'B.A. Astrology', detail: 'Bengal Astrological Association (Govt. Recognized)' },
  { icon: '🏅', label: 'M.A.R.P (Cal)', detail: 'Astrological Research Project, Kolkata — Est. 1975' },
  { icon: '🎓', label: 'M.B.A', detail: 'Kolkata — Structured Consultation Approach' },
  { icon: '🥇', label: 'Life Member & Golden Silver Donor Fellow', detail: 'Astrological Research Project' },
  { icon: '📜', label: 'Reg. No: ARP/PA/1479/19', detail: 'Certified Practicing Astrologer' },
  { icon: '🏆', label: '"Honest Skilled Astrologer"', detail: 'Recognized by Bengal Astrological Association' },
]

const stats = [
  { num: '30+',      label: 'Years Experience', icon: '⏳', accent: 'rgba(245,200,66,0.12)',  border: 'rgba(245,200,66,0.28)',  glow: 'rgba(245,200,66,0.15)' },
  { num: '50,000+',  label: 'Satisfied Clients', icon: '👥', accent: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.28)', glow: 'rgba(192,132,252,0.12)' },
  { num: 'Pan India',label: 'Recognized Fame',   icon: '🇮🇳', accent: 'rgba(255,149,0,0.1)',  border: 'rgba(255,149,0,0.28)',  glow: 'rgba(255,149,0,0.12)' },
  { num: '24/7',     label: 'Available Online',  icon: '🌐', accent: 'rgba(37,211,102,0.1)',  border: 'rgba(37,211,102,0.28)', glow: 'rgba(37,211,102,0.12)' },
]

// ─── EMBER PARTICLES ──────────────────────────────────────────────────────────
function Embers() {
  const embers = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${20 + (i * 5.3) % 60}%`,
    delay: `${(i * 0.4) % 3}s`,
    duration: `${1.8 + (i % 4) * 0.5}s`,
    size: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
    color: i % 4 === 0 ? '#FFD000' : i % 4 === 1 ? '#FF9500' : i % 4 === 2 ? '#FF5E00' : '#FF2200',
  }))

  return (
    <div style={{
      position: 'absolute',
      bottom: '10%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '200px',
      height: '200px',
      pointerEvents: 'none',
      zIndex: 15,
    }}>
      {embers.map(e => (
        <div
          key={e.id}
          style={{
            position: 'absolute',
            bottom: 0,
            left: e.left,
            width: e.size,
            height: e.size,
            borderRadius: '50%',
            background: e.color,
            boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
            animation: `emberFloat ${e.duration} ease-out infinite`,
            animationDelay: e.delay,
          }}
        />
      ))}
    </div>
  )
}

// ─── BURNING PROFILE PHOTO ────────────────────────────────────────────────────
function BurningProfile() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '460px',
    }}>

      {/* ── Outermost slow-rotating ring ── */}
      <div
        className="rotate-slow"
        style={{
          position: 'absolute',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'conic-gradient(from 0deg, #FF2200, #FF5E00, #FFD000, #FF9500, #FF2200, #FFD000, #FF5E00, #FF2200)',
          padding: '2px',
          opacity: 0.55,
          filter: 'blur(1px)',
        }}
      >
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--cosmic-purple)' }} />
      </div>

      {/* ── Counter-rotating fire ring ── */}
      <div
        className="rotate-reverse"
        style={{
          position: 'absolute',
          width: '360px', height: '360px',
          borderRadius: '50%',
          background: 'conic-gradient(from 90deg, transparent 0deg, rgba(255,94,0,0.8) 30deg, rgba(255,208,0,0.9) 60deg, transparent 90deg, transparent 180deg, rgba(255,94,0,0.7) 210deg, rgba(255,208,0,0.8) 240deg, transparent 270deg)',
          opacity: 0.7,
          filter: 'blur(3px)',
        }}
      />

      {/* ── Pulsing fire halo ── */}
      <div style={{
        position: 'absolute',
        width: '320px', height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,94,0,0.25) 0%, rgba(255,150,0,0.15) 40%, transparent 70%)',
        animation: 'haloBreath 2.2s ease-in-out infinite',
      }} />

      {/* ── Gold divine halo behind head ── */}
      <div style={{
        position: 'absolute',
        width: '290px', height: '290px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 35%, rgba(255,220,80,0.28) 0%, rgba(255,150,0,0.12) 45%, transparent 70%)',
        animation: 'haloBreath 3s ease-in-out infinite 0.5s',
      }} />

      {/* ── Profile photo with fire border ── */}
      <div
        className="profile-fire-wrap"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div
          className="profile-fire-img"
          style={{
            width: '280px',
            height: '340px',
            borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
            overflow: 'hidden',
            border: '3px solid rgba(255,150,0,0.7)',
            position: 'relative',
          }}
        >
          <img
            src="/pandit_primary.jpeg"
            alt="Pandit Subrata Kumar Mukherjee — Trikaldarshi"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              filter: 'brightness(1.12) contrast(1.1) saturate(1.2) sepia(0.08)',
            }}
          />
          {/* Warm fire overlay on photo */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(255,100,0,0.08) 0%, transparent 40%, rgba(10,0,21,0.55) 100%)',
          }} />
          {/* Top fire glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(255,180,0,0.18) 0%, transparent 50%)',
          }} />
        </div>

        {/* Ember particles */}
        <Embers />
      </div>

      {/* ── Name badge ── */}
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 20,
        padding: '9px 28px',
        borderRadius: '9999px',
        background: 'linear-gradient(135deg, #C47F0A, #F5C842, #E8A020)',
        color: '#000',
        fontFamily: 'Cinzel, serif',
        fontWeight: 700,
        fontSize: '0.75rem',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 28px rgba(245,200,66,0.5), 0 0 60px rgba(255,94,0,0.2)',
        letterSpacing: '0.05em',
      }}>
        🔱 Certified Vedic Astrologer
      </div>

      {/* ── Floating credential badges ── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', right: '-12px', top: '50px', zIndex: 20 }}
      >
        <div style={{
          padding: '8px 14px',
          borderRadius: '12px',
          background: 'rgba(6,0,14,0.92)',
          border: '1px solid rgba(245,200,66,0.4)',
          color: '#F5C842',
          fontFamily: 'Cinzel, serif',
          fontWeight: 700,
          fontSize: '0.68rem',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 0 20px rgba(245,200,66,0.2)',
          letterSpacing: '0.05em',
        }}>
          🎓 B.A. Astrology
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        style={{ position: 'absolute', left: '-12px', bottom: '80px', zIndex: 20 }}
      >
        <div style={{
          padding: '8px 14px',
          borderRadius: '12px',
          background: 'rgba(6,0,14,0.92)',
          border: '1px solid rgba(245,200,66,0.4)',
          color: '#F5C842',
          fontFamily: 'Cinzel, serif',
          fontWeight: 700,
          fontSize: '0.68rem',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 0 20px rgba(245,200,66,0.2)',
          letterSpacing: '0.05em',
        }}>
          🏅 M.A.R.P (Cal)
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        style={{ position: 'absolute', left: '-4px', top: '70px', zIndex: 20 }}
      >
        <div style={{
          padding: '7px 12px',
          borderRadius: '10px',
          background: 'rgba(6,0,14,0.92)',
          border: '1px solid rgba(255,149,0,0.4)',
          color: '#FF9500',
          fontFamily: 'Cinzel, serif',
          fontWeight: 700,
          fontSize: '0.65rem',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 0 18px rgba(255,149,0,0.2)',
        }}>
          ⭐ 50,000+ Clients
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', right: '-4px', bottom: '120px', zIndex: 20 }}
      >
        <div style={{
          padding: '7px 12px',
          borderRadius: '10px',
          background: 'rgba(6,0,14,0.92)',
          border: '1px solid rgba(192,132,252,0.4)',
          color: '#C084FC',
          fontFamily: 'Cinzel, serif',
          fontWeight: 700,
          fontSize: '0.65rem',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 0 18px rgba(192,132,252,0.2)',
        }}>
          🔮 Trikaldarshi
        </div>
      </motion.div>
    </div>
  )
}

// ─── MAIN ABOUT SECTION ───────────────────────────────────────────────────────
export default function About() {
  const lang = useLang()
  const t = T[lang]?.about || T.en.about
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 48px)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000 0%, #080018 35%, #060520 65%, #0D0025 100%)',
      }}
    >
      {/* Background atmosphere */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Fire glow top-left */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,94,0,0.06), transparent 65%)',
        }} />
        {/* Purple glow bottom-right */}
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,0,139,0.07), transparent 65%)',
        }} />
        {/* Top border line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.4), transparent)',
        }} />
        {/* Bottom border line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.2), transparent)',
        }} />
        {/* Subtle star particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 6 === 0 ? 2 : 1,
            height: i % 6 === 0 ? 2 : 1,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#F5C842' : '#ffffff',
            left: `${(i * 4.1) % 100}%`,
            top: `${(i * 7.3) % 100}%`,
            opacity: 0.1 + (i % 5) * 0.05,
            animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.35) % 3}s`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 88px)' }}>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.62rem',
              letterSpacing: '0.55em',
              color: 'rgba(245,200,66,0.45)',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              {t.sectionLabel}
            </p>
            <h2 className="section-title gold-text" style={{ marginBottom: '18px' }}>
              {t.title}
            </h2>
            <div className="divine-divider" style={{ maxWidth: '300px', margin: '0 auto 16px' }} />
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.62rem',
              letterSpacing: '0.4em',
              color: 'rgba(245,200,66,0.3)',
              textTransform: 'uppercase',
            }}>
              {t.subtitle}
            </p>
          </div>
        </FadeIn>

        {/* ── Two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(48px, 7vw, 100px)',
          alignItems: 'center',
        }}>

          {/* LEFT — Burning profile photo */}
          <FadeIn direction="right">
            <BurningProfile />
          </FadeIn>

          {/* RIGHT — Bio content */}
          <FadeIn direction="left" delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(18px, 2.5vw, 28px)' }}>

              {/* Name & title */}
              <div>
                <h3
                  className="cinzel-deco"
                  style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                    fontWeight: 900,
                    lineHeight: 1.15,
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #FFE066 0%, #F5C842 35%, #E8A020 65%, #F5C842 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Pandit Subrata Kr. Mukherjee
                </h3>
                <p style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.38em',
                  color: 'rgba(245,200,66,0.42)',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  {t.role}
                </p>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
                  fontStyle: 'italic',
                  color: 'rgba(255,149,0,0.7)',
                  letterSpacing: '0.02em',
                }}>
                  {t.roleSubtitle}
                </p>
              </div>

              <div className="divine-divider" />

              {/* Bio paragraphs */}
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: 'rgba(240,232,208,0.88)',
                lineHeight: 1.85,
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                fontWeight: 400,
              }}>
                {t.bio1a}{' '}
                <span style={{ color: '#F5C842', fontWeight: 600 }}>{t.bio1b}</span>{' '}
                {t.bio1c}{' '}
                <span style={{ color: '#F5C842', fontWeight: 600 }}>{t.bio1d}</span>{' '}
                {t.bio1e}
              </p>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(240,232,208,0.62)',
                lineHeight: 1.8,
                fontSize: 'clamp(0.82rem, 1.3vw, 0.92rem)',
              }}>
                {t.bio2a}{' '}
                <span style={{ color: 'rgba(245,200,66,0.85)', fontWeight: 500 }}>{t.bio2b}</span>
                {t.bio2c}{' '}
                <span style={{ color: '#F5C842', fontWeight: 600 }}>{t.bio2d}</span>
                {t.bio2e}
              </p>

              {/* Qualifications card */}
              <div style={{
                borderRadius: '20px',
                padding: 'clamp(18px, 3vw, 28px)',
                background: 'linear-gradient(135deg, rgba(245,200,66,0.05), rgba(13,0,37,0.7))',
                border: '1px solid rgba(245,200,66,0.16)',
                backdropFilter: 'blur(14px)',
              }}>
                <h4 style={{
                  fontFamily: 'Cinzel, serif',
                  color: '#F5C842',
                  fontWeight: 700,
                  fontSize: '0.62rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  marginBottom: '18px',
                }}>
                  🎓 {t.qualTitle}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {t.quals.map((q, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                    >
                      <span style={{ fontSize: '0.95rem', marginTop: '2px', flexShrink: 0 }}>🎓</span>
                      <div>
                        <span style={{
                          fontFamily: 'Cinzel, serif',
                          color: 'rgba(245,200,66,0.9)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                        }}>
                          {q.label}
                        </span>
                        <span style={{
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgba(240,232,208,0.38)',
                          fontSize: '0.7rem',
                          marginLeft: '8px',
                        }}>
                          — {q.detail}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  { icon: '📍', text: t.tags[0], bg: 'rgba(245,200,66,0.07)', border: 'rgba(245,200,66,0.2)', color: '#F5C842' },
                  { icon: '🌐', text: t.tags[1], bg: 'rgba(37,211,102,0.07)', border: 'rgba(37,211,102,0.2)', color: '#4ade80' },
                  { icon: '🇮🇳', text: t.tags[2], bg: 'rgba(139,0,139,0.07)', border: 'rgba(192,132,252,0.2)', color: '#c084fc' },
                ].map(tag => (
                  <div
                    key={tag.text}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      padding: '7px 16px',
                      borderRadius: '9999px',
                      background: tag.bg,
                      border: `1px solid ${tag.border}`,
                      color: tag.color,
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.7rem',
                    }}
                  >
                    <span>{tag.icon}</span> {tag.text}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Stats Row ── */}
        {(() => {
          const STAT_META = [
            { icon: '⏳', accent: 'rgba(245,200,66,0.12)',  border: 'rgba(245,200,66,0.28)',  glow: 'rgba(245,200,66,0.15)' },
            { icon: '👥', accent: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.28)', glow: 'rgba(192,132,252,0.12)' },
            { icon: '🇮🇳', accent: 'rgba(255,149,0,0.1)',  border: 'rgba(255,149,0,0.28)',  glow: 'rgba(255,149,0,0.12)' },
            { icon: '🌐', accent: 'rgba(37,211,102,0.1)',  border: 'rgba(37,211,102,0.28)', glow: 'rgba(37,211,102,0.12)' },
          ]
          return (
        <div style={{
          marginTop: 'clamp(56px, 8vw, 112px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 'clamp(14px, 2vw, 24px)',
        }}>
          {t.stats.map((s, i) => {
            const meta = STAT_META[i] || STAT_META[0]
            return (
            <FadeIn key={s.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 0 40px ${meta.glow}` }}
                transition={{ duration: 0.3 }}
                style={{
                  borderRadius: '20px',
                  padding: 'clamp(20px, 3vw, 32px)',
                  textAlign: 'center',
                  background: meta.accent,
                  border: `1px solid ${meta.border}`,
                  backdropFilter: 'blur(14px)',
                  boxShadow: `0 0 24px ${meta.glow}`,
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{meta.icon}</div>
                <div style={{
                  fontFamily: 'Cinzel Decorative, serif',
                  fontSize: 'clamp(1.3rem, 2.5vw, 2.2rem)',
                  fontWeight: 900,
                  lineHeight: 1.1,
                  background: 'linear-gradient(135deg, #FFE066, #F5C842)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: 'Cinzel, serif',
                  color: 'rgba(245,200,66,0.48)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginTop: '6px',
                }}>
                  {s.label}
                </div>
              </motion.div>
            </FadeIn>
            )
          })}
        </div>
          )
        })()}
      </div>
    </section>
  )
}
