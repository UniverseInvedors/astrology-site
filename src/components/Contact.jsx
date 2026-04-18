import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import ConsultationForm from './ConsultationForm'
import { useLang } from '../hooks/useLang'
import { T } from '../data/translations'

// ─── FADE IN WRAPPER ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 48 : direction === 'down' ? -48 : 0,
        x: direction === 'left' ? 56 : direction === 'right' ? -56 : 0,
      }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── CONTACT CHANNEL CARD ─────────────────────────────────────────────────────
function ChannelCard({ href, external, icon, label, value, subtext, accentColor, borderColor, bgColor, delay }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const Tag = href ? motion.a : motion.div

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ y: hovered ? -4 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(14px, 2vw, 20px)',
          padding: 'clamp(16px, 2.5vw, 22px) clamp(18px, 3vw, 28px)',
          borderRadius: '18px',
          background: hovered ? bgColor.replace('0.06', '0.1').replace('0.04', '0.08') : bgColor,
          border: `1px solid ${hovered ? accentColor + '55' : borderColor}`,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: hovered
            ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accentColor}20, inset 0 1px 0 ${accentColor}15`
            : '0 4px 20px rgba(0,0,0,0.25)',
          textDecoration: 'none',
          cursor: href ? 'pointer' : 'default',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 50%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }} />

        {/* Icon box */}
        <motion.div
          animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            width: 'clamp(48px, 6vw, 60px)',
            height: 'clamp(48px, 6vw, 60px)',
            borderRadius: '14px',
            background: `${accentColor}15`,
            border: `1px solid ${accentColor}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
            flexShrink: 0,
            boxShadow: hovered ? `0 0 20px ${accentColor}30` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {icon}
        </motion.div>

        {/* Text */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.6rem',
            letterSpacing: '0.35em',
            color: `${accentColor}70`,
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            {label}
          </p>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            fontWeight: 700,
            color: hovered ? accentColor : accentColor + 'CC',
            transition: 'color 0.25s ease',
            wordBreak: 'break-all',
            lineHeight: 1.3,
          }}>
            {value}
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.38)',
            fontSize: '0.72rem',
            marginTop: '3px',
            fontFamily: 'Raleway, sans-serif',
          }}>
            {subtext}
          </p>
        </div>

        {/* Arrow */}
        {href && (
          <motion.div
            animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.25 }}
            style={{ color: accentColor, fontSize: '1rem', flexShrink: 0 }}
          >
            →
          </motion.div>
        )}
      </Tag>
    </motion.div>
  )
}

