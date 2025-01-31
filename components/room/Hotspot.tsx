import { useState } from 'react';
import { Html } from '@react-three/drei';
import { Hotspot as HotspotType } from './types';

interface HotspotProps extends Omit<HotspotType, 'cameraPosition'> {
  onClick: (id: string) => void;
}

const labelStyles = {
  background: 'rgba(0,0,0,0.8)',
  padding: '5px 10px',
  borderRadius: '5px',
  color: 'white',
  transform: 'scale(0.5)',
  pointerEvents: 'none' as const,
};

export const Hotspot = ({ position, name, onClick, id }: HotspotProps) => {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
  };

  return (
    <group position={position}>
      <mesh onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={() => onClick(id)}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color={hovered ? '#ff0000' : '#ffffff'} transparent opacity={0.6} />
      </mesh>
      <Html position={[0, 0.5, 0]} center style={{ pointerEvents: 'none' }}>
        <div
          style={{
            ...labelStyles,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
};
