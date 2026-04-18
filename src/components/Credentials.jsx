import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
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

// ─── CREDENTIAL CATEGORIES ────────────────────────────────────────────────────
// 📚 EDUCATION  |  🪪 IDENTITY  |  🏅 MEMBERSHIP
const credentials = [
  // ── EDUCATION ──────────────────────────────────────────────────────────────
  {
    img: '/cert_bengal_association.jpeg',
    category: 'Education',
    categoryIcon: '📚',
    title: 'Bachelor of Astrology',
    subtitle: 'Bengal Astrological Association',
    institution: 'Bengal Astrological Association — Govt. of West Bengal Recognized',
    year: 'Session 2001–2002',
    regNo: 'Govt. Recognized Body',
    desc: 'Formal degree in Astrology (Jyotish Shastra) from the Bengal Astrological Association, incorporated under the West Bengal Government Act. Passed final examination — confirms he is a formally trained astrologer, not self-proclaimed.',
    badge: '🎓 Degree Certificate',
    accentColor: '#FF6600',
    borderColor: 'rgba(255,102,0,0.38)',
    glowColor: 'rgba(255,102,0,0.12)',
  },
  {
    img: '/cert_registration_arp_2019.jpeg',
    category: 'Education',
    categoryIcon: '📚',
    title: 'ARP Registration Certificate',
    subtitle: 'Certified Practicing Astrologer',
    institution: 'Astrological Research Project (ARP), Kolkata — Est. 1975',
    year: '2019',
    regNo: 'ARP/PA/1479/19',
    desc: 'Official registration confirming competency as a Practicing Astrologer. Signed and sealed by the Astrological Research Project — one of India\'s oldest and most respected astrological institutions, established 1975.',
    badge: '🏅 Official Certification',
    accentColor: '#FFD700',
    borderColor: 'rgba(255,215,0,0.38)',
    glowColor: 'rgba(255,215,0,0.12)',
  },
  {
    img: '/cert_authenticity_bengali.jpeg',
    category: 'Education',
    categoryIcon: '📚',
    title: 'Authenticity Recognition',
    subtitle: 'Honest & Skilled Astrologer',
    institution: 'Bengal Astrological Association',
    year: 'Official Recognition',
    regNo: 'Verified Authority',
    desc: 'Formally acknowledged as an "Honest Skilled Astrologer" (Bengali: সৎ ও দক্ষ জ্যোতিষী) for exceptional knowledge and practical application of astrology — a rare recognition of both character and competence.',
    badge: '⭐ Excellence Award',
    accentColor: '#C084FC',
    borderColor: 'rgba(192,132,252,0.38)',
    glowColor: 'rgba(192,132,252,0.12)',
  },
  // ── MEMBERSHIP ─────────────────────────────────────────────────────────────
  {
    img: '/membership_id_card.jpeg',
    category: 'Membership',
    categoryIcon: '🏅',
    title: 'Life Membership — A.R.P.',
    subtitle: 'Golden Silver Donor Fellow',
    institution: 'Astrological Research Project, Kolkata',
    year: 'Life Member',
    regNo: 'M.A.R.P (Cal)',
    desc: 'Prestigious Life Membership of the Astrological Research Project with the title of Golden Silver Donor Fellow. Authorized to use M.A.R.P (Cal) after his name — a mark of long-term institutional recognition and contribution.',
    badge: '🥇 Life Member',
    accentColor: '#FFA500',
    borderColor: 'rgba(255,165,0,0.38)',
    glowColor: 'rgba(255,165,0,0.12)',
  },
  // ── IDENTITY ───────────────────────────────────────────────────────────────
  {
    img: '/id_card.jpeg',
    category: 'Identity',
    categoryIcon: '🪪',
    title: 'Official Membership ID Card',
    subtitle: 'Life Member — Astrological Research Project',
    institution: 'Astrological Research Project, Kolkata',
    year: 'Life Member',
    regNo: 'Signed by Dr. Ramkrishna Sastri, President',
    desc: 'Official photo identity card issued by the Astrological Research Project. Class: Life Member. Personally signed by Dr. Ramkrishna Sastri, President. Confirms identity and institutional affiliation.',
    badge: '🪪 Official ID Card',
    accentColor: '#60C8FF',
    borderColor: 'rgba(96,200,255,0.38)',
    glowColor: 'rgba(96,200,255,0.12)',
  },
  {
    img: '/contact_card_subrata_mukherjee.jpeg',
    category: 'Identity',
    categoryIcon: '🪪',
    title: 'Professional Visiting Card',
    subtitle: 'Astrological Consultant — Contact Details',
    institution: 'Pandit Subrata Kr. Mukherjee',
    year: 'Active Practice',
    regNo: 'B.A. Astro · M.A.R.P (Cal) · M.B.A',
    desc: 'Official visiting card listing professional credentials, contact details, and qualifications. Confirms active practice as an Astrological Consultant with full contact information for consultation booking.',
    badge: '📇 Visiting Card',
    accentColor: '#4ADE80',
    borderColor: 'rgba(74,222,128,0.38)',
    glowColor: 'rgba(74,222,128,0.12)',
  },
]

