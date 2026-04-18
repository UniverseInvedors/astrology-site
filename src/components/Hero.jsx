import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useLang } from '../hooks/useLang'
import { T } from '../data/translations'

function HeroStars() {
  const count = 3000
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  const matRef = useRef()
  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.opacity = 0.55 + Math.sin(clock.elapsedTime * 0.4) * 0.1
  })
  return (
    <points geometry={geo}>
      <pointsMaterial ref={matRef} size={0.25} color="#ffffff" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function GoldParticles() {
  const count = 120
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.04
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1
    }
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.12} color="#F5C842" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <HeroStars />
        <GoldParticles />
        <Stars radius={100} depth={50} count={2000} factor={3} saturation={0.3} fade speed={0.3} />
      </Suspense>
    </Canvas>
  )
}

function LightRays() {
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', zIndex: 2,
    }}>
      <div style={{
        width: 700, height: 700, borderRadius: '50%',
        background: `conic-gradient(
          from 0deg,
          transparent 0deg,   rgba(245,200,66,0.04) 8deg,  transparent 16deg,
          transparent 36deg,  rgba(232,160,32,0.03) 44deg, transparent 52deg,
          transparent 72deg,  rgba(245,200,66,0.04) 80deg, transparent 88deg,
          transparent 108deg, rgba(232,160,32,0.03) 116deg,transparent 124deg,
          transparent 144deg, rgba(245,200,66,0.04) 152deg,transparent 160deg,
          transparent 180deg, rgba(232,160,32,0.03) 188deg,transparent 196deg,
          transparent 216deg, rgba(245,200,66,0.04) 224deg,transparent 232deg,
          transparent 252deg, rgba(232,160,32,0.03) 260deg,transparent 268deg,
          transparent 288deg, rgba(245,200,66,0.04) 296deg,transparent 304deg,
          transparent 324deg, rgba(232,160,32,0.03) 332deg,transparent 340deg
        )`,
        animation: 'rotate-slow 35s linear infinite',
      }} />
    </div>
  )
}

