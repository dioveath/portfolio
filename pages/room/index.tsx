import { useState } from 'react';
import { CameraPosition, HOTSPOTS, DEFAULT_ROOM_POSITION } from '../../components/room/types';
import { Button } from '@chakra-ui/react';
import RoomScene from '@/components/room/RoomScene';
import { AudioManagerProvider } from '@/components/context/AudioManagerContext';
import { Cursor2D } from '@/components/Cursor2D';
import { CursorWithAudioPrompt } from '@/components/room/CursorWithAudioPrompt';

export default function Room() {
  const [currentView, setCurrentView] = useState<CameraPosition>(DEFAULT_ROOM_POSITION);
  const [currentHotspotId, setCurrentHotspotId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleHotspotClick = (id: string) => {
    if (isTransitioning) return;

    const hotspot = HOTSPOTS.find((h) => h.id === id);
    if (hotspot) {
      setIsTransitioning(true);
      setCurrentView(hotspot.cameraPosition);
      setCurrentHotspotId(id);
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
  };

  const handleExitClick = () => {
    setIsTransitioning(true);
    setCurrentView(DEFAULT_ROOM_POSITION);
    setCurrentHotspotId(null);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <AudioManagerProvider>
        {currentHotspotId && !isTransitioning && (
          <Button onClick={handleExitClick} position={'absolute'} top={'2rem'} left={'2rem'} zIndex={1000}>
            Go back
          </Button>
        )}

        <CursorWithAudioPrompt />
        <RoomScene
          currentView={currentView}
          currentHotspotId={currentHotspotId}
          isTransitioning={isTransitioning}
          handleHotspotClick={handleHotspotClick}
          handleTransitionComplete={handleTransitionComplete}
        />
      </AudioManagerProvider>
    </div>
  );
}
