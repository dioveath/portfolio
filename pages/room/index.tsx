import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Sky, ContactShadows } from '@react-three/drei';
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
import { Button } from '@chakra-ui/react';
import SkySphere from '@/components/room/SkySphere';
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { WindowsPC3DScreen } from '@/components/room/PCScreen';

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
        <Button onClick={handleExitClick} position={'absolute'} top={'2rem'} left={'2rem'} zIndex={1000}>
          Go back
        </Button>
      )}

      <Canvas shadows gl={{ antialias: true }}>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={{ width: 2048, height: 2048 }}
          shadow-camera-near={1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ContactShadows position={[0, -0.2, 0]} opacity={0.5} scale={10} blur={2} far={10} />

        <SkySphere />

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
          <NesEmulatorScreen romUrl={'/assets/nes/mario.nes'} position={new THREE.Vector3(...[0.4, 1, 1])} />
        )}

        {currentHotspotId === 'computer' && !isTransitioning && (
          // <VideoGameScreen position3d={new THREE.Vector3(...[-4.35, 1.2, -1.95])} />
          <WindowsPC3DScreen position={[-4.35, 1.4, -2.0]} />
        )}

        {/* <EffectComposer> */}
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        {/* <Noise opacity={0.02} /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        {/* </EffectComposer> */}
        {/* <gridHelper args={[20, 20, 'white', 'gray']} position={[0, -0.01, 0]} /> */}

        {/* Controls */}
        {/* {currentHotspotId === 'computer' && (
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
    <PerspectiveCamera ref={cameraRef} makeDefault position={basePosition.toArray()} fov={50} near={1} far={1000} />
  );
};
