import { useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";


interface RaidenModelProps {
  position: THREE.Vector3;
}

export default function RaidenModel({ position }: RaidenModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  return (
    <group ref={groupRef} position={position}>
      <ModelInstance />
    </group>
  )
}

const ModelInstance = () => {
  const gltf = useLoader(GLTFLoader, '/assets/3d/raiden.glb');
  const clonedScene = useMemo(() => clone(gltf.scene), [gltf]);
  const { actions } = useAnimations(gltf.animations, clonedScene);

  useEffect(() => {
    clonedScene.traverse((node) => {
      if(node instanceof THREE.Mesh){
        node.castShadow = true
        node.receiveShadow = true
      }      
    })
    
    gltf.animations.forEach((clip) => console.log(clip.name))
    if(actions["idle"]){
      actions["idle"].setLoop(THREE.LoopRepeat, Infinity)
      actions["idle"].play()
    }
  }, [actions, clonedScene]);

  return <primitive object={clonedScene} scale={1} />;
};
