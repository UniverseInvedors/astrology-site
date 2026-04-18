import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── HUMAN BODY SVG DIAGRAM ───────────────────────────────────────────────────
// Zones: head, chest, body, blood, spine, mind, energy
const ZONE_POSITIONS = {
  head:   { cx: 100, cy: 52,  r: 22 },
  chest:  { cx: 100, cy: 115, r: 20 },
  body:   { cx: 100, cy: 165, r: 18 },
  blood:  { cx: 100, cy: 140, r: 16 },
  spine:  { cx: 100, cy: 145, r: 14 },
  mind:   { cx: 100, cy: 52,  r: 22 },
  energy: { cx: 100, cy: 100, r: 30 },
}

function BodyDiagram({ effects, planetColor }) {
  const [activeZone, setActiveZone] = useState(null)
  const activeEffect = effects.find(e => e.zone === activeZone)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg
        viewBox="0 0 200 280"
        style={{ width: '100%', maxWidth: 180, height: 'auto' }}
        aria-label="Human body diagram showing planetary influence zones"
      >
        {/* Body silhouette */}
        <defs>
          <radialGradient id={`bodyGrad-${planetColor.replace('#','')}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={planetColor} stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Body fill */}
        <rect x="0" y="0" width="200" height="280" fill={`url(#bodyGrad-${planetColor.replace('#','')})`} rx="8"/>

        {/* HEAD */}
        <ellipse cx="100" cy="52" rx="26" ry="30"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>

        {/* NECK */}
        <rect x="91" y="80" width="18" height="16" rx="4"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* SHOULDERS */}
        <path d="M 55 96 Q 100 88 145 96 L 148 130 Q 100 122 52 130 Z"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>

        {/* LEFT ARM */}
        <path d="M 55 96 L 38 100 L 30 148 L 38 150 L 48 108 L 58 106 Z"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* RIGHT ARM */}
        <path d="M 145 96 L 162 100 L 170 148 L 162 150 L 152 108 L 142 106 Z"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* TORSO */}
        <path d="M 58 106 L 52 130 L 55 190 L 145 190 L 148 130 L 142 106 Z"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>

        {/* SPINE LINE */}
        <line x1="100" y1="96" x2="100" y2="190"
          stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3,3"/>

        {/* LEFT LEG */}
        <path d="M 55 190 L 52 250 L 68 252 L 72 200 L 100 198 L 100 190 Z"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* RIGHT LEG */}
        <path d="M 145 190 L 148 250 L 132 252 L 128 200 L 100 198 L 100 190 Z"
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* ACTIVE ZONE HIGHLIGHT ZONES */}
        {effects.map((effect, i) => {
          const pos = ZONE_POSITIONS[effect.zone] || ZONE_POSITIONS.body
          const isActive = activeZone === effect.zone
          return (
            <g key={i}>
              <circle
                cx={pos.cx + (i % 2 === 0 ? -8 : 8)}
                cy={pos.cy + Math.floor(i / 2) * 12}
                r={isActive ? pos.r * 0.55 : pos.r * 0.4}
                fill={isActive ? `${planetColor}55` : `${planetColor}22`}
                stroke={isActive ? planetColor : `${planetColor}60`}
                strokeWidth={isActive ? 1.5 : 1}
                filter={isActive ? 'url(#glow)' : undefined}
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => setActiveZone(isActive ? null : effect.zone)}
              />
              {isActive && (
                <text
                  x={pos.cx + (i % 2 === 0 ? -8 : 8)}
                  y={pos.cy + Math.floor(i / 2) * 12 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fill={planetColor}
                  style={{ pointerEvents: 'none', fontFamily: 'Cinzel, serif' }}
                >
                  {effect.icon}
                </text>
              )}
            </g>
          )
        })}

        {/* Planet aura overlay */}
        <ellipse cx="100" cy="140" rx="90" ry="130"
          fill="none"
          stroke={planetColor}
          strokeWidth="0.5"
          strokeOpacity="0.15"
          strokeDasharray="4,6"
        />
      </svg>

      {/* Active zone tooltip */}
      <AnimatePresence>
        {activeEffect && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            style={{
              background: `${planetColor}15`,
              border: `1px solid ${planetColor}40`,
              borderRadius: 10,
              padding: '8px 12px',
              textAlign: 'center',
              maxWidth: 200,
            }}
          >
            <p style={{ color: planetColor, fontSize: '0.7rem', fontFamily: 'Cinzel, serif', marginBottom: 2 }}>
              {activeEffect.icon} {activeEffect.label}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', lineHeight: 1.4 }}>
              {activeEffect.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
        TAP ZONES TO EXPLORE
      </p>
    </div>
  )
}

