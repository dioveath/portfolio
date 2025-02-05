// useAudioManager.ts
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export function useAudioManager() {
  const [listener, setListener] = useState<THREE.AudioListener | null>(null);
  const [audioState, setAudioState] = useState<string | null>(null);

  useEffect(() => {
    if (!listener && document) {
      const newListener = new THREE.AudioListener();
      setListener(newListener);
      setAudioState(newListener.context.state);

      newListener.context.onstatechange = () => {
        setAudioState(newListener.context.state);
      }
    }

    const resumeAudioContext = () => {
      if (listener?.context.state === 'suspended') {
        listener.context
          .resume()
          .then(() => {
            document.removeEventListener('click', resumeAudioContext);
            console.log(`Resumed audio context with ${listener.context.state}`);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      console.log(listener.context.state);
    };

    document.addEventListener('click', resumeAudioContext);
    return () => document.removeEventListener('click', resumeAudioContext);
  }, [listener]);

  return { listener, audioState };
}
