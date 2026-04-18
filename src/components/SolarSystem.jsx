import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, OrbitControls, Trail, Sphere } from '@react-three/drei'
import * as THREE from 'three'

// Sun
function Sun() {
  const sunRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.003
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      glowRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      {/* Sun glow outer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#FF6600" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      {/* Sun glow mid */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial color="#FF8800" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#FFA500"
          emissive="#FF6600"
          emissiveIntensity={2}
          roughness={0.8}
        />
      </mesh>
      <pointLight color="#FFA500" intensity={8} distance={100} decay={1} />
      <pointLight color="#FF6600" intensity={4} distance={50} decay={1} />
    </group>
  )
}

// Planet component
function Planet({ radius, size, color, emissive, speed, tilt = 0, hasRing = false, ringColor, moons = 0, name }) {
  const orbitRef = useRef()
  const planetRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += speed
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={orbitRef} rotation={[tilt, 0, 0]}>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* Planet */}
      <group position={[radius, 0, 0]}>
        <mesh ref={planetRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive || color}
            emissiveIntensity={0.3}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Saturn-like ring */}
        {hasRing && (
          <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
            <meshBasicMaterial color={ringColor || '#C2A060'} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* Moons */}
        {Array.from({ length: moons }).map((_, i) => (
          <Moon key={i} index={i} parentSize={size} />
        ))}
      </group>
    </group>
  )
}

function Moon({ index, parentSize }) {
  const ref = useRef()
  const speed = 0.05 + index * 0.02
  const dist = parentSize * 2 + index * 0.3

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += speed
  })

  return (
    <group ref={ref}>
      <mesh position={[dist, 0, 0]}>
        <sphereGeometry args={[parentSize * 0.2, 16, 16]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.9} />
      </mesh>
    </group>
  )
}

// Asteroid belt
function AsteroidBelt() {
  const asteroids = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => {
      const angle = (i / 200) * Math.PI * 2
      const r = 14 + (Math.random() - 0.5) * 2
      return {
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        y: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 0.08 + 0.02,
      }
    })
  }, [])

  return (
    <group>
      {asteroids.map((a, i) => (
        <mesh key={i} position={[a.x, a.y, a.z]}>
          <dodecahedronGeometry args={[a.size, 0]} />
          <meshStandardMaterial color="#888888" roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

// Nebula particles
function Nebula() {
  const count = 3000
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 40 + Math.random() * 60
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    const palette = [
      [1, 0.5, 0], [0.5, 0, 1], [0, 0.5, 1], [1, 0.8, 0], [1, 0.2, 0.5]
    ]
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c[0]
      col[i * 3 + 1] = c[1]
      col[i * 3 + 2] = c[2]
    }
    return col
  }, [])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y += 0.0002
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// Main Solar System Scene
export default function SolarSystem() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 25, 45], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <Stars radius={200} depth={60} count={8000} factor={4} saturation={0.5} fade speed={0.5} />
        <Nebula />
        <Sun />
        <Planet radius={4}  size={0.38} color="#b5651d" emissive="#8B4513" speed={0.047} name="Mercury" />
        <Planet radius={6}  size={0.95} color="#e8cda0" emissive="#DEB887" speed={0.035} name="Venus" />
        <Planet radius={8}  size={1.0}  color="#1a6bb5" emissive="#1565C0" speed={0.029} name="Earth" moons={1} />
        <Planet radius={10} size={0.53} color="#c1440e" emissive="#8B2500" speed={0.024} name="Mars" moons={2} />
        <Planet radius={16} size={2.2}  color="#c88b3a" emissive="#A0522D" speed={0.013} name="Jupiter" moons={2} />
        <Planet radius={21} size={1.8}  color="#e4d191" emissive="#DAA520" speed={0.009} hasRing ringColor="#C2A060" name="Saturn" />
        <Planet radius={26} size={1.3}  color="#7de8e8" emissive="#00CED1" speed={0.006} tilt={0.3} name="Uranus" hasRing ringColor="#7de8e8" />
        <Planet radius={30} size={1.2}  color="#3f54ba" emissive="#191970" speed={0.005} name="Neptune" />
        <AsteroidBelt />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={80}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
