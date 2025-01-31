import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type SimpleCanvasTextureProps = {
  position3d: THREE.Vector3
}

export function SimpleCanvasTextureExample({ position3d }: SimpleCanvasTextureProps) {
  // We'll keep the <canvas> reference in memory
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Store a reference to the THREE texture once created
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null)

  useEffect(() => {
    // 1) Create an offscreen <canvas> once
    const c = document.createElement('canvas')
    c.width = 960
    c.height = 720
    canvasRef.current = c

    // 2) Draw something: big red background
    const ctx = c.getContext('2d')
    if (ctx) {
      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, c.width, c.height)

      // (Optional) Add some text:
      ctx.fillStyle = 'white'
      ctx.font = '48px sans-serif'
      ctx.fillText('Canvas Texture!', 50, 100)
    }

    // 3) Convert to THREE.CanvasTexture
    const tex = new THREE.CanvasTexture(c)
    // If you want, set tex.anisotropy, minFilter, etc. here
    setTexture(tex)
  }, [])

  // 4) Mark the texture for update each frame (if you plan to animate the canvas)
  useFrame(() => {
    if (texture) {
      texture.needsUpdate = true
    }
  })

  // 5) Render a plane with the texture
  return (
    <mesh position={position3d}>
      <planeGeometry args={[2, 1.5]} />
      {texture && <meshBasicMaterial map={texture} side={THREE.DoubleSide} />}
    </mesh>
  )
}
