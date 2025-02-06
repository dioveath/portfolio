import * as THREE from 'three';

import { ContactShadows, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import SkySphere from './SkySphere';
import { MouseOrbitCamera } from './MouseOrbitCamera';
import { CameraController } from './CameraController';
import { RoomModel } from './RoomModel';
import { CameraPosition, HOTSPOTS } from './types';
import { Hotspot } from './Hotspot';
import { NesEmulatorScreen } from './NesEmulatorScreen';
import WindowsPC3DScreen from './PCScreen';
import { RoomAmbientAudioLayers } from './RoomAmbientAudioLayers';
import { VideoGameScreen } from './VideoGame';

const ORBIT_CONTROLS_CONFIG = {
  enableRotate: true,
  enableZoom: true,
  enablePan: true,
};

type RoomSceneProps = {
  currentView: CameraPosition;
  currentHotspotId: string | null;
  isTransitioning: boolean;
  handleHotspotClick: (id: string) => void;
  handleTransitionComplete: () => void;
};

export default function RoomScene({
  currentView,
  currentHotspotId,
  isTransitioning,
  handleHotspotClick,
  handleTransitionComplete,
}: RoomSceneProps) {
  return (
    <Canvas shadows gl={{ antialias: true }}>
      {/* {!isLoaded && <LoadingOverlay onLoaded={handleSceneLoaded} />} */}

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
      <RoomAmbientAudioLayers active={currentHotspotId === null} fadeDuration={1} />

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
        <NesEmulatorScreen romUrl={'/assets/nes/kunio-kun-soccer.nes'} position={new THREE.Vector3(...[0.4, 1, 1])} />
      )}

      {currentHotspotId === 'computer' && !isTransitioning && <WindowsPC3DScreen position={[-4.35, 1.4, -2.0]} />}

      {currentHotspotId === 'bed' && !isTransitioning && (
        <VideoGameScreen 
        position3d={new THREE.Vector3(...[-3.7, 1.55, 2])}
        rotation3d={new THREE.Euler(0, -Math.PI/4+0.07, 0)}
         />
      )}

      {/* <EffectComposer> */}
      {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
      {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
      {/* <Noise opacity={0.02} /> */}
      {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      {/* </EffectComposer> */}
      {/* <gridHelper args={[20, 20, 'white', 'gray']} position={[0, -0.01, 0]} /> */}

      {/* Controls */}
      {/* {currentHotspotId === 'bed' && (
          <OrbitControls {...ORBIT_CONTROLS_CONFIG} enableRotate={!isTransitioning} />
        )} */}
    </Canvas>
  );
}
