import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CameraPosition } from './types';

interface CameraControllerProps {
  targetPosition: CameraPosition;
  onTransitionComplete?: () => void;
}

const LERP_FACTOR = 0.05;
const DISTANCE_THRESHOLD = 0.1;

export const CameraController = ({ targetPosition, onTransitionComplete }: CameraControllerProps) => {
  const { camera } = useThree();
  const currentPos = useRef(camera.position.clone());
  const currentLookAt = useRef(new THREE.Vector3());
  const isTransitioning = useRef(false);

  useEffect(() => {
    isTransitioning.current = true;
  }, [targetPosition]);

  useFrame(() => {
    if (!isTransitioning.current) return;

    const targetPos = new THREE.Vector3(...targetPosition.position);
    const targetLookAt = new THREE.Vector3(...targetPosition.lookAt);

    currentPos.current.lerp(targetPos, LERP_FACTOR);
    currentLookAt.current.lerp(targetLookAt, LERP_FACTOR);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);

    if (currentPos.current.distanceTo(targetPos) < DISTANCE_THRESHOLD) {
      isTransitioning.current = false;
      onTransitionComplete?.();
    }
  });

  return null;
};
