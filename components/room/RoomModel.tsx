import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef } from 'react';

export const RoomModel: React.FC = () => {
  const gltf = useLoader(GLTFLoader, '/assets/room/scene.gltf');
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    gltf.scene.traverse((node) => {
      if(node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }     
    })
  }, [])

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={[1, 1, 1]} position={[0, 0, 0]} castShadow receiveShadow />
      {/* Circle Platform */}
      {/* <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]} // rotate so it's flat on the XZ plane
        position={[0, -0.21, 0]} // slightly below the room model
      >
        <circleGeometry args={[8, 128]} />
        <meshStandardMaterial
          color={'#ffa500'}
          roughness={0.8}
          metalness={0.2}
          emissive={'#ffa500'}
          emissiveIntensity={0.7}
        />
      </mesh> */}
    </group>
  );
};
