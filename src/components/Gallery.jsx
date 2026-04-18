import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

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

const gallery = [
  {
    img: '/pandit_primary.jpeg',
    title: 'Pandit Subrata Kumar Mukherjee',
    desc: 'The Trikaldarshi — Certified Vedic Astrologer & Spiritual Consultant with 30+ years of divine service',
    tag: 'Profile',
    accentColor: '#FFD700',
    borderColor: 'rgba(255,215,0,0.35)',
  },
  {
    img: '/ninassarts-ganesh-5998483.jpg',
    title: 'Lord Ganesha — Remover of Obstacles',
    desc: 'The divine deity who blesses all beginnings and removes life\'s obstacles. Shri Ganeshaya Namah.',
    tag: 'Divine',
    accentColor: '#FFA500',
    borderColor: 'rgba(255,165,0,0.35)',
  },
  {
    img: '/cert_registration_arp_2019.jpeg',
    title: 'ARP Registration Certificate',
    desc: 'Official certification from Astrological Research Project, Kolkata. Reg. No: ARP/PA/1479/19',
    tag: 'Education',
    accentColor: '#FFD700',
    borderColor: 'rgba(255,215,0,0.35)',
  },
  {
    img: '/cert_bengal_association.jpeg',
    title: 'Bachelor of Astrology',
    desc: 'Bengal Astrological Association — Session 2001–2002. Govt. of West Bengal Recognized.',
    tag: 'Education',
    accentColor: '#FF6600',
    borderColor: 'rgba(255,102,0,0.35)',
  },
  {
    img: '/cert_authenticity_bengali.jpeg',
    title: 'Authenticity Recognition',
    desc: 'Recognized as Honest & Skilled Astrologer by Bengal Astrological Association',
    tag: 'Education',
    accentColor: '#C084FC',
    borderColor: 'rgba(192,132,252,0.35)',
  },
  {
    img: '/membership_id_card.jpeg',
    title: 'Life Membership — A.R.P.',
    desc: 'Life Member & Golden Silver Donor Fellow — Astrological Research Project, Kolkata',
    tag: 'Membership',
    accentColor: '#FFA500',
    borderColor: 'rgba(255,165,0,0.35)',
  },
  {
    img: '/id_card.jpeg',
    title: 'Official Membership ID Card',
    desc: 'Photo Identity Card — Life Member, Astrological Research Project. Signed by Dr. Ramkrishna Sastri.',
    tag: 'Identity',
    accentColor: '#60C8FF',
    borderColor: 'rgba(96,200,255,0.35)',
  },
  {
    img: '/contact_card_subrata_mukherjee.jpeg',
    title: 'Professional Visiting Card',
    desc: 'Official visiting card — Astrological Consultant. B.A. Astro · M.A.R.P (Cal) · M.B.A',
    tag: 'Identity',
    accentColor: '#4ADE80',
    borderColor: 'rgba(74,222,128,0.35)',
  },
]

const tagStyleMap = {
  Profile:    { bg: 'rgba(255,215,0,0.15)',   border: 'rgba(255,215,0,0.35)',   color: '#FFD700' },
  Divine:     { bg: 'rgba(255,165,0,0.15)',   border: 'rgba(255,165,0,0.35)',   color: '#FFA500' },
  Education:  { bg: 'rgba(255,102,0,0.15)',   border: 'rgba(255,102,0,0.35)',   color: '#FF8C00' },
  Membership: { bg: 'rgba(255,165,0,0.15)',   border: 'rgba(255,165,0,0.35)',   color: '#FFA500' },
  Identity:   { bg: 'rgba(96,200,255,0.15)',  border: 'rgba(96,200,255,0.35)',  color: '#60C8FF' },
}

