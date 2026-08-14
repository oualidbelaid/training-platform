import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { canvasDefaults } from '@/lib/r3f'

/**
 * "Knowledge / connection / growth" orb — the Hero's premium 3D visual
 * (redesign spec §5/§6). Deliberately abstract rather than literal (no
 * gaming/crypto/sci-fi cues): a soft glass sphere with an inner glow,
 * two thin encircling rings, and a light scatter of particles via drei's
 * <Sparkles> (a single cheap draw call — chosen specifically to keep the
 * "fine particles" effect within a sane GPU budget, spec §22).
 *
 * Motion is intentionally slow: continuous auto-rotation plus a small
 * pointer-follow tilt (spec §7 — "orb responds slightly to pointer
 * movement"), both driven by useFrame rather than per-frame React state,
 * so nothing here triggers a React re-render.
 */
function Orb() {
  const groupRef = useRef<Group>(null)
  const pointer = useThree((state) => state.pointer)

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) return

    group.rotation.y += delta * 0.12

    const targetX = pointer.y * 0.15
    const targetZ = -pointer.x * 0.15
    group.rotation.x += (targetX - group.rotation.x) * Math.min(delta * 2, 1)
    group.rotation.z += (targetZ - group.rotation.z) * Math.min(delta * 2, 1)
  })

  return (
    <group ref={groupRef}>
      {/* Inner glowing core, visible through the translucent shell */}
      <mesh scale={0.62}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#8c1e4b" emissive="#8c1e4b" emissiveIntensity={0.9} roughness={0.4} />
      </mesh>

      {/* Soft glass shell */}
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#f7eef2"
          transmission={0.85}
          thickness={1.4}
          roughness={0.15}
          ior={1.25}
          distort={0.15}
          speed={1.1}
        />
      </Sphere>

      <mesh rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.55, 0.012, 16, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, Math.PI / 5, 0]}>
        <torusGeometry args={[1.8, 0.008, 16, 120]} />
        <meshBasicMaterial color="#dba7c0" transparent opacity={0.3} />
      </mesh>

      <Sparkles count={50} scale={4.2} size={2.2} speed={0.15} opacity={0.5} color="#ffffff" />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={canvasDefaults.dpr}
      shadows={canvasDefaults.shadows}
      gl={canvasDefaults.gl}
      camera={{ position: [0, 0, 6], fov: 40 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color="#b23e6e" />
      <Orb />
    </Canvas>
  )
}
