import { useEffect, useMemo } from 'react';
import { useAudioManagerContext } from '../context/AudioManagerContext';
import { Cursor2D } from '../Cursor2D';
import { useSfx } from '@/utils/hooks/audio/useSfx';

export const CursorWithAudioPrompt = () => {
  const { listener, audioState } = useAudioManagerContext();
  const playSfx = useSfx(listener);

  useEffect(() => {
    if (!listener || audioState !== 'suspended') return;
    // playSfx('/assets/audios/sfx/poke_tap.mp3');    
  }, [listener, audioState])
    
  return <Cursor2D isPromptActive={audioState === 'suspended'} />;
};
