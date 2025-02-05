// AudioManagerContext.tsx
import React, { createContext, useContext } from 'react';
import { useAudioManager } from '@/utils/hooks/audio/useAudioManager';
import * as THREE from 'three';

type AudioManagerContextType = {
  listener?: THREE.AudioListener;
  audioState?: string;
};

const AudioManagerContext = createContext<AudioManagerContextType>({});

export function AudioManagerProvider({ children }: { children: React.ReactNode }) {
  const { listener, audioState } = useAudioManager();
  return <AudioManagerContext.Provider value={{ listener, audioState }}>{children}</AudioManagerContext.Provider>;
}

export function useAudioManagerContext() {
  return useContext(AudioManagerContext);
}
