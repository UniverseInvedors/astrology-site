import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../hooks/useLang'
import { T } from '../data/translations'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

const dos = [
  { icon: '🙏', text: 'Consult an astrologer before making major life decisions — career change, marriage, business launch.' },
  { icon: '📿', text: 'Wear recommended gemstones on the correct finger and day for maximum planetary benefit.' },
  { icon: '🕯️', text: 'Perform suggested pujas and rituals on auspicious days (muhurtas) for best results.' },
  { icon: '🌅', text: 'Wake up early, offer water to the Sun (Surya Arghya) to strengthen your solar energy.' },
  { icon: '📖', text: 'Recite mantras given by Pandit Ji daily with full faith and concentration.' },
  { icon: '🤝', text: 'Be honest and transparent during consultation — accurate birth details give accurate predictions.' },
  { icon: '💧', text: 'Keep yourself spiritually clean — regular bathing, clean clothes, and positive thoughts.' },
  { icon: '🌿', text: 'Follow dietary recommendations during remedy periods for enhanced effectiveness.' },
  { icon: '🧘', text: 'Practice meditation and yoga to strengthen your mental and spiritual receptivity.' },
  { icon: '📅', text: 'Follow auspicious timings (muhurtas) for important events like travel, signing contracts, etc.' },
]

const donts = [
  { icon: '🚫', text: 'Never ignore planetary warnings — if Pandit Ji advises caution in a period, take it seriously.' },
  { icon: '⛔', text: 'Do not start new ventures during Rahu Kaal or inauspicious planetary transits without guidance.' },
  { icon: '🚷', text: 'Avoid consulting multiple astrologers simultaneously — conflicting advice creates confusion and doubt.' },
  { icon: '💔', text: 'Do not make impulsive decisions in love or marriage without checking kundli compatibility.' },
  { icon: '🌑', text: 'Avoid wearing black on Thursdays or yellow on Saturdays without astrological guidance.' },
  { icon: '🍖', text: 'Do not consume non-vegetarian food on days of specific planetary remedies.' },
  { icon: '😤', text: 'Never disrespect elders or Brahmins — this weakens Jupiter (Guru) in your chart.' },
  { icon: '🌊', text: 'Do not cut nails or hair on Tuesdays and Saturdays — it invites negative planetary energy.' },
  { icon: '💸', text: 'Avoid lending money on Tuesdays — it can create financial losses per Vedic astrology.' },
  { icon: '🌙', text: 'Do not sleep with your head pointing North — it disturbs your magnetic energy field.' },
]

function ItemRow({ item, index, side }) {
  const isLeft = side === 'left'
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ backgroundColor: isLeft ? 'rgba(74,222,128,0.06)' : 'rgba(248,113,113,0.06)' }}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '10px 12px',
        borderRadius: '12px',
        transition: 'background-color 0.25s ease',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1.15rem', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
      <p style={{
        color: 'rgba(255,255,255,0.78)',
        fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)',
        lineHeight: 1.65,
        fontFamily: 'Raleway, sans-serif',
      }}>
        {item.text}
      </p>
    </motion.div>
  )
}