// ─── EFFECT BADGE ─────────────────────────────────────────────────────────────
function EffectBadge({ effect, planetColor, type }) {
  const typeColors = {
    organ:  { bg: 'rgba(255,100,100,0.08)', border: 'rgba(255,100,100,0.25)', text: '#ff8080' },
    mental: { bg: 'rgba(100,150,255,0.08)', border: 'rgba(100,150,255,0.25)', text: '#80aaff' },
    energy: { bg: 'rgba(255,215,0,0.08)',   border: 'rgba(255,215,0,0.25)',   text: '#FFD700' },
  }
  const c = typeColors[type] || typeColors.organ

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 12px',
      borderRadius: 10,
      background: c.bg,
      border: `1px solid ${c.border}`,
    }}>
      <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>{effect.icon}</span>
      <div>
        <p style={{ color: c.text, fontSize: '0.72rem', fontFamily: 'Cinzel, serif', fontWeight: 700, marginBottom: 2 }}>
          {effect.label}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', lineHeight: 1.4 }}>
          {effect.detail}
        </p>
      </div>
    </div>
  )
}

// ─── TAB BUTTON ───────────────────────────────────────────────────────────────
function TabBtn({ active, onClick, children, color }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '8px 4px',
        borderRadius: 8,
        border: `1px solid ${active ? color : 'rgba(255,255,255,0.08)'}`,
        background: active ? `${color}18` : 'transparent',
        color: active ? color : 'rgba(255,255,255,0.4)',
        fontSize: '0.65rem',
        fontFamily: 'Cinzel, serif',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  )
}

