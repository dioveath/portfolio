// WindowsPC3DScreenWithShader.tsx
import React, { useEffect, useMemo, useRef } from 'react';
import { Html, shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CRTEffectShader } from './CRTEffectShader';
import { useAudioManagerContext } from '../context/AudioManagerContext';

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

  useClickSfxOnElement();

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
        <div style={{ padding: '4rem', backgroundColor: 'rgba(100,100,100,1)', borderRadius: '1rem' }}>
          <iframe
            src="https://webwindowspc.vercel.app/"
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

export function useClickSfxOnElement() {
  const { listener } = useAudioManagerContext();
  const audioLoaderRef = useRef(new THREE.AudioLoader());
  const leftClickSoundRef = useRef<THREE.Audio | null>(null);
  const rightClickSoundRef = useRef<THREE.Audio | null>(null);

  // Load both sound buffers once the listener is available.
  useEffect(() => {
    if (!listener) return;

    // Create THREE.Audio instances for left and right click.
    leftClickSoundRef.current = new THREE.Audio(listener);
    rightClickSoundRef.current = new THREE.Audio(listener);

    // Load left-click sound.
    audioLoaderRef.current.load(
      '/assets/audios/sfx/left_click.mp3',
      (buffer) => {
        leftClickSoundRef.current?.setBuffer(buffer);
        leftClickSoundRef.current?.setVolume(1);
      },
      undefined,
      (error) => {
        console.error('Error loading left-click sound:', error);
      }
    );

    // Load right-click sound.
    audioLoaderRef.current.load(
      '/assets/audios/sfx/right_click.mp3',
      (buffer) => {
        rightClickSoundRef.current?.setBuffer(buffer);
        rightClickSoundRef.current?.setVolume(1);
      },
      undefined,
      (error) => {
        console.error('Error loading right-click sound:', error);
      }
    );
  }, [listener]);

  // Attach event listeners to the given element.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'click') {
        const button = event.data.button;
        if (button === 0 && leftClickSoundRef.current) {
          if (leftClickSoundRef.current.isPlaying) leftClickSoundRef.current.stop();
          leftClickSoundRef.current.play();
        } else if (button === 2 && rightClickSoundRef.current) {
          if (rightClickSoundRef.current.isPlaying) rightClickSoundRef.current.stop();
          rightClickSoundRef.current.play();
        }
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 0 && leftClickSoundRef.current) {
        if (leftClickSoundRef.current.isPlaying) leftClickSoundRef.current.stop();
        leftClickSoundRef.current.play();
      } else if (event.button === 2 && rightClickSoundRef.current) {
        if (rightClickSoundRef.current.isPlaying) rightClickSoundRef.current.stop();
        rightClickSoundRef.current.play();
      }
    };

    // window.addEventListener('mousedown', handleMouseDown);
    // return () => window?.removeEventListener('mousedown', handleMouseDown);

    window.addEventListener('message', handleMessage);
    return () => window?.removeEventListener('message', handleMessage);
  }, []);

  return null;
}

export default WindowsPC3DScreen;
