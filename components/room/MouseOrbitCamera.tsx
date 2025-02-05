import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

type MouseOrbitCameraProps = {
  basePosition: THREE.Vector3;
  positionOffsetFactor: number;
  hoveringEffect: boolean;
};

export const MouseOrbitCamera = ({ basePosition, positionOffsetFactor, hoveringEffect }: MouseOrbitCameraProps) => {
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
