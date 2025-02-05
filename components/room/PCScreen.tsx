// WindowsPC3DScreenWithShader.tsx
import React, { useMemo, useRef } from 'react';
import { Html, shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CRTEffectShader } from './CRTEffectShader';

const CRTEffectMaterial = shaderMaterial(
  // @ts-ignore
  CRTEffectShader.uniforms,
  CRTEffectShader.vertexShader,
  CRTEffectShader.fragmentShader
);

extend({ CRTEffectMaterial });

export function WindowsPC3DScreen({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  // A ref to update the shader time uniform
  const shaderRef = useMemo(() => new THREE.ShaderMaterial(CRTEffectShader), []);

  // Update the time uniform on every frame
  useFrame(({ clock }) => {
    if (shaderRef) {
      shaderRef.uniforms.time.value += clock.elapsedTime;
    }
  });

  return (
    <>
      {/* Render the iframe as an HTML element positioned in 3D space */}
      <Html transform occlude position={position} scale={[0.5, 0.5, 1]} distanceFactor={1}>
        <div>
          <iframe
            src="http://localhost:3000"
            title="Windows PC"
            style={{ width: '1280px', height: '1024px', border: 'none' }}
          />
        </div>

        <svg style={{ position: 'absolute', width: 0, height: 0 }} xmlns="http://www.w3.org/2000/svg">
          <filter id="crtFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0" result="desaturatedNoise" />
            <feBlend in="SourceGraphic" in2="desaturatedNoise" mode="multiply" />
          </filter>
        </svg>
      </Html>

      {/* <mesh position={position}>
        <planeGeometry args={[1, 0.75]} />
        <primitive object={shaderRef} transparent blending={THREE.AdditiveBlending} />
      </mesh> */}
    </>
  );
}

export default WindowsPC3DScreen;
