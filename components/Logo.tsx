import Link from 'next/link';
import Image from 'next/image';
import { Text, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRef, useEffect } from 'react';
import Game from '../lib/game/game';
import LogoScene from '../scenes/logo_scene';
import Scene from '../lib/game/scene';

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;

  line-height: 20px;
  padding: 10px;

  img {
    transition: 200ms ease;
  }

  &:hover img {
    transform: rotate(20deg);
  }
`;

const Logo = () => {

  const canvas = useRef(null);

  useEffect(() => {

    if(canvas.current === null) return;

      let game: Game = new Game("Saroj Rai", canvas.current.id, 40, 40);
      let logoScene: LogoScene = new LogoScene(game, "Logo Scene", game.width, game.height);

      game.addScene(logoScene);
      game.startGame();

      return () => {
	  if(game !== undefined) {
	      game.destroy();
	  }
      };
      
  }, []);
  
  // const footPrintImg = `/images/footprint${useColorModeValue('', '-dark')}.png`;

  return (
    <Link href="/" scroll={false}>
      <a>
          <LogoBox>
	  <canvas id="logoCanvas" ref={canvas} style={{ zIndex: 100}}></canvas>
          <Text
            color={useColorModeValue('gray.800', 'whiteAlpha.900')}
            fontFamily='Consolas, sans-serif'
            fontWeight="bold"
            ml={3}
          >
            Saroj Rai
          </Text>
        </LogoBox>
      </a>
    </Link>
  );
};

export default Logo;
