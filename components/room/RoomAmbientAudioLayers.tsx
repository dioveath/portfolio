import { useEffect } from 'react';
import { useAudioManagerContext } from '../context/AudioManagerContext';
import { AmbientAudio } from './AmbientAudio';

type AudioLayersProps = {
  active: boolean;
  fadeDuration?: number;
};

export const RoomAmbientAudioLayers = ({ active, fadeDuration }: AudioLayersProps) => {
  const { listener } = useAudioManagerContext();
  
  return (
    <>
      {/* <AmbientAudio
        url="/assets/audios/music/ambient.mp3"
        listener={listener}
        position={[0, 0, 0]}
        isActive={true}
        maxVolume={0.05}
        fadeDuration={2}
        autoplay
        loop
      /> */}

      <AmbientAudio
        url="/assets/audios/music/relaxing_piano.mp3"
        listener={listener}
        position={[10, 5, -15]}
        isActive={active}
        minVolume={0.05}
        maxVolume={0.1}
        fadeDuration={fadeDuration}
        autoplay
        loop
      />
      <AmbientAudio
        url="/assets/audios/music/room_clock.mp3"
        listener={listener}
        position={[10, 5, -15]}
        isActive={active}
        minVolume={0.05}
        maxVolume={0.75}
        fadeDuration={fadeDuration}
        autoplay
        loop
      />
    </>
  );
};

