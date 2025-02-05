import { useMemo } from 'react';
import { useAudioManagerContext } from '../context/AudioManagerContext';
import { Cursor2D } from '../Cursor2D';

export const CursorWithAudioPrompt = () => {
  const { audioState } = useAudioManagerContext();
  return <Cursor2D isPromptActive={audioState === 'suspended'} />;
};
