import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import Game from '../../lib/game/game';
import LoadingScene from '../../lib/loading_scene';
import Fonts from '../../config/fonts';

type VideoGameScreenProps = {
  position3d: THREE.Vector3;
  rotation3d?: THREE.Euler;
};

export function VideoGameScreen({ position3d, rotation3d = new THREE.Euler() }: VideoGameScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      const c = document.createElement('canvas');
      c.id = 'video-game-canvas';
      c.style.display = 'none';
      // c.style.position = 'absolute';
      // c.style.top = '50%';
      // c.style.left = '50%';
      // c.style.transform = 'translate(-50%, -50%)';
      // c.style.zIndex = '100';
      document.body.appendChild(c);
      canvasRef.current = c;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const screenWidth = 960;
    const screenHeight = 720;

    gameRef.current = new Game('Saroj Rai | Games', canvas.id, screenWidth, screenHeight); // FIXME: 1 pixel off
    let startScene: LoadingScene = new LoadingScene(gameRef.current, 'Loading Scene', screenWidth, screenHeight);
    gameRef.current.addScene(startScene);
    gameRef.current.startGame();

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 0;
    tex.generateMipmaps = false;
    gameRef.current.setCanvasTexture(tex);
    setTexture(tex);

    return () => {
      if (gameRef.current !== null) {
        gameRef.current.destroy();
      }
      if (canvasRef.current !== null) {
        canvasRef.current.remove();
        canvasRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Fonts />
      
      <mesh position={position3d} rotation={rotation3d} scale={1}>
        <planeGeometry args={[1, 0.75]} />
        {texture === null ? null : <meshBasicMaterial map={texture} />}
      </mesh>
    </>
  );
}
