// WindowsPC3DScreen.tsx
import React from 'react';
import { Html } from '@react-three/drei';

export function WindowsPC3DScreen({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    // The 'transform' prop allows the HTML to receive 3D transformations.
    // 'occlude' helps with depth occlusion if needed.
    <Html
      transform
      occlude
      position={position}
      // Adjust the scale so that the iframe appears at the desired size.
      scale={[0.5, 0.5, 1]}
      // 'distanceFactor' controls how the HTML scales with distance. Adjust as needed.
      distanceFactor={1}
    >
      <iframe
        src="http://localhost:3000"
        title="Windows PC"
        style={{ width: '1280px', height: '1024px', border: 'none' }}
      />
    </Html>
  );
}

export default WindowsPC3DScreen;
