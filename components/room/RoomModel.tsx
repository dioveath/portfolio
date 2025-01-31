import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef } from 'react';

export const RoomModel: React.FC = () => {
  const gltf = useLoader(GLTFLoader, '/assets/room/scene.gltf');
  const group = useRef<THREE.Group>(null);

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={[1, 1, 1]} position={[0, 0, 0]} />
    </group>
  );
};