// ─── MAIN PANEL ───────────────────────────────────────────────────────────────
export default function PlanetPanel({ planet, onClose }) {
  const [tab, setTab] = useState('body')

  if (!planet) return null

  const organEffects  = planet.bodyEffects.filter(e => e.type === 'organ')
  const mentalEffects = planet.bodyEffects.filter(e => e.type === 'mental')
  const energyEffects = planet.bodyEffects.filter(e => e.type === 'energy')

  return (
    <motion.div
      key={planet.id}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      style={{
        position: 'fixed',
        top: 0, right: 0,
        height: '100vh',
        width: 'min(400px, 94vw)',
        background: 'linear-gradient(160deg, rgba(8,0,18,0.98) 0%, rgba(4,4,28,0.98) 100%)',
        borderLeft: `1px solid ${planet.color}28`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── STICKY HEADER ── */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px',
        background: `linear-gradient(135deg, ${planet.color}12, rgba(8,0,18,0.98))`,
        borderBottom: `1px solid ${planet.color}22`,
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Planet orb */}
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 35%, ${planet.color}, ${planet.emissive || planet.color})`,
            boxShadow: `0 0 20px ${planet.color}50, 0 0 40px ${planet.color}20`,
            flexShrink: 0,
            animation: 'float 4s ease-in-out infinite',
          }} />
          <div>
            <h3 style={{ color: planet.color, fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
              {planet.symbol} {planet.name}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
              {planet.sanskritName}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >
          ✕
        </button>
      </div>

      {/* ── MEANING STRIP ── */}
      <div style={{
        flexShrink: 0,
        padding: '10px 20px',
        background: `${planet.color}0A`,
        borderBottom: `1px solid ${planet.color}18`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: '0.65rem', fontFamily: 'Cinzel, serif', color: `${planet.color}80`, letterSpacing: '0.15em' }}>
          MEANING:
        </span>
        <span style={{ fontSize: '0.75rem', fontFamily: 'Cinzel, serif', color: planet.color, fontWeight: 600 }}>
          {planet.meaning}
        </span>
      </div>

      {/* ── TABS ── */}
      <div style={{
        flexShrink: 0,
        display: 'flex', gap: 6,
        padding: '12px 20px',
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
      }}>
        <TabBtn active={tab === 'body'}   onClick={() => setTab('body')}   color={planet.color}>🫀 Body Effects</TabBtn>
        <TabBtn active={tab === 'mind'}   onClick={() => setTab('mind')}   color={planet.color}>🧠 Mind & Soul</TabBtn>
        <TabBtn active={tab === 'info'}   onClick={() => setTab('info')}   color={planet.color}>📜 Details</TabBtn>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px 24px',
        scrollbarWidth: 'thin',
        scrollbarColor: `${planet.color}30 transparent`,
      }}>

        {/* ════ TAB: BODY EFFECTS ════ */}
        {tab === 'body' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Body diagram + organ effects side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'start' }}>
              <BodyDiagram effects={planet.bodyEffects} planetColor={planet.color} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.15em', marginBottom: 4 }}>
                  PHYSICAL ORGANS
                </p>
                {organEffects.map((e, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: 'rgba(255,100,100,0.06)',
                    border: '1px solid rgba(255,100,100,0.18)',
                  }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{e.icon}</span>
                    <div>
                      <p style={{ color: '#ff9090', fontSize: '0.65rem', fontFamily: 'Cinzel, serif', fontWeight: 700 }}>{e.label}</p>
                      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.58rem', lineHeight: 1.3 }}>{e.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${planet.color}30, transparent)` }} />

            {/* Full effect list */}
            <div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.15em', marginBottom: 10 }}>
                ALL BODY EFFECTS
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {planet.bodyEffects.map((e, i) => (
                  <EffectBadge key={i} effect={e} planetColor={planet.color} type={e.type} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ TAB: MIND & SOUL ════ */}
        {tab === 'mind' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Mental effects */}
            <div>
              <p style={{ color: 'rgba(100,150,255,0.7)', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.15em', marginBottom: 10 }}>
                🧠 MENTAL & PSYCHOLOGICAL EFFECTS
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {mentalEffects.map((e, i) => (
                  <EffectBadge key={i} effect={e} planetColor={planet.color} type="mental" />
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${planet.color}30, transparent)` }} />

            {/* Energy effects */}
            <div>
              <p style={{ color: 'rgba(255,215,0,0.7)', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.15em', marginBottom: 10 }}>
                ⚡ ENERGY & KARMIC EFFECTS
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {energyEffects.map((e, i) => (
                  <EffectBadge key={i} effect={e} planetColor={planet.color} type="energy" />
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${planet.color}30, transparent)` }} />

            {/* Positive / Negative */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <p style={{ color: '#4ade80', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em', marginBottom: 8 }}>✅ WHEN STRONG</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {planet.positiveEffects.map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <span style={{ color: '#4ade80', fontSize: '0.6rem', flexShrink: 0, marginTop: 2 }}>▸</span>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', lineHeight: 1.4 }}>{e}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ color: '#f87171', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em', marginBottom: 8 }}>⚠️ WHEN WEAK</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {planet.negativeEffects.map((e, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                      <span style={{ color: '#f87171', fontSize: '0.6rem', flexShrink: 0, marginTop: 2 }}>▸</span>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', lineHeight: 1.4 }}>{e}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ TAB: DETAILS ════ */}
        {tab === 'info' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Description */}
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', lineHeight: 1.7 }}>
              {planet.description}
            </p>

            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${planet.color}30, transparent)` }} />

            {/* Quick facts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Element', value: planet.element },
                { label: 'Day', value: planet.day },
                { label: 'Gemstone', value: planet.gemstone },
                { label: 'Metal', value: planet.metal },
              ].map(f => (
                <div key={f.label} style={{
                  padding: '10px 12px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', fontFamily: 'Cinzel, serif', marginBottom: 3 }}>{f.label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', fontWeight: 600 }}>{f.value}</p>
                </div>
              ))}
            </div>

            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${planet.color}30, transparent)` }} />

            {/* Remedy */}
            <div style={{
              padding: '14px 16px', borderRadius: 12,
              background: `${planet.color}08`,
              border: `1px solid ${planet.color}28`,
            }}>
              <p style={{ color: planet.color, fontSize: '0.65rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.15em', marginBottom: 8 }}>
                🙏 VEDIC REMEDY
              </p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', lineHeight: 1.6 }}>
                {planet.remedy}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── STICKY FOOTER CTA ── */}
      <div style={{
        flexShrink: 0,
        padding: '14px 20px',
        borderTop: `1px solid ${planet.color}18`,
        background: 'rgba(8,0,18,0.95)',
      }}>
        <a
          href={`https://wa.me/919735805602?text=Namaste%20Pandit%20Ji%2C%20I%20want%20to%20know%20about%20${planet.name}%20in%20my%20birth%20chart.`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', padding: '12px 16px',
            borderRadius: 12,
            background: `linear-gradient(135deg, ${planet.color}, ${planet.emissive || planet.color})`,
            color: '#000',
            fontFamily: 'Cinzel, serif',
            fontWeight: 700,
            fontSize: '0.78rem',
            textDecoration: 'none',
            boxShadow: `0 4px 20px ${planet.color}40`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 6px 28px ${planet.color}60` }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = `0 4px 20px ${planet.color}40` }}
        >
          💬 Consult Pandit Ji About {planet.name}
        </a>
      </div>
    </motion.div>
  )
}

