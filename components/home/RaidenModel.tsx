import { useGlobalMouse } from '@/utils/hooks/useGlobalMouse';
import { useInput } from '@/utils/hooks/useInput';
import { AnimationStateMachine } from '@/utils/three/AnimationStateMachine';
import { useAnimations } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

interface RaidenModelProps {
  position: THREE.Vector3;
}

export default function RaidenModel({ position }: RaidenModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  return (
    <group ref={groupRef} position={position}>
      <ModelInstance />
    </group>
  );
}

const ModelInstance = () => {
  const gltf = useLoader(GLTFLoader, '/assets/3d/raiden.glb');
  const clonedScene = useMemo(() => clone(gltf.scene), [gltf]);
  const { actions, mixer } = useAnimations(gltf.animations, clonedScene);
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const mouseRef = useGlobalMouse();
  const stateMachineRef = useRef<AnimationStateMachine | null>(null);
  const input = useInput();

  useEffect(() => {
    clonedScene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = false;
        node.receiveShadow = false;
      }
    });

    const armature = clonedScene.getObjectByName('Armature');
    if (armature) {
      const headBone = armature.getObjectByName('mixamorigHead');
      if (headBone) {
        headBoneRef.current = headBone;
      } else {
        console.warn('Head bone not found in armature');
      }
    } else {
      console.warn('Armature not found');
    }

    if (actions && mixer) {
      const availableActions: { [key: string]: THREE.AnimationAction } = {};
      gltf.animations.forEach((animation) => {
        const action = actions[animation.name];
        console.log("animation: ", animation.name)
        if (action) {
          availableActions[animation.name] = action;
        }
      })

      stateMachineRef.current = new AnimationStateMachine(mixer, availableActions, 'idle');

      stateMachineRef.current.addTransition({
        from: ['idle'],
        to: 'kneeling_down',
        condition: (input) => input.keys['Control'],
        blendDuration: 0.2,
        loop: false,
        lockUntilFinished: true,
      });

      stateMachineRef.current.addTransition({
        from: ['kneeling_down'],
        to: 'kneeling_to_standing',
        condition: (input) => input.keys[' '],
        blendDuration: 0.2,
        loop: false,
        lockUntilFinished: true,
      })

      stateMachineRef.current.addTransition({
        from: ['kneeling_to_standing'],
        to: 'idle',
        condition: (_input) => true,
        blendDuration: 0.7,
        loop: true
      })
      
      
    }

    // if(actions["idle"]){
    //   actions["idle"].setLoop(THREE.LoopRepeat, Infinity)
    //   actions["idle"].play()
    // }
  }, [actions, clonedScene]);

  useFrame(() => {
    if (headBoneRef.current && mouseRef.current) {
      const maxRotation = 1;
      headBoneRef.current.rotation.y = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.y,
        mouseRef.current.x * maxRotation,
        0.1
      );
      headBoneRef.current.rotation.x = THREE.MathUtils.lerp(
        headBoneRef.current.rotation.x,
        -mouseRef.current.y * maxRotation,
        0.1
      );
    }

    if (stateMachineRef.current) {
      stateMachineRef.current.update(input);
    }
  });

  return <primitive object={clonedScene} scale={1} />;
};
