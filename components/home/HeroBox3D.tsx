import { Box, useColorMode } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import RaidenModel from './RaidenModel';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera, Plane, Preload } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function HeroBox3D() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { colorMode } = useColorMode();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <Box zIndex={10} w="100%" h="100%" position={'fixed'} top={'0%'} right={'0%'} style={{ pointerEvents: 'none' }}>
      {/* <Box bg='whiteAlpha.100'> */}
      <Canvas gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} style={{ pointerEvents: 'none' }}>
        {colorMode === 'light' && (
          <>
            <pointLight position={[10, 10, 10]} intensity={2} />
            <directionalLight position={[10, 10, 10]} intensity={5} />
            <directionalLight position={[0, 1, 2]} intensity={5} />
          </>
        )}

        {/* Dim ambient light to set the dark base */}
        {colorMode === 'dark' && (
          <>
            <ambientLight intensity={10} color="#555555" />
            {/* // magenta */}
            <pointLight intensity={50} color="#ff0088" position={[2, 4, 2]} />
            {/* // cyan */}
            <pointLight intensity={50} color="#00ffff" position={[-2, 4, -2]} />
            {/* // purple/violet */}
            <spotLight intensity={50} color="#ff00ff" position={[0, 5, 0]} angle={0.3} penumbra={0.5} />
          </>
        )}

        <primitive object={new THREE.WebGLRenderer({ logarithmicDepthBuffer: true })} />
        <RaidenModel position={new THREE.Vector3(0, 0, 0)} />

        <Preload all />

        <PerspectiveCamera
          makeDefault
          position={[1, 1.5, 2]}
          fov={30}
          near={0.5}
          far={100}
          rotation={[0, Math.PI / 4, 0]}
        />
        {/* <PerspectiveCamera makeDefault position={[0, 0.9, 5]} fov={30} near={0.5} far={100} /> */}
        {/* <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <meshStandardMaterial color="gray" />
        </Plane>        
        <gridHelper args={[20, 20, 'white', 'gray']} position={[0, -0.01, 0]} /> */}
        {/* <OrbitControls/> */}
      </Canvas>
    </Box>
  );
}
