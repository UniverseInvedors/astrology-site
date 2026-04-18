import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── LANGUAGE DATA ────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: 'bn', label: 'বাংলা', full: 'Bengali',  flag: '🏴', size: '1rem' },
  { code: 'en', label: 'EN',    full: 'English',  flag: '🇬🇧', size: '0.72rem' },
  { code: 'hi', label: 'हि',   full: 'Hindi',    flag: '🇮🇳', size: '0.72rem' },
]

// Simple global language state (lifted to window for cross-component access)
// In a real app use Context — this is lightweight and works without extra setup
if (typeof window !== 'undefined' && !window.__astroLang) {
  window.__astroLang = 'bn'
  window.__astroLangListeners = []
  window.__setAstroLang = (code) => {
    window.__astroLang = code
    window.__astroLangListeners.forEach(fn => fn(code))
    document.documentElement.lang = code
    // Apply language-specific font class to body
    document.body.classList.remove('lang-en', 'lang-hi', 'lang-bn')
    document.body.classList.add(`lang-${code}`)
  }
  // Set Bengali as default on load
  if (typeof document !== 'undefined') {
    document.documentElement.lang = 'bn'
    document.body?.classList.add('lang-bn')
  }
}

export function useLang() {
  const [lang, setLang] = useState(typeof window !== 'undefined' ? window.__astroLang : 'bn')
  useEffect(() => {
    const handler = (code) => setLang(code)
    window.__astroLangListeners.push(handler)
    return () => {
      window.__astroLangListeners = window.__astroLangListeners.filter(fn => fn !== handler)
    }
  }, [])
  return lang
}

const NAV_LABELS = {
  en: ['Home', 'About', 'Universe', 'Services', 'Credentials', "Do's & Don'ts", 'Gallery', 'Contact'],
  hi: ['होम', 'परिचय', 'ब्रह्मांड', 'सेवाएं', 'प्रमाण-पत्र', 'क्या करें', 'गैलरी', 'संपर्क'],
  bn: ['হোম', 'পরিচয়', 'মহাবিশ্ব', 'সেবা', 'সনদপত্র', 'করণীয়', 'গ্যালারি', 'যোগাযোগ'],
}

const CONSULT_LABEL = { en: 'Consult Now', hi: 'परामर्श करें', bn: 'পরামর্শ নিন' }

const NAV_HREFS = ['#home', '#about', '#universe', '#services', '#credentials', '#dos-donts', '#gallery', '#contact']