export default function DosDonts() {
  const lang = useLang()
  const t = T[lang]?.dosDonts || T.en.dosDonts
  const DOS_ICONS = ['🙏','📿','🕯️','🌅','📖','🤝','💧','🌿','🧘','📅']
  const DONTS_ICONS = ['🚫','⛔','🚷','💔','🌑','🍖','😤','🌊','💸','🌙']
  return (
    <section
      id="dos-donts"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 140px) clamp(16px, 5vw, 48px)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050520 0%, #0a0015 100%)',
      }}
    >
      {/* BG glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '10%',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,222,128,0.04), transparent)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(248,113,113,0.04), transparent)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.25), transparent)',
        }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 88px)' }}>
            <p className="cinzel" style={{ fontSize: '0.65rem', letterSpacing: '0.5em', color: 'rgba(255,215,0,0.5)', marginBottom: '12px', textTransform: 'uppercase' }}>
              {t.sectionLabel}
            </p>
            <h2 className="section-title gold-text" style={{ marginBottom: '16px' }}>
              {t.title}
            </h2>
            <div className="divine-divider" style={{ maxWidth: '320px', margin: '0 auto 20px' }} />
            <p style={{ color: 'rgba(255,255,255,0.58)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.75, fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)', fontFamily: 'Raleway, sans-serif' }}>
              {t.subtitle1} <span style={{ color: '#f87171' }}>{t.subtitle2}</span>{t.subtitle3}
            </p>
          </div>
        </FadeIn>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
        }}>

          {/* DO's card */}
          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ translateY: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: '28px',
                padding: 'clamp(24px, 3.5vw, 40px)',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(0,128,0,0.09), rgba(74,222,128,0.04))',
                border: '1px solid rgba(74,222,128,0.28)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'clamp(20px, 3vw, 32px)' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(74,222,128,0.15)',
                  border: '1px solid rgba(74,222,128,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', flexShrink: 0,
                }}>
                  ✅
                </div>
                <div>
                  <h3 className="cinzel" style={{ color: '#4ade80', fontWeight: 700, fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    {t.dosTitle}
                  </h3>
                  <p className="cinzel" style={{ color: 'rgba(74,222,128,0.5)', fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                    {t.dosSubtitle}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, rgba(74,222,128,0.4), transparent)',
                marginBottom: 'clamp(16px, 2.5vw, 24px)',
              }} />

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {t.dos.map((text, i) => (
                  <ItemRow key={i} item={{ icon: DOS_ICONS[i] || '✅', text }} index={i} side="left" />
                ))}
              </div>
            </motion.div>
          </FadeIn>

          {/* DON'Ts card */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ translateY: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                borderRadius: '28px',
                padding: 'clamp(24px, 3.5vw, 40px)',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(139,0,0,0.12), rgba(248,113,113,0.04))',
                border: '1px solid rgba(248,113,113,0.28)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
              }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: 'clamp(20px, 3vw, 32px)' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(248,113,113,0.15)',
                  border: '1px solid rgba(248,113,113,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', flexShrink: 0,
                }}>
                  ❌
                </div>
                <div>
                  <h3 className="cinzel" style={{ color: '#f87171', fontWeight: 700, fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    {t.dontsTitle}
                  </h3>
                  <p className="cinzel" style={{ color: 'rgba(248,113,113,0.5)', fontSize: '0.62rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                    {t.dontsSubtitle}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, rgba(248,113,113,0.4), transparent)',
                marginBottom: 'clamp(16px, 2.5vw, 24px)',
              }} />

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {t.donts.map((text, i) => (
                  <ItemRow key={i} item={{ icon: DONTS_ICONS[i] || '🚫', text }} index={i} side="right" />
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>

        {/* Bottom note card */}
        <FadeIn delay={0.3}>
          <div style={{
            marginTop: 'clamp(32px, 5vw, 56px)',
            borderRadius: '20px',
            padding: 'clamp(20px, 3vw, 32px)',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.05), rgba(139,0,139,0.06))',
            border: '1px solid rgba(255,215,0,0.2)',
            backdropFilter: 'blur(16px)',
            maxWidth: '760px',
            margin: 'clamp(32px, 5vw, 56px) auto 0',
          }}>
            <p className="cinzel" style={{ color: 'rgba(255,215,0,0.82)', fontSize: 'clamp(0.78rem, 1.3vw, 0.88rem)', lineHeight: 1.75 }}>
              ⚠️ <span style={{ fontWeight: 700 }}>{t.notePrefix}</span>{t.noteText}
            </p>
            <a href="https://wa.me/919735805602?text=Namaste%20Pandit%20Ji%2C%20I%20need%20personalized%20guidance." target="_blank" rel="noopener noreferrer" className="whatsapp-btn cinzel"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: '#fff', fontWeight: 700, padding: '12px 28px', borderRadius: '9999px', fontSize: '0.82rem', textDecoration: 'none' }}>
              💬 {t.noteBtn}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