// ─── PROFILE HERO CARD ────────────────────────────────────────────────────────
function ProfileHeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        borderRadius: '28px',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #0d0020 0%, #1a0035 50%, #0a0015 100%)',
        border: '1px solid rgba(255,215,0,0.25)',
        boxShadow: '0 0 60px rgba(255,215,0,0.1), 0 32px 80px rgba(0,0,0,0.7)',
      }}
    >
      {/* Background membership card image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src="/membership_id_card.jpeg"
          alt="Official Membership Card"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.35) saturate(0.8)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(13,0,32,0.3) 0%, rgba(13,0,32,0.95) 100%)',
        }} />
        {/* Floating badge */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          padding: '6px 14px',
          borderRadius: '9999px',
          background: 'rgba(255,215,0,0.12)',
          border: '1px solid rgba(255,215,0,0.35)',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.65rem',
          color: '#FFD700',
          backdropFilter: 'blur(10px)',
        }}>
          🪪 Life Member · ARP
        </div>
      </div>

      {/* Profile content */}
      <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
        {/* Profile row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          {/* Profile photo circle */}
          <div style={{
            width: 72, height: 72,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255,215,0,0.5)',
            boxShadow: '0 0 24px rgba(255,215,0,0.35)',
            flexShrink: 0,
          }}>
            <img
              src="/pandit_primary.jpeg"
              alt="Pandit Subrata Kumar Mukherjee"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          <div>
            <h3 style={{
              fontFamily: 'Cinzel Decorative, serif',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #FFD700, #FFF0A0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.3,
              marginBottom: '4px',
            }}>
              Pandit Subrata Kr. Mukherjee
            </h3>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              color: 'rgba(255,215,0,0.5)',
              textTransform: 'uppercase',
            }}>
              Trikaldarshi · Astrological Consultant
            </p>
          </div>
        </div>

        {/* Credential pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {['M.A.R.P (Cal)', 'B.A. Astrology', 'M.B.A', 'Reg: ARP/PA/1479/19'].map(c => (
            <span key={c} style={{
              padding: '4px 12px',
              borderRadius: '9999px',
              background: 'rgba(255,215,0,0.07)',
              border: '1px solid rgba(255,215,0,0.2)',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.6rem',
              color: 'rgba(255,215,0,0.7)',
            }}>
              ✓ {c}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255,215,0,0.3), transparent)',
          marginBottom: '20px',
        }} />

        {/* Stats mini row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { num: '30+', label: 'Years' },
            { num: '50K+', label: 'Clients' },
            { num: '24/7', label: 'Available' },
          ].map(s => (
            <div key={s.label} style={{
              textAlign: 'center',
              padding: '12px 8px',
              borderRadius: '12px',
              background: 'rgba(255,215,0,0.05)',
              border: '1px solid rgba(255,215,0,0.12)',
            }}>
              <div style={{
                fontFamily: 'Cinzel Decorative, serif',
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FFD700, #FFF0A0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {s.num}
              </div>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.58rem',
                color: 'rgba(255,215,0,0.4)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginTop: '3px',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            onClick={() => {
              // Scroll to contact section and open form
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              setTimeout(() => setShowForm(true), 400)
            }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '13px 16px',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
            }}
          >
            <span style={{ fontSize: '1rem' }}>💬</span> WhatsApp
          </button>
          <a
            href="tel:9434999869"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '13px 16px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #F5C842, #C47F0A)',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#000',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(245,200,66,0.35)',
            }}
          >
            <span style={{ fontSize: '1rem' }}>📞</span> Call Now
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── WHAT TO PREPARE CARD ─────────────────────────────────────────────────────
function PrepareCard() {
  const items = [
    { icon: '📅', text: 'Date of Birth (DD/MM/YYYY)' },
    { icon: '⏰', text: 'Exact Time of Birth' },
    { icon: '📍', text: 'Place of Birth (City/Village)' },
    { icon: '❓', text: 'Your specific question or concern' },
    { icon: '📸', text: 'Optional: Photo for face reading' },
  ]
  return (
    <div style={{
      borderRadius: '20px',
      padding: 'clamp(20px, 3vw, 28px)',
      background: 'linear-gradient(135deg, rgba(255,215,0,0.04), rgba(139,0,139,0.05))',
      border: '1px solid rgba(255,215,0,0.14)',
      backdropFilter: 'blur(14px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '10px',
          background: 'rgba(255,215,0,0.1)',
          border: '1px solid rgba(255,215,0,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}>
          📋
        </div>
        <h4 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: '#FFD700',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}>
          What to Prepare
        </h4>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <span style={{
              width: 32, height: 32, borderRadius: '8px',
              background: 'rgba(255,215,0,0.06)',
              border: '1px solid rgba(255,215,0,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.9rem', flexShrink: 0,
            }}>
              {item.icon}
            </span>
            <p style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(0.75rem, 1.3vw, 0.85rem)',
              fontFamily: 'Raleway, sans-serif',
              lineHeight: 1.4,
            }}>
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── CONSULTATION MODES CARD ──────────────────────────────────────────────────
function ModesCard() {
  const modes = [
    { icon: '🏠', title: 'In-Person', desc: 'Visit office in Paschim Medinipur', color: '#FFD700' },
    { icon: '��', title: 'Phone Call', desc: 'Detailed consultation over call — Pan India', color: '#4ade80' },
    { icon: '💬', title: 'WhatsApp', desc: 'Send birth details and questions anytime', color: '#60a5fa' },
    { icon: '✉️', title: 'Email', desc: 'Written analysis sent to your inbox', color: '#c084fc' },
  ]
  return (
    <div style={{
      borderRadius: '20px',
      padding: 'clamp(20px, 3vw, 28px)',
      background: 'linear-gradient(135deg, rgba(255,215,0,0.03), rgba(139,0,139,0.04))',
      border: '1px solid rgba(255,255,255,0.07)',
      backdropFilter: 'blur(14px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '10px',
          background: 'rgba(255,215,0,0.1)',
          border: '1px solid rgba(255,215,0,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}>
          🌐
        </div>
        <h4 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: '#FFD700',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}>
          Consultation Modes
        </h4>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {modes.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03 }}
            style={{
              padding: '14px',
              borderRadius: '14px',
              background: `${m.color}08`,
              border: `1px solid ${m.color}22`,
              cursor: 'default',
            }}
          >
            <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{m.icon}</div>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: m.color,
              marginBottom: '3px',
            }}>
              {m.title}
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.42)',
              fontSize: '0.65rem',
              lineHeight: 1.4,
              fontFamily: 'Raleway, sans-serif',
            }}>
              {m.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── MAIN CONTACT SECTION ─────────────────────────────────────────────────────
export default function Contact() {
  const lang = useLang()
  const t = T[lang]?.contact || T.en.contact
  const [showForm, setShowForm] = useState(false)
  const CHANNEL_META = [
    { href: 'tel:9434999869', icon: '📞', accentColor: '#FFD700', borderColor: 'rgba(255,215,0,0.22)', bgColor: 'linear-gradient(135deg, rgba(255,215,0,0.07), rgba(255,215,0,0.02))', delay: 0.1 },
    { href: 'tel:9735805602', icon: '📱', accentColor: '#FFC107', borderColor: 'rgba(255,193,7,0.2)', bgColor: 'linear-gradient(135deg, rgba(255,193,7,0.06), rgba(255,193,7,0.02))', delay: 0.15 },
    { href: 'https://wa.me/919735805602?text=Namaste%20Pandit%20Ji', external: true, icon: '💬', accentColor: '#25D366', borderColor: 'rgba(37,211,102,0.25)', bgColor: 'linear-gradient(135deg, rgba(37,211,102,0.08), rgba(18,140,126,0.03))', delay: 0.2 },
    { href: 'mailto:subratamukherjeetheimmortal@gmail.com', icon: '✉️', accentColor: '#60a5fa', borderColor: 'rgba(96,165,250,0.22)', bgColor: 'linear-gradient(135deg, rgba(96,165,250,0.07), rgba(96,165,250,0.02))', delay: 0.25 },
    { icon: '📍', accentColor: '#c084fc', borderColor: 'rgba(192,132,252,0.2)', bgColor: 'linear-gradient(135deg, rgba(192,132,252,0.06), rgba(192,132,252,0.02))', delay: 0.3 },
  ]
  const channels = t.channels.map((ch, i) => ({ ...CHANNEL_META[i] || CHANNEL_META[0], label: ch.label, value: ch.value, subtext: ch.subtext }))

  return (
    <>
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 140px) 0',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0015 0%, #000 100%)',
      }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Bottom gold glow */}
        <div style={{
          position: 'absolute', bottom: '-100px', left: '50%',
          transform: 'translateX(-50%)',
          width: '800px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,215,0,0.07) 0%, transparent 65%)',
        }} />
        {/* Top line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.3), transparent)',
        }} />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 4 === 0 ? 2 : 1,
            height: i % 4 === 0 ? 2 : 1,
            borderRadius: '50%',
            background: '#FFD700',
            left: `${5 + (i * 4.7) % 90}%`,
            top: `${10 + (i * 7.3) % 80}%`,
            opacity: 0.15 + (i % 5) * 0.06,
            animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 3}s`,
          }} />
        ))}
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)', position: 'relative', zIndex: 1 }}>

        {/* ── Section Header ── */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 8vw, 96px)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 20px',
              borderRadius: '9999px',
              background: 'rgba(255,215,0,0.06)',
              border: '1px solid rgba(255,215,0,0.2)',
              marginBottom: '20px',
            }}>
              <span style={{ fontSize: '1rem' }}>🕉️</span>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.4em', color: 'rgba(255,215,0,0.7)', textTransform: 'uppercase' }}>
                {t.badge}
              </span>
            </div>

            <h2 className="section-title gold-text" style={{ marginBottom: '20px' }}>
              {t.title}
            </h2>

            <div className="divine-divider" style={{ maxWidth: '360px', margin: '0 auto 24px' }} />

            <p style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              maxWidth: '560px',
              margin: '0 auto 28px',
              lineHeight: 1.8,
              fontFamily: 'Raleway, sans-serif',
            }}>
              {t.subtitle1} <span style={{ color: '#F5C842', fontWeight: 600 }}>{t.subtitle3}</span>{t.subtitle4}
            </p>

            {/* ── PRIMARY CTA ── */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowForm(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 40px',
                borderRadius: 9999,
                border: 'none',
                background: 'linear-gradient(135deg, #F5C842, #C47F0A)',
                color: '#000',
                fontFamily: 'Cinzel, serif',
                fontWeight: 700,
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                cursor: 'pointer',
                boxShadow: '0 6px 32px rgba(245,200,66,0.45), 0 0 60px rgba(245,200,66,0.12)',
                letterSpacing: '0.05em',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🔮</span>
              {t.bookBtn}
              <span style={{ fontSize: '0.9rem' }}>→</span>
            </motion.button>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              color: 'rgba(240,232,208,0.32)',
              marginTop: 10,
            }}>
              {t.bookHint}
            </p>
          </div>
        </FadeIn>

        {/* ── Main Grid: Left channels | Right profile ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'start',
        }}>

          {/* LEFT — Contact channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.5vw, 14px)' }}>
            <FadeIn direction="right">
              <p style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.62rem',
                letterSpacing: '0.4em',
                color: 'rgba(255,215,0,0.4)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                📡 REACH OUT DIRECTLY
              </p>
            </FadeIn>

            {channels.map((ch, i) => (
              <ChannelCard key={i} {...ch} />
            ))}
          </div>

          {/* RIGHT — Profile card + info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px, 2.5vw, 24px)' }}>
            <FadeIn direction="left" delay={0.1}>
              <p style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.62rem',
                letterSpacing: '0.4em',
                color: 'rgba(255,215,0,0.4)',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                🔱 PANDIT JI'S PROFILE
              </p>
              <ProfileHeroCard />
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <ModesCard />
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <PrepareCard />
            </FadeIn>
          </div>
        </div>

        {/* ── Bottom CTA Banner ── */}
        <FadeIn delay={0.4}>
          <div style={{
            marginTop: 'clamp(56px, 8vw, 96px)',
            borderRadius: '28px',
            padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.07) 0%, rgba(139,0,139,0.1) 50%, rgba(255,215,0,0.05) 100%)',
            border: '1px solid rgba(255,215,0,0.22)',
            backdropFilter: 'blur(20px)',
          }}>
            {/* Glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px', height: '200px', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255,215,0,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: '3.5rem',
                marginBottom: '16px',
                filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
              }}>
                🔱
              </div>
              <h3 style={{
                fontFamily: 'Cinzel Decorative, serif',
                fontSize: 'clamp(1.3rem, 3vw, 2rem)',
                fontWeight: 700,
                marginBottom: '14px',
                background: 'linear-gradient(135deg, #FFD700, #FFF0A0, #B8860B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Your Destiny Awaits
              </h3>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                maxWidth: '560px',
                margin: '0 auto 32px',
                lineHeight: 1.8,
                fontFamily: 'Raleway, sans-serif',
              }}>
                {t.destinyDesc1} <span style={{ color: '#FFD700', fontWeight: 600 }}>{t.destinyDesc2}</span>{t.destinyDesc3}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
              }}>
                <motion.button
                  onClick={() => setShowForm(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '15px 36px',
                    borderRadius: '9999px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #F5C842, #C47F0A)',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#000',
                    cursor: 'pointer',
                    boxShadow: '0 6px 28px rgba(245,200,66,0.45)',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🔮</span>
                  Book Consultation
                </motion.button>

                <motion.a
                  href="tel:9434999869"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="call-btn"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '15px 36px',
                    borderRadius: '9999px',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#000',
                    textDecoration: 'none',
                    boxShadow: '0 6px 28px rgba(245,200,66,0.45)',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>📞</span>
                  Call: 9434999869
                </motion.a>

                <motion.a
                  href="mailto:subratamukherjeetheimmortal@gmail.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '15px 36px',
                    borderRadius: '9999px',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#60a5fa',
                    textDecoration: 'none',
                    border: '1px solid rgba(96,165,250,0.35)',
                    background: 'rgba(96,165,250,0.07)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>✉️</span>
                  Send Email
                </motion.a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* Consultation Form Modal */}
    <AnimatePresence>
      {showForm && <ConsultationForm onClose={() => setShowForm(false)} />}
    </AnimatePresence>
    </>
  )
}


