import { useRef, useMemo, useState, useCallback, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { PLANETS } from '../data/planets'
import { NAKSHATRAS } from '../data/nakshatras'
import PlanetPanel from './PlanetPanel'

// ─── STAR FIELD ──────────────────────────────────────────────────────────────
function StarField() {
  const count = 6000
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 80 + Math.random() * 120
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() * 1.5 + 0.3
      // Slight color variation: white, blue-white, yellow-white
      const t = Math.random()
      colors[i * 3]     = t > 0.7 ? 1.0 : t > 0.4 ? 0.85 : 0.95
      colors[i * 3 + 1] = t > 0.7 ? 1.0 : t > 0.4 ? 0.90 : 0.95
      colors[i * 3 + 2] = t > 0.7 ? 0.7 : t > 0.4 ? 1.00 : 1.00
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
    g.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))
    return g
  }, [])

  const matRef = useRef()
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.opacity = 0.7 + Math.sin(clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <points geometry={geo}>
      <pointsMaterial
        ref={matRef}
        size={0.18}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ─── NEBULA CLOUD ─────────────────────────────────────────────────────────────
function Nebula() {
  const count = 2000
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      [1, 0.5, 0.1], [0.5, 0.1, 0.9], [0.1, 0.4, 1],
      [1, 0.8, 0.1], [0.8, 0.1, 0.5],
    ]
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 50 + Math.random() * 50
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.25
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2]
    }
    return { positions: pos, colors: col }
  }, [])

  const ref = useRef()
  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.00015 })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.22} vertexColors transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ─── SUN ──────────────────────────────────────────────────────────────────────
function SunMesh({ onClick, isSelected }) {
  const coreRef = useRef()
  const glow1Ref = useRef()
  const glow2Ref = useRef()
  const glow3Ref = useRef()
  const flameRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (coreRef.current) coreRef.current.rotation.y += 0.005
    
    // Pulsing corona layers
    if (glow1Ref.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.08
      glow1Ref.current.scale.setScalar(s)
    }
    if (glow2Ref.current) {
      const s = 1 + Math.sin(t * 1.5 + 1) * 0.06
      glow2Ref.current.scale.setScalar(s)
    }
    if (glow3Ref.current) {
      const s = 1 + Math.sin(t * 1.8 + 2) * 0.07
      glow3Ref.current.scale.setScalar(s)
    }
    
    // Flame flicker
    if (flameRef.current) {
      flameRef.current.rotation.y = t * 0.3
      flameRef.current.rotation.z = Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group onClick={onClick}>
      {/* Outer corona — burning effect */}
      <mesh ref={glow3Ref}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#FF2200" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      
      {/* Mid corona */}
      <mesh ref={glow2Ref}>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial color="#FF4400" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      
      {/* Inner corona */}
      <mesh ref={glow1Ref}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#FF8800" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      
      {/* Flame ring */}
      <group ref={flameRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.9, 0.15, 16, 64]} />
          <meshBasicMaterial color="#FF6600" transparent opacity={0.4} />
        </mesh>
      </group>
      
      {/* Sun core — burning surface */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FF4400"
          emissiveIntensity={isSelected ? 4.5 : 2.8}
          roughness={0.9}
        />
      </mesh>
      
      {/* Intense lights */}
      <pointLight color="#FFA500" intensity={12} distance={140} decay={1.1} />
      <pointLight color="#FF6600" intensity={7}  distance={70}  decay={1.4} />
      <pointLight color="#FF2200" intensity={4}  distance={40}  decay={1.8} />
    </group>
  )
}

