// LoaderOverlay.tsx
import React, { useEffect } from 'react';
import { useProgress, Html } from '@react-three/drei';
import { Spinner } from '@chakra-ui/react';

interface LoaderOverlayProps {
  onLoaded: () => void;
}

const LoaderOverlay: React.FC<LoaderOverlayProps> = ({ onLoaded }) => {
  const { active, progress, errors, item } = useProgress();

  useEffect(() => {
    if (progress >= 100) {
      onLoaded();
    }
  }, [progress, onLoaded]);

  // You can style this however you like.
  // Here, we simply center text in the 3D canvas.
  return (
    <Html center>
      <div style={{ color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px' }}>
      <Spinner size="xl" />
        <div style={{ marginBottom: '0.5rem' }}>Loading: {progress.toFixed(2)}%</div>
        {active && <div>Currently loading: {item}</div>}
        {errors.length > 0 && <div style={{ color: 'red' }}>Errors occurred while loading assets.</div>}
      </div>
    </Html>
  );
};

export default LoaderOverlay;
