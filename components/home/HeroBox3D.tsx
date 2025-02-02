import { Box } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import RaidenModel from './RaidenModel';
import * as THREE from 'three';
import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei';
import { useEffect, useState } from 'react';

export default function HeroBox3D() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <Box zIndex={10} w="100%" h="100%" position={'fixed'} top={'0%'} right={'0%'}>
    {/* <Box bg='whiteAlpha.100'> */}
      <Canvas shadows gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }} style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={5} args={['#ffffff', 1]} />
        <pointLight position={[10, 10, 10]} intensity={2} castShadow />
        <directionalLight castShadow position={[10, 10, 10]} intensity={5} />
        <directionalLight castShadow position={[0, 1, 2]} intensity={5} />
        <primitive object={new THREE.WebGLRenderer({ logarithmicDepthBuffer: true })} />

        <RaidenModel position={new THREE.Vector3(0, 0, 0)} />

        <PerspectiveCamera makeDefault position={[1, 1.5, 2]} fov={30} near={0.5} far={100} rotation={[0, Math.PI/4, 0]}/>
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
