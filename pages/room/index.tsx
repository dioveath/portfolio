import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Sky } from '@react-three/drei';
import { RoomModel } from '../../components/room/RoomModel';
import { CameraController } from '../../components/room/CameraController';
import { Hotspot } from '../../components/room/Hotspot';
import {
  CameraPosition,
  HOTSPOTS,
  DEFAULT_ROOM_POSITION,
  VIDEO_GAME_HOTSPOT_POSITION,
} from '../../components/room/types';
import * as THREE from 'three';
import { VideoGameScreen } from '../../components/room/VideoGame';
import { NesEmulatorScreen } from '../../components/room/NesEmulatorScreen';

const ORBIT_CONTROLS_CONFIG = {
  // maxPolarAngle: Math.PI / 2,
  // minPolarAngle: Math.PI / 4,
  // minAzimuthAngle: 0,
  // maxAzimuthAngle: Math.PI / 2,
  enableZoom: true,
  enablePan: true,
} as const;

/**
 * Renders a room with interactive hotspots and a camera controller.
 *
 * The component utilizes react-three-fiber to render a 3D room scene with multiple hotspots.
 * It manages the camera position and transitions between different views based on user
 * interactions with the hotspots.
 *
 * State:
 * - currentView: The current camera position and orientation in the room.
 * - isTransitioning: A flag indicating whether the camera is currently transitioning to a new position.
 *
 * Functions:
 * - handleHotspotClick: Updates the camera position based on the selected hotspot.
 *
 * Returns a full-screen canvas that includes lighting, a 3D room model, hotspots, and orbit controls.
 */
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
      {currentHotspotId && !isTransitioning && (
        <button
          onClick={handleExitClick}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            padding: '10px 20px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
          Go back
        </button>
      )}

      <Canvas shadows gl={{ antialias: true }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        {/* <Sky sunPosition={[100, 20, 100]} /> */}

        {/* Camera Setup */}
        <MouseOrbitCamera
          basePosition={new THREE.Vector3(...currentView.position)}
          positionOffsetFactor={1}
          hoveringEffect={!(isTransitioning || currentHotspotId !== null)}
        />
        <CameraController targetPosition={currentView} onTransitionComplete={handleTransitionComplete} />

        {/* Room and Hotspots */}
        <RoomModel />

        {!(isTransitioning || currentHotspotId !== null) &&
          HOTSPOTS.map((hotspot) => <Hotspot key={hotspot.id} {...hotspot} onClick={handleHotspotClick} />)}

        {currentHotspotId === 'video_game' && !isTransitioning && (
          // <VideoGameScreen position3d={new THREE.Vector3(...[0.4, 1, 0.3])} />
          <NesEmulatorScreen romUrl={'/assets/nes/mario.nes'} position={new THREE.Vector3(...[0.4, 1, 0.3])} />
        )}

        {/* <gridHelper args={[20, 20, 'white', 'gray']} position={[0, -0.01, 0]} /> */}

        {/* Controls */}
        {/* {currentHotspotId === 'video_game' && (
          <OrbitControls {...ORBIT_CONTROLS_CONFIG} enableRotate={!isTransitioning} />
        )} */}

      </Canvas>
    </div>
  );
}

type MouseOrbitCameraProps = {
  basePosition: THREE.Vector3;
  positionOffsetFactor: number;
  hoveringEffect: boolean;
};

const MouseOrbitCamera = ({ basePosition, positionOffsetFactor, hoveringEffect }: MouseOrbitCameraProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { mouse, size } = useThree();
  
  useFrame(() => {
    if (cameraRef.current && hoveringEffect) {
      const { position, rotation, zoom } = cameraRef.current;
      // console.log('Camera Position:', position.toArray());
      // console.log('Camera Rotation:', rotation.toArray());
      // console.log('Camera Zoom:', zoom);

      const offsetX = mouse.x * positionOffsetFactor;
      const offsetY = mouse.y * positionOffsetFactor;

      cameraRef.current.position.set(basePosition.x + offsetX, basePosition.y + offsetY, basePosition.z);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <PerspectiveCamera ref={cameraRef} makeDefault position={basePosition.toArray()} fov={50} near={1} far={100} />
  );
};
