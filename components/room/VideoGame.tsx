import React, { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import Game from '../../lib/game/game';
import LoadingScene from '../../lib/loading_scene';
import Fonts from '../../config/fonts';

type VideoGameScreenProps = {
  position3d: THREE.Vector3;
};

export function VideoGameScreen({ position3d }: VideoGameScreenProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  // add a observer to the htmlcanvaselement with id video-game-canvas
  const observer = useMemo(
    () =>
      new MutationObserver(() => {
        const c = document.getElementById('video-game-canvas') as HTMLCanvasElement;
        if (c) setCanvas(c);
      }),
    []
  );

  useEffect(() => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [observer]);

  useEffect(() => {
    if (!canvas) {
      const c = document.createElement('canvas');
      c.id = 'video-game-canvas';
      c.style.display = 'none';
      // c.style.position = 'absolute';
      // c.style.top = '50%';
      // c.style.left = '50%';
      // c.style.transform = 'translate(-50%, -50%)';
      // c.style.zIndex = '100';
      document.body.appendChild(c);
      setCanvas(c);
    }
  }, []);

  useEffect(() => {
    if (canvas === null) return;
    const screenWidth = 960;
    const screenHeight = 720;

    let game: Game = new Game('Saroj Rai | Games', canvas.id, screenWidth, screenHeight); // FIXME: 1 pixel off
    let startScene: LoadingScene = new LoadingScene(game, 'Loading Scene', screenWidth, screenHeight);
    game.addScene(startScene);
    game.startGame();

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.anisotropy = 0;
    tex.generateMipmaps = false;
    game.setCanvasTexture(tex);
    setTexture(tex);

    return () => {
      if (game !== undefined) {
        game.destroy();
        canvas.remove();
      }
    };
  }, [canvas]);

  return (
    <>
      <Fonts />
      <mesh position={position3d}>
        <planeGeometry args={[2, 1.5]} />
        {texture === null ? null : <meshBasicMaterial map={texture} />}
      </mesh>
    </>
  );
}