function GaneshDisplay() {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {/* Outer aura */}
      <div style={{
        position: 'absolute', inset: '-40%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,200,66,0.22) 0%, rgba(255,140,0,0.08) 45%, transparent 70%)',
        animation: 'pulse-gold 3.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      {/* Rotating conic ring */}
      <div style={{
        position: 'absolute', inset: '-8%', borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #F5C842, #FF6600, #8B0000, #8B008B, #F5C842)',
        padding: 2,
        animation: 'spin-ring 18s linear infinite',
        opacity: 0.75,
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'transparent' }} />
      </div>
      {/* Ganesh image */}
      <div className="float-anim" style={{
        width: 'clamp(160px, 22vw, 240px)',
        height: 'clamp(160px, 22vw, 240px)',
        borderRadius: '50%', overflow: 'hidden',
        border: '3px solid rgba(245,200,66,0.5)',
        boxShadow: '0 0 40px rgba(245,200,66,0.55), 0 0 80px rgba(255,140,0,0.2)',
        position: 'relative',
      }}>
        <img
          src="/ninassarts-ganesh-5998483.jpg"
          alt="Lord Ganesha - Remover of Obstacles"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.1) contrast(1.08) saturate(1.2)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 30%, rgba(245,200,66,0.1) 0%, transparent 60%)',
        }} />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const lang = useLang()
  const t = T[lang]?.hero || T.en.hero
  return (
    <section id="home" style={{
      position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden',
      background: 'linear-gradient(180deg, #04000E 0%, #080018 60%, #060520 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* 3D canvas bg */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <HeroCanvas />
      </div>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 70% at 50% 40%, rgba(4,0,14,0.2) 0%, rgba(6,5,32,0.6) 60%, rgba(0,0,0,0.95) 100%)',
      }} />
      {/* Light rays */}
      <LightRays />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(72px, 10vw, 120px) clamp(16px, 5vw, 24px) clamp(40px, 6vw, 80px)',
      }}>

        {/* Ganesh */}
        <GaneshDisplay />

        {/* Sanskrit mantra — plain ASCII fallback, no encoding issues */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ marginTop: 20, marginBottom: 4 }}
        >
          <p style={{
            fontFamily: 'Cinzel Decorative, serif',
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            letterSpacing: '0.3em',
            color: 'rgba(245,200,66,0.75)',
            textShadow: '0 0 20px rgba(245,200,66,0.4)',
          }}>
            {t.mantra}
          </p>
        </motion.div>

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{ width: 160, height: 1, margin: '12px auto 16px', background: 'linear-gradient(90deg, transparent, #F5C842, transparent)' }}
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{ marginBottom: 14 }}
        >
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)',
            letterSpacing: '0.3em',
            color: 'rgba(245,200,66,0.85)',
            border: '1px solid rgba(245,200,66,0.25)',
            background: 'rgba(245,200,66,0.05)',
            backdropFilter: 'blur(10px)',
            padding: '7px 22px',
            borderRadius: 999,
            display: 'inline-block',
          }}>
            {t.badge}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.9 }}
          className="cinzel-deco gold-text glow-gold"
          style={{ fontSize: 'clamp(1.8rem, 5.5vw, 5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 4 }}
        >
          Pandit Subrata<br />Kumar Mukherjee        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="divine-divider"
          style={{ maxWidth: 480, margin: '14px auto' }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.65rem, 1.4vw, 0.9rem)',
            letterSpacing: '0.18em',
            color: 'rgba(245,200,66,0.72)',
            marginBottom: 10,
          }}
        >
          {t.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.7 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
            color: 'rgba(240,232,208,0.58)',
            maxWidth: 560, lineHeight: 1.75, marginBottom: 32,
          }}
        >
          {t.desc1}{' '}
          <span style={{ color: '#F5C842', fontWeight: 600 }}>{t.desc1b}</span>
          {t.desc2}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.7 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(10px, 3vw, 40px)', marginBottom: 36, width: '100%', maxWidth: 480 }}
        >
          {t.stats.map(s => (
            <div key={s.label} style={{
              textAlign: 'center',
              padding: 'clamp(10px, 2vw, 16px)',
              borderRadius: 16,
              background: 'rgba(245,200,66,0.05)',
              border: '1px solid rgba(245,200,66,0.12)',
            }}>
              <div style={{
                fontFamily: 'Cinzel Decorative, serif',
                fontSize: 'clamp(1.2rem, 4vw, 2.8rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #FFE066, #F5C842)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(245,200,66,0.4))',
              }}>{s.num}</div>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.5rem, 1.5vw, 0.6rem)',
                letterSpacing: '0.15em', color: 'rgba(245,200,66,0.42)', textTransform: 'uppercase',
              }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.7 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}
        >
          <a
            href="https://wa.me/919735805602?text=Namaste%20Pandit%20Ji%2C%20I%20would%20like%20to%20consult%20you."
            target="_blank" rel="noopener noreferrer"
            className="whatsapp-btn cinzel"
            style={{ color: '#fff', fontWeight: 700, padding: '14px 28px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8, fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)', textDecoration: 'none' }}
          >
            <span>&#128172;</span> {t.whatsapp}
          </a>
          <a
            href="tel:9434999869"
            className="call-btn cinzel"
            style={{ color: '#000', fontWeight: 700, padding: '14px 28px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8, fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)', textDecoration: 'none' }}
          >
            <span>&#128222;</span> {t.call}
          </a>
          <a
            href="#universe"
            className="cinzel"
            style={{ color: '#F5C842', fontWeight: 600, padding: '14px 28px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 8, fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)', border: '1px solid rgba(245,200,66,0.3)', background: 'rgba(245,200,66,0.05)', textDecoration: 'none' }}
          >
            <span>&#127760;</span> {t.explore}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.7 }}
          style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.45em', color: 'rgba(245,200,66,0.32)' }}>
            {t.scroll}
          </span>
          <div className="bounce" style={{ color: 'rgba(245,200,66,0.32)', fontSize: '1.1rem' }}>&#8595;</div>
        </motion.div>
      </div>
    </section>
  )
}