// ─── ORBIT RING ───────────────────────────────────────────────────────────────
function OrbitRing({ radius, color = '#ffffff', opacity = 0.07 }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

// ─── PLANET MESH ──────────────────────────────────────────────────────────────
function PlanetMesh({ data, onClick, isSelected, isHovered, onHover, onUnhover }) {
  const orbitRef  = useRef()
  const meshRef   = useRef()
  const glowRef   = useRef()
  const angleRef  = useRef(Math.random() * Math.PI * 2) // random start angle

  useFrame(({ clock }) => {
    // Orbit
    angleRef.current += data.orbitSpeed * 0.016
    if (orbitRef.current) {
      orbitRef.current.position.x = Math.cos(angleRef.current) * data.orbitRadius
      orbitRef.current.position.z = Math.sin(angleRef.current) * data.orbitRadius
    }
    // Self rotation
    if (meshRef.current) meshRef.current.rotation.y += data.axisSpeed
    // Glow pulse on hover/select
    if (glowRef.current) {
      const t = clock.elapsedTime
      const base = isSelected ? 1.4 : isHovered ? 1.25 : 1.0
      const pulse = isSelected || isHovered ? Math.sin(t * 3) * 0.08 : 0
      glowRef.current.scale.setScalar(base + pulse)
      glowRef.current.material.opacity = isSelected ? 0.35 : isHovered ? 0.25 : 0.0
    }
  })

  const emissiveIntensity = isSelected ? data.emissiveIntensity * 2.5
    : isHovered ? data.emissiveIntensity * 1.8
    : data.emissiveIntensity

  return (
    <group ref={orbitRef}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[data.size * 1.8, 16, 16]} />
        <meshBasicMaterial color={data.color} transparent opacity={0} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Planet body */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(data) }}
        onPointerOver={(e) => { e.stopPropagation(); onHover(data.id); document.body.style.cursor = 'pointer' }}
        onPointerOut={(e)  => { e.stopPropagation(); onUnhover();      document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive || data.color}
          emissiveIntensity={emissiveIntensity}
          roughness={data.isNode ? 0.3 : 0.7}
          metalness={data.isNode ? 0.4 : 0.1}
        />
      </mesh>

      {/* Saturn ring */}
      {data.hasRing && (
        <mesh rotation={[Math.PI / 3.5, 0, 0]}>
          <ringGeometry args={[data.size * 1.45, data.size * 2.3, 64]} />
          <meshBasicMaterial color={data.ringColor} transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      )}

      {/* Rahu/Ketu — shadow node visual (comet tail effect) */}
      {data.isNode && (
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[data.size * 1.3, data.size * 0.08, 8, 32, Math.PI]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  )
}

// ─── NAKSHATRA RING ───────────────────────────────────────────────────────────
function NakshatraRing() {
  const ringRadius = 34
  const groupRef = useRef()

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0004
  })

  const starPositions = useMemo(() => {
    return NAKSHATRAS.map((n) => {
      const rad = (n.angle * Math.PI) / 180
      return {
        ...n,
        x: Math.cos(rad) * ringRadius,
        z: Math.sin(rad) * ringRadius,
        y: Math.sin(rad * 2.3) * 1.5,
      }
    })
  }, [])

  // Outer ring geometry
  const ringGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(Math.cos(a) * ringRadius, 0, Math.sin(a) * ringRadius)
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return geo
  }, [])

  return (
    <group ref={groupRef}>
      {/* Outer ring line */}
      <line geometry={ringGeo}>
        <lineBasicMaterial color="#FFD700" transparent opacity={0.08} />
      </line>

      {/* Nakshatra star points */}
      {starPositions.map((n, i) => (
        <NakshatraStar key={n.name} data={n} index={i} />
      ))}
    </group>
  )
}

function NakshatraStar({ data, index }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + index * 0.4
    if (meshRef.current) {
      const s = 0.85 + Math.sin(t * 1.5) * 0.15
      meshRef.current.scale.setScalar(s)
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.15 + Math.sin(t * 1.8) * 0.1
    }
  })

  const color = new THREE.Color(data.color)

  return (
    <group position={[data.x, data.y, data.z]}>
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshBasicMaterial color={data.color} transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
      {/* Star core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  )
}

// ─── SCENE ────────────────────────────────────────────────────────────────────
function Scene({ onPlanetClick, selectedId, hoveredId, onHover, onUnhover, enableZoom }) {
  const sunData = PLANETS.find(p => p.isSun)
  const orbitPlanets = PLANETS.filter(p => !p.isSun)

  return (
    <>
      <ambientLight intensity={0.08} />
      <StarField />
      <Nebula />

      {/* Sun */}
      <SunMesh
        onClick={() => onPlanetClick(sunData)}
        isSelected={selectedId === 'sun'}
      />

      {/* Orbit rings */}
      {orbitPlanets.map(p => (
        <OrbitRing
          key={`orbit-${p.id}`}
          radius={p.orbitRadius}
          color={p.color}
          opacity={hoveredId === p.id || selectedId === p.id ? 0.18 : 0.06}
        />
      ))}

      {/* Planets */}
      {orbitPlanets.map(p => (
        <PlanetMesh
          key={p.id}
          data={p}
          onClick={onPlanetClick}
          isSelected={selectedId === p.id}
          isHovered={hoveredId === p.id}
          onHover={onHover}
          onUnhover={onUnhover}
        />
      ))}

      {/* Nakshatra ring — 27 lunar mansions */}
      <NakshatraRing />

      <OrbitControls
        enableZoom={enableZoom}
        enablePan={false}
        minDistance={8}
        maxDistance={75}
        autoRotate
        autoRotateSpeed={0.25}
        enableDamping
        dampingFactor={0.06}
        zoomSpeed={0.8}
      />
    </>
  )
}

