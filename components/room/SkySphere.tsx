import React, { useEffect, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function SkySphere({ texturePath = '/assets/3d/sky.jpg', radius = 100, widthSegments = 60, heightSegments = 40 }) {
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const { camera } = useThree();
  const meshRef = useRef<THREE.Mesh | null>(null);

  // If your image is an equirectangular panorama,
  // uncomment the next line to ensure correct mapping:
  texture.mapping = THREE.EquirectangularReflectionMapping;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(camera.position);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, widthSegments, heightSegments]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

export default SkySphere;