function GalleryCard({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false)
  const tagStyle = tagStyleMap[item.tag] || { bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.2)', color: '#fff' }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(item)}
      style={{
        borderRadius: '18px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
        border: `1px solid ${hovered ? item.accentColor + '55' : item.borderColor}`,
        backdropFilter: 'blur(14px)',
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(255,215,0,0.12)`
          : '0 4px 20px rgba(0,0,0,0.35)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: 'rgba(0,0,0,0.5)' }}>
        <img
          src={item.img}
          alt={item.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.6s ease',
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.82) 100%)',
        }} />

        {/* Tag badge */}
        <div className="cinzel" style={{
          position: 'absolute', top: '12px', right: '12px',
          padding: '4px 12px',
          borderRadius: '9999px',
          background: tagStyle.bg,
          border: `1px solid ${tagStyle.border}`,
          color: tagStyle.color,
          fontSize: '0.65rem',
          fontWeight: 700,
          backdropFilter: 'blur(8px)',
        }}>
          {item.tag}
        </div>

        {/* Title on image bottom */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
          <p className="cinzel" style={{
            color: 'rgba(255,215,0,0.9)',
            fontSize: '0.82rem',
            fontWeight: 700,
            lineHeight: 1.3,
          }}>
            {item.title}
          </p>
        </div>

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'rgba(255,215,0,0.15)',
            border: '2px solid rgba(255,215,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
          }}>
            🔍
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')

  const tags = ['All', 'Profile', 'Divine', 'Education', 'Membership', 'Identity']
  const filtered = filter === 'All' ? gallery : gallery.filter((g) => g.tag === filter)

  return (
    <section
      id="gallery"
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
          width: '800px', height: '800px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,215,0,0.03) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.25), transparent)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.25), transparent)',
        }} />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)' }}>
            <p className="cinzel" style={{
              fontSize: '0.65rem', letterSpacing: '0.5em',
              color: 'rgba(255,215,0,0.5)', marginBottom: '12px',
              textTransform: 'uppercase',
            }}>
              VISUAL PROOF
            </p>
            <h2 className="section-title gold-text" style={{ marginBottom: '16px' }}>
              Gallery &amp; Documents
            </h2>
            <div className="divine-divider" style={{ maxWidth: '320px', margin: '0 auto 20px' }} />
            <p style={{
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.75,
              fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)',
              fontFamily: 'Raleway, sans-serif',
            }}>
              Official documents, certifications, and photographs of Pandit Ji
            </p>
          </div>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: 'clamp(28px, 4vw, 48px)',
          }}>
            {tags.map((t) => {
              const active = filter === t
              return (
                <motion.button
                  key={t}
                  onClick={() => setFilter(t)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="cinzel"
                  style={{
                    padding: '8px 22px',
                    borderRadius: '9999px',
                    border: active ? '1px solid #FFD700' : '1px solid rgba(255,215,0,0.28)',
                    background: active
                      ? 'linear-gradient(135deg, #FFD700, #B8860B)'
                      : 'rgba(255,215,0,0.05)',
                    color: active ? '#000' : 'rgba(255,215,0,0.72)',
                    fontWeight: active ? 700 : 400,
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {t}
                </motion.button>
              )
            })}
          </div>
        </FadeIn>

        {/* Masonry-style grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 28px)',
          }}
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <GalleryCard key={item.title} item={item} index={i} onClick={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
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
              style={{ position: 'relative', maxWidth: '720px', width: '100%', margin: '0 16px' }}
              initial={{ scale: 0.82, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.82, opacity: 0 }}
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
                ✕ Close
              </button>

              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'rgba(10,0,21,0.97)',
                border: `1px solid ${selected.borderColor}`,
                backdropFilter: 'blur(24px)',
                boxShadow: `0 0 60px rgba(255,215,0,0.1), 0 40px 80px rgba(0,0,0,0.85)`,
              }}>
                <img
                  src={selected.img}
                  alt={selected.title}
                  style={{
                    width: '100%',
                    maxHeight: '65vh',
                    objectFit: 'contain',
                    background: 'rgba(0,0,0,0.8)',
                    display: 'block',
                  }}
                />
                <div style={{ padding: 'clamp(16px, 3vw, 28px)' }}>
                  {/* Tag */}
                  {(() => {
                    const ts = tagStyleMap[selected.tag] || { bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.2)', color: '#fff' }
                    return (
                      <span className="cinzel" style={{
                        display: 'inline-block',
                        padding: '4px 14px',
                        borderRadius: '9999px',
                        background: ts.bg,
                        border: `1px solid ${ts.border}`,
                        color: ts.color,
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        marginBottom: '12px',
                      }}>
                        {selected.tag}
                      </span>
                    )
                  })()}
                  <h3 className="cinzel" style={{ color: 'rgba(255,215,0,0.9)', fontWeight: 700, fontSize: '1.05rem', marginBottom: '8px' }}>
                    {selected.title}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '0.85rem', lineHeight: 1.65, fontFamily: 'Raleway, sans-serif' }}>
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