// ─── LANGUAGE SWITCHER ────────────────────────────────────────────────────────
function LanguageSwitcher({ currentLang }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0]

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      {/* Trigger button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 14px',
          borderRadius: 9999,
          border: '1px solid rgba(245,200,66,0.35)',
          background: open ? 'rgba(245,200,66,0.12)' : 'rgba(245,200,66,0.06)',
          color: '#F5C842',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.72rem',
          fontWeight: 700,
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          letterSpacing: '0.05em',
          transition: 'background 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '0.9rem' }}>{current.flag}</span>
        <span>{current.label}</span>
        <span style={{
          fontSize: '0.55rem',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease',
          opacity: 0.7,
        }}>
          &#9660;
        </span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              minWidth: 160,
              borderRadius: 14,
              background: 'rgba(4,0,14,0.97)',
              border: '1px solid rgba(245,200,66,0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,200,66,0.08)',
              overflow: 'hidden',
              zIndex: 100,
            }}
          >
            {LANGUAGES.map((l, i) => {
              const isActive = l.code === currentLang
              const isBn = l.code === 'bn'
              return (
                <motion.button
                  key={l.code}
                  whileHover={{ background: 'rgba(245,200,66,0.1)' }}
                  onClick={() => {
                    window.__setAstroLang(l.code)
                    setOpen(false)
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: isBn ? '14px 16px' : '11px 16px',
                    background: isActive ? 'rgba(245,200,66,0.08)' : isBn ? 'rgba(245,200,66,0.03)' : 'transparent',
                    border: 'none',
                    borderBottom: i < LANGUAGES.length - 1 ? '1px solid rgba(245,200,66,0.07)' : 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: isBn ? '1.2rem' : '1rem' }}>{l.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: isBn ? "'Hind Siliguri', sans-serif" : 'Cinzel, serif',
                      fontSize: isBn ? '1rem' : '0.75rem',
                      fontWeight: isActive ? 700 : isBn ? 600 : 400,
                      color: isActive ? '#F5C842' : isBn ? 'rgba(240,232,208,0.9)' : 'rgba(240,232,208,0.7)',
                      letterSpacing: isBn ? '0' : '0.05em',
                    }}>
                      {isBn ? 'বাংলা' : l.label}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: isBn ? '0.7rem' : '0.62rem',
                      color: isBn ? 'rgba(240,232,208,0.5)' : 'rgba(240,232,208,0.35)',
                      marginTop: 1,
                    }}>
                      {isBn ? 'প্রাথমিক ভাষা · Primary' : l.full}
                    </div>
                  </div>
                  {isActive && (
                    <span style={{ marginLeft: 'auto', color: '#F5C842', fontSize: '0.7rem' }}>&#10003;</span>
                  )}
                  {isBn && !isActive && (
                    <span style={{ fontSize: '0.6rem', color: 'rgba(245,200,66,0.4)', fontFamily: 'Cinzel, serif' }}>★</span>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── NAV LINK ─────────────────────────────────────────────────────────────────
function NavLink({ href, label, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        fontFamily: 'Cinzel, serif',
        color: hovered || active ? '#F5C842' : 'rgba(245,200,66,0.6)',
        fontSize: '0.73rem',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        transition: 'color 0.22s ease',
        paddingBottom: 4,
      }}
    >
      {label}
      <span style={{
        position: 'absolute', bottom: 0, left: 0,
        height: 1,
        width: hovered || active ? '100%' : '0%',
        background: 'linear-gradient(90deg, #F5C842, #FFE066)',
        transition: 'width 0.32s ease',
        display: 'block',
        borderRadius: 1,
      }} />
    </a>
  )
}

// ─── MAIN NAVBAR ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [activeLink, setActive]   = useState('#home')
  const lang = useLang()
  const labels = NAV_LABELS[lang] || NAV_LABELS.en

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <motion.nav
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(4,0,14,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(22px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(22px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,200,66,0.15)' : '1px solid transparent',
        padding: scrolled ? '10px 0' : '18px 0',
        transition: 'background 0.5s ease, border-color 0.5s ease, padding 0.4s ease',
      }}
    >
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 40px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>

        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
          <motion.span
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 0 10px rgba(245,200,66,0.7))', display: 'block' }}
          >
            &#128305;
          </motion.span>
          <div>
            <div style={{ fontFamily: 'Cinzel Decorative, serif', color: '#F5C842', fontWeight: 700, fontSize: 'clamp(0.82rem, 1.8vw, 1rem)', lineHeight: 1.2, letterSpacing: '0.02em' }}>
              Trikaldarshi
            </div>
            <div style={{ fontFamily: 'Cinzel, serif', color: 'rgba(245,200,66,0.45)', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              PANDIT SUBRATA KR. MUKHERJEE
            </div>
          </div>
        </a>

        {/* Desktop nav links */}
        <div className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: 'clamp(14px, 2vw, 28px)' }}>
          {labels.map((label, i) => (
            <NavLink
              key={NAV_HREFS[i]}
              href={NAV_HREFS[i]}
              label={label}
              active={activeLink === NAV_HREFS[i]}
              onClick={() => setActive(NAV_HREFS[i])}
            />
          ))}
        </div>

        {/* Right side: Language + CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

          {/* Language switcher — always visible */}
          <LanguageSwitcher currentLang={lang} />

          {/* CTA — desktop only */}
          <a
            href="tel:9434999869"
            id="cta-desktop"
            style={{
              display: 'none', alignItems: 'center', gap: 6,
              fontFamily: 'Cinzel, serif', color: '#000', fontWeight: 700,
              padding: '9px 20px', borderRadius: 9999,
              fontSize: '0.72rem', textDecoration: 'none', whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, #FFE066, #C47F0A)',
              boxShadow: '0 4px 16px rgba(245,200,66,0.35)',
            }}
          >
            &#128222; {CONSULT_LABEL[lang]}
          </a>

          {/* Hamburger — mobile only */}
          <motion.button
            id="hamburger"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: '1px solid rgba(245,200,66,0.3)',
              borderRadius: 8, color: '#F5C842',
              fontSize: '1.1rem', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(8px)',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(4,0,14,0.98)',
              backdropFilter: 'blur(24px)',
              borderTop: '1px solid rgba(245,200,66,0.12)',
            }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column',
              padding: 'clamp(16px, 3vw, 28px) clamp(16px, 4vw, 40px)',
              gap: 4,
            }}>
              {labels.map((label, i) => (
                <motion.a
                  key={NAV_HREFS[i]}
                  href={NAV_HREFS[i]}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'Cinzel, serif',
                    color: 'rgba(245,200,66,0.78)',
                    fontSize: '0.88rem',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(245,200,66,0.07)',
                    textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <span style={{ color: 'rgba(245,200,66,0.28)', fontSize: '0.55rem' }}>&#9658;</span>
                  {label}
                </motion.a>
              ))}

              {/* Mobile language switcher row */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12, marginBottom: 4 }}>
                {LANGUAGES.map(l => {
                  const isBn = l.code === 'bn'
                  return (
                  <button
                    key={l.code}
                    onClick={() => window.__setAstroLang(l.code)}
                    style={{
                      flex: isBn ? 1.6 : 1, padding: isBn ? '12px 4px' : '9px 4px',
                      borderRadius: 10,
                      border: `1px solid ${lang === l.code ? 'rgba(245,200,66,0.5)' : isBn ? 'rgba(245,200,66,0.25)' : 'rgba(245,200,66,0.15)'}`,
                      background: lang === l.code ? 'rgba(245,200,66,0.12)' : isBn ? 'rgba(245,200,66,0.04)' : 'transparent',
                      color: lang === l.code ? '#F5C842' : isBn ? 'rgba(245,200,66,0.7)' : 'rgba(245,200,66,0.45)',
                      fontFamily: isBn ? "'Hind Siliguri', sans-serif" : 'Cinzel, serif',
                      fontSize: isBn ? '0.9rem' : '0.72rem',
                      fontWeight: lang === l.code ? 700 : isBn ? 600 : 400,
                      cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                    }}
                  >
                    <span style={{ fontSize: isBn ? '1.2rem' : '1rem' }}>{l.flag}</span>
                    <span>{isBn ? 'বাংলা' : l.label}</span>
                    {isBn && <span style={{ fontSize: '0.55rem', opacity: 0.5 }}>প্রাথমিক</span>}
                  </button>
                  )
                })}
              </div>

              <a
                href="tel:9434999869"
                className="call-btn"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: 'Cinzel, serif', color: '#000', fontWeight: 700,
                  padding: '13px 28px', borderRadius: 9999, fontSize: '0.82rem',
                  textDecoration: 'none', marginTop: 8,
                }}
                onClick={() => setMenuOpen(false)}
              >
                &#128222; {CONSULT_LABEL[lang]}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          #cta-desktop  { display: flex !important; }
          #hamburger    { display: none !important; }
        }
      `}</style>
    </motion.nav>
  )
}
