import Head from 'next/head';
import styles from '../../styles/Games.module.css';

import Navbar from '../../components/Navbar';
import Fonts from '../../config/fonts.js';

import { useRef, useEffect } from 'react';
import Game from '../../lib/game/game';
import LoadingScene from '../../lib/loading_scene';

export default function Games() {
  const canvas = useRef(null);

  useEffect(() => {
    if (canvas.current === null) return;

    let game: Game = new Game('Saroj Rai | Games', canvas.current.id, window.innerWidth - 1, window.innerHeight - 1); // FIXME: 1 pixel off
    let startScene: LoadingScene = new LoadingScene(game, 'Loading Scene', window.innerWidth, window.innerHeight);
    game.addScene(startScene);
    game.startGame();

    return () => {
      if (game !== undefined) {
        game.destroy();
      }
    };
  }, []);

  return (
    <>
      <Fonts />
      <Head>
        <title> Saroj Rai | Games </title>
        <meta name="description" content="Saroj Rai | Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar path="/enterBase" />
      <canvas className={styles.canvas} ref={canvas} id="canvas"></canvas>
    </>
  );
}