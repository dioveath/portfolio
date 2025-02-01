// NesEmulatorScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import NesEmulator from './NesEmulator';
import { Html, shaderMaterial } from '@react-three/drei';
import { CRTEffectShader } from './CRTEffectShader';
import { extend, useFrame } from '@react-three/fiber';


const CRTEffectMaterial = shaderMaterial(
  // @ts-ignore
  CRTEffectShader.uniforms,
  CRTEffectShader.vertexShader,
  CRTEffectShader.fragmentShader
)

extend({ CRTEffectMaterial });

export function NesEmulatorScreen({ romUrl, position }) {
  const [canvasTexture, setCanvasTexture] = useState<THREE.CanvasTexture | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const shaderRef = useMemo(() => new THREE.ShaderMaterial(CRTEffectShader), []);

  const observer = useMemo(
    () =>
      new MutationObserver(() => {
        const c = document.getElementById('nes-canvas') as HTMLCanvasElement;
        if (c) setCanvas(c);
      }),
    []
  );

  useEffect(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [observer]);

  useEffect(() => {
    if (!canvas) return;
    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 0;
    tex.generateMipmaps = false;
    setCanvasTexture(tex);

    const updateTexture = () => {
      tex.needsUpdate = true;
      requestAnimationFrame(updateTexture);
    };

    updateTexture();
  }, [canvas]);

  useFrame(({ clock }) => {
    if(shaderRef){
      shaderRef.uniforms.time.value += clock.elapsedTime
      shaderRef.uniforms.tDiffuse.value = canvasTexture
    }
  })

  return (
    <>
      {/* Render the hidden NES emulator (outside the Three.js scene) */}
      <Html prepend>
        <NesEmulator romUrl={romUrl} canvasId="nes-canvas" canvasTexture={canvasTexture} />
      </Html>

      {/* Render the mesh only when the texture is ready */}
      <mesh position={position}>
        <planeGeometry args={[2, 1.5]} />
        {/* {canvasTexture === null ? null : <meshBasicMaterial map={canvasTexture} />} */}
        { canvasTexture && <primitive object={shaderRef} attach="material" />}
      </mesh>
    </>
  );
}
