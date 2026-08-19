import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 80 }) {
  const mesh = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 18
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.015
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#10b981"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingGeometries() {
  const group = useRef()
  const meshes = useMemo(() => {
    const arr = []
    const geoTypes = ['icosahedron', 'octahedron', 'torus']
    const colors = ['#10b981', '#34d399', '#f59e0b']
    for (let i = 0; i < 4; i++) {
      arr.push({
        position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4 - 2],
        scale: 0.08 + Math.random() * 0.12,
        color: colors[i % 3],
        type: geoTypes[i % 3],
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2
      })
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      const d = meshes[i]
      if (d) {
        child.position.y += Math.sin(t * d.speed + d.offset) * 0.0015
        child.rotation.x += 0.003 * d.speed
        child.rotation.y += 0.006 * d.speed
      }
    })
  })

  return (
    <group ref={group}>
      {meshes.map((m, i) => {
        let geometry
        switch (m.type) {
          case 'torus': geometry = <torusGeometry args={[1, 0.3, 6, 12]} />; break
          case 'octahedron': geometry = <octahedronGeometry args={[1, 0]} />; break
          default: geometry = <icosahedronGeometry args={[1, 0]} />; break
        }
        return (
          <mesh key={i} position={m.position} scale={m.scale}>
            {geometry}
            <meshBasicMaterial color={m.color} wireframe transparent opacity={0.25} />
          </mesh>
        )
      })}
    </group>
  )
}

function Scene() {
  return (
    <>
      <Particles count={60} />
      <FloatingGeometries />
    </>
  )
}

export default function ParticleField() {
  const [visible, setVisible] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 1.2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      frameloop="always"
    >
      <Scene />
    </Canvas>
  )
}