function CredentialCard({ c, index, onClick }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56, rotateY: -8 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, rotateY: 3, rotateX: 2 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        cursor: 'pointer',
        height: '100%',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(c)}
    >
      <div style={{
        borderRadius: '20px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: `1px solid ${hovered ? c.accentColor + '66' : c.borderColor}`,
        backdropFilter: 'blur(20px)',
        boxShadow: hovered
          ? `0 8px 40px rgba(0,0,0,0.5), 0 0 32px ${c.glowColor}`
          : '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
      }}>

        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '220px', background: 'rgba(0,0,0,0.5)', flexShrink: 0 }}>
          <img
            src={c.img}
            alt={c.title}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform 0.7s ease',
              filter: 'brightness(0.95) contrast(1.05)',
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.88) 100%)',
          }} />
          {/* Gold shimmer on hover */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${c.glowColor} 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }} />
          {/* View overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}>
            <div className="cinzel" style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              background: 'rgba(0,0,0,0.82)',
              border: `1px solid ${c.accentColor}`,
              color: c.accentColor,
              backdropFilter: 'blur(10px)',
              fontSize: '0.72rem',
              fontWeight: 700,
            }}>
              🔍 View Full Certificate
            </div>
          </div>
          {/* Badge */}
          <div className="cinzel" style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '4px 12px',
            borderRadius: '9999px',
            background: 'rgba(0,0,0,0.78)',
            border: `1px solid ${c.borderColor}`,
            color: c.accentColor,
            backdropFilter: 'blur(10px)',
            fontSize: '0.68rem',
            fontWeight: 700,
          }}>
            {c.badge}
          </div>
          {/* Category tag */}
          <div className="cinzel" style={{
            position: 'absolute', top: '12px', right: '12px',
            padding: '4px 10px',
            borderRadius: '8px',
            background: 'rgba(0,0,0,0.72)',
            color: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            fontSize: '0.65rem',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span>{c.categoryIcon}</span> {c.category}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: 'clamp(16px, 2.5vw, 24px)', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <h3 className="cinzel" style={{ color: c.accentColor, fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.3 }}>
            {c.title}
          </h3>
          <p className="cinzel" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>{c.subtitle}</p>
          <p className="cinzel" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem' }}>{c.institution}</p>
          <div className="cinzel" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px',
            borderRadius: '9999px',
            background: c.glowColor,
            border: `1px solid ${c.borderColor}`,
            color: c.accentColor,
            fontSize: '0.68rem',
            alignSelf: 'flex-start',
          }}>
            ✓ {c.regNo}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', lineHeight: 1.65, fontFamily: 'Raleway, sans-serif' }}>
            {c.desc}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Credentials() {
  const lang = useLang()
  const t = T[lang]?.credentials || T.en.credentials
  const [selected, setSelected] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const CAT_KEYS = ['All', 'Education', 'Membership', 'Identity']
  const categories = t.categories || CAT_KEYS
  // filtered always uses English keys internally
  const filtered = activeCategory === 'All' ? credentials : credentials.filter(c => c.category === activeCategory)
  const categoryMeta = {
    All:        { icon: '🔱', color: '#FFD700' },
    Education:  { icon: '📚', color: '#FF6600' },
    Membership: { icon: '🏅', color: '#FFA500' },
    Identity:   { icon: '🪪', color: '#60C8FF' },
  }

  return (
    <section
      id="credentials"
      style={{
        position: 'relative',
        padding: 'clamp(80px, 10vw, 140px) clamp(16px, 5vw, 48px)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #050520 0%, #0a0015 50%, #050520 100%)',
      }}
    >
      {/* BG decoration */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '900px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.28), transparent)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.28), transparent)',
        }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 96px)' }}>
            <p className="cinzel" style={{ fontSize: '0.65rem', letterSpacing: '0.5em', color: 'rgba(255,215,0,0.5)', marginBottom: '12px', textTransform: 'uppercase' }}>
              {t.sectionLabel}
            </p>
            <h2 className="section-title gold-text" style={{ marginBottom: '16px' }}>
              {t.title}
            </h2>
            <div className="divine-divider" style={{ maxWidth: '320px', margin: '0 auto 20px' }} />
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75, fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)', fontFamily: 'Raleway, sans-serif' }}>
              {t.subtitle1} <span style={{ color: '#FFD700', fontWeight: 600 }}>{t.subtitle2}</span>{' '}{t.subtitle3}
            </p>
          </div>
        </FadeIn>

        {/* Category Tabs */}
        <FadeIn delay={0.1}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            {CAT_KEYS.map((key, i) => {
              const meta = categoryMeta[key]
              const label = categories[i] || key
              const active = activeCategory === key
              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 24px',
                    borderRadius: '9999px',
                    border: `1px solid ${active ? meta.color : meta.color + '40'}`,
                    background: active ? `${meta.color}20` : 'rgba(0,0,0,0.4)',
                    color: active ? meta.color : 'rgba(255,255,255,0.5)',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.75rem',
                    fontWeight: active ? 700 : 400,
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    boxShadow: active ? `0 0 20px ${meta.color}30` : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <span>{meta.icon}</span> {label}
                </motion.button>
              )
            })}
          </div>
        </FadeIn>

        {/* Grid */}
        <motion.div layout style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(20px, 3vw, 32px)',
        }}>
          <AnimatePresence>
          {filtered.map((c, i) => (
            <CredentialCard key={c.title} c={c} index={i} onClick={setSelected} />
          ))}
          </AnimatePresence>
        </motion.div>

        {/* Trust banner */}
        <FadeIn delay={0.3}>
          <div style={{
            marginTop: 'clamp(48px, 7vw, 96px)',
            borderRadius: '28px',
            padding: 'clamp(28px, 4vw, 48px)',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255,215,0,0.05), rgba(139,0,139,0.07))',
            border: '1px solid rgba(255,215,0,0.2)',
            backdropFilter: 'blur(20px)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🛡️</div>
            <h3 className="cinzel-deco gold-text" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 700, marginBottom: '16px' }}>
              {t.trustTitle}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.75, fontSize: 'clamp(0.82rem, 1.4vw, 0.92rem)', fontFamily: 'Raleway, sans-serif' }}>
              {t.trustDesc1}{' '}
              <span style={{ color: '#FFD700', fontWeight: 600 }}>{t.trustDesc2}</span>{' '}
              {t.trustDesc3}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {[
                'B.A. Astrology', 'M.A.R.P (Cal)', 'M.B.A',
                'Life Member ARP', 'Reg. No: ARP/PA/1479/19', 'Golden Silver Donor Fellow',
              ].map((q) => (
                <span
                  key={q}
                  className="cinzel"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: 'rgba(255,215,0,0.07)',
                    border: '1px solid rgba(255,215,0,0.28)',
                    color: '#FFD700',
                    fontSize: '0.7rem',
                  }}
                >
                  ✓ {q}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              style={{ position: 'relative', width: '100%', maxWidth: '820px', margin: '0 16px' }}
              initial={{ scale: 0.85, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                className="cinzel"
                style={{
                  position: 'absolute', top: '-44px', right: 0,
                  background: 'none', border: 'none',
                  color: 'rgba(255,215,0,0.75)',
                  fontSize: '0.82rem',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  cursor: 'pointer',
                }}
                onClick={() => setSelected(null)}
              >
                ✕ {t.close || 'Close'}
              </button>

              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'rgba(10,0,21,0.97)',
                border: `1px solid ${selected.borderColor}`,
                backdropFilter: 'blur(24px)',
                boxShadow: `0 0 64px ${selected.glowColor}, 0 40px 80px rgba(0,0,0,0.85)`,
              }}>
                {/* Full cert image */}
                <div style={{
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  minHeight: '360px', maxHeight: '65vh',
                }}>
                  <img
                    src={selected.img}
                    alt={selected.title}
                    style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: 'clamp(20px, 3vw, 36px)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <h3 className="cinzel" style={{ color: selected.accentColor, fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>
                        {selected.title}
                      </h3>
                      <p className="cinzel" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>{selected.subtitle}</p>
                    </div>
                    <span className="cinzel" style={{
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      background: selected.glowColor,
                      border: `1px solid ${selected.borderColor}`,
                      color: selected.accentColor,
                      fontSize: '0.72rem',
                      flexShrink: 0,
                    }}>
                      {selected.badge}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '12px',
                    marginBottom: '16px',
                  }}>
                    {[
                      { label: 'Institution', value: selected.institution },
                      { label: 'Period', value: selected.year },
                      { label: 'Reference', value: selected.regNo },
                    ].map((d) => (
                      <div key={d.label} style={{
                        borderRadius: '12px',
                        padding: '12px 14px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}>
                        <p className="cinzel" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', marginBottom: '4px' }}>{d.label}</p>
                        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.78rem', fontWeight: 600, fontFamily: 'Raleway, sans-serif' }}>{d.value}</p>
                      </div>
                    ))}
                  </div>

                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: 'Raleway, sans-serif' }}>
                    {selected.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