// ─── TOOLTIP ─────────────────────────────────────────────────────────────────
function Tooltip({ planet, mousePos }) {
  if (!planet) return null
  return (
    <div
      className="planet-tooltip"
      style={{ left: mousePos.x, top: mousePos.y }}
    >
      {planet.symbol} {planet.name} — {planet.meaning}
    </div>
  )
}
export default function AstrologyUniverse() {
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [hoveredId, setHoveredId]           = useState(null)
  const [mousePos, setMousePos]             = useState({ x: 0, y: 0 })
  const [interacting, setInteracting]       = useState(false)
  const sectionRef = useRef()
  const hoveredPlanet = PLANETS.find(p => p.id === hoveredId) || null

  const handlePlanetClick = useCallback((planet) => {
    setSelectedPlanet(prev => prev?.id === planet.id ? null : planet)
  }, [])

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  // Only allow canvas scroll-zoom when user has clicked inside the universe
  const handleWheel = useCallback((e) => {
    if (interacting) {
      e.stopPropagation()
      // don't preventDefault — let OrbitControls handle it naturally
    }
    // if not interacting, let the event bubble up to page scroll
  }, [interacting])

  return (
    <section
      ref={sectionRef}
      id="universe"
      className="universe-section"
      style={{ height: '100vh', minHeight: '600px' }}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onTouchStart={() => setInteracting(true)}
      onTouchEnd={() => setInteracting(false)}
    >
      {/* Section label */}
      <div className="universe-header">
        <p className="section-label" style={{ marginBottom: 6 }}>INTERACTIVE 3D VEDIC ASTROLOGY</p>
        <h2 className="section-title gold-text" style={{ marginBottom: 6 }}>Astrology Universe</h2>
        <p className="cinzel" style={{ fontSize: '0.65rem', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.3)' }}>
          CLICK PLANET &rarr; BODY EFFECTS &nbsp;&middot;&nbsp; DRAG &rarr; ROTATE &nbsp;&middot;&nbsp; CLICK &amp; SCROLL &rarr; ZOOM
        </p>
      </div>

      {/* Canvas wrapper — wheel only captured when interacting */}
      <div
        style={{ position: 'absolute', inset: 0 }}
        onWheel={handleWheel}
      >
      <Canvas
        camera={{ position: [0, 28, 48], fov: 52 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#000005' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene
            onPlanetClick={handlePlanetClick}
            selectedId={selectedPlanet?.id}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onUnhover={() => setHoveredId(null)}
            enableZoom={interacting}
          />
        </Suspense>
      </Canvas>
      </div>

      {/* Planet legend bar */}
      <div className="universe-legend">
        <div className="universe-legend-inner">
          {PLANETS.map(p => (
            <button
              key={p.id}
              onClick={() => handlePlanetClick(p)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px',
                borderRadius: 999,
                border: `1px solid ${selectedPlanet?.id === p.id ? p.color : `${p.color}35`}`,
                background: selectedPlanet?.id === p.id ? `${p.color}20` : 'rgba(0,0,5,0.6)',
                color: selectedPlanet?.id === p.id ? p.color : 'rgba(255,255,255,0.5)',
                fontSize: '0.65rem',
                fontFamily: 'Cinzel, serif',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedPlanet?.id === p.id ? `0 0 12px ${p.color}35` : 'none',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: p.color,
                boxShadow: `0 0 6px ${p.color}`,
              }} />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hover tooltip */}
      <Tooltip planet={hoveredPlanet} mousePos={mousePos} />

      {/* Planet info panel */}
      <AnimatePresence>
        {selectedPlanet && (
          <PlanetPanel
            planet={selectedPlanet}
            onClose={() => setSelectedPlanet(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
