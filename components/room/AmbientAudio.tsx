import React, { useRef, useEffect } from 'react';
import { PositionalAudio as PositionalAudioImpl } from '@react-three/drei';
import * as THREE from 'three';

interface AmbientAudioProps {
  url: string;
  // We inject the same listener for all audio
  listener?: THREE.AudioListener;

  position?: [number, number, number];
  isActive: boolean; // If true → fade in; if false → fade out
  fadeDuration?: number; // In seconds
  loop?: boolean;
  distance?: number;
  autoplay?: boolean;

  // Optional volume (max volume). So if you have multiple layers,
  // you can set e.g. cityNoiseVolume = 0.3, windVolume = 0.05, etc.
  maxVolume?: number;
}

export function AmbientAudio({
  url,
  listener,
  position = [0, 0, 0],
  isActive,
  fadeDuration = 1,
  loop = true,
  distance = 15,
  autoplay = false,
  maxVolume = 1,
}: AmbientAudioProps) {
  const audioRef = useRef<THREE.PositionalAudio>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) { 
      console.log('audio is null')
      return;
    }
    audio.setVolume(maxVolume);
  }, [listener]);

  // Animate volume changes when `isActive` changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Starting volume might be whatever was left from the last fade
    const startVolume = audio.getVolume();
    const endVolume = isActive ? maxVolume : 0;
    const startTime = performance.now();

    function fadeVolume(currentTime: number) {
      const elapsed = (currentTime - startTime) / 1000; // ms → seconds
      const progress = Math.min(elapsed / fadeDuration, 1);
      const newVolume = startVolume + (endVolume - startVolume) * progress;
      audio.setVolume(newVolume);

      if (progress < 1) {
        requestAnimationFrame(fadeVolume);
      }
    }

    requestAnimationFrame(fadeVolume);

    // Start playback if activating
    if (isActive) {
      const ctxState = audio.context?.state;
      if (ctxState === 'running' && !audio.isPlaying) {
        audio.play();
      }
    }
  }, [isActive, fadeDuration, maxVolume]);

  return (
    <>
      {/* We only render PositionalAudio if we have a listener */}
      {listener && (
        <PositionalAudioImpl
          ref={audioRef}
          args={[listener]} // attach the single shared listener
          url={url}
          position={position}
          distance={distance}
          loop={loop}
          autoplay={autoplay}
        />
      )}
    </>
  );
}
