import { useEffect, useState } from 'react';
import * as THREE from 'three';

export const useSoundContext = () => {
  const [state, setState] = useState('');

  useEffect(() => {
    const listener = new THREE.AudioListener();
    const resumeAudioContext = () => {
      if (listener.context.state === 'suspended') {
        listener.context.resume().then(() => {
          setState(listener.context.state);
        });
      }
      document.removeEventListener('click', resumeAudioContext);
    };

    setState(listener.context.state);
    document.addEventListener('click', resumeAudioContext);
    return () => document.removeEventListener('click', resumeAudioContext);
  }, []);

  return { state };
};
