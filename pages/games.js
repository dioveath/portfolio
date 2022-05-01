import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import Card from '../components/Card.js';
import {
  Flex,
  Grid,
  Box,
  Link,
  Text
} from '@chakra-ui/react';
import { FaUnity, FaNode, FaGooglePlay } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiJavascript, SiCsharp, SiNextdotjs, SiHeroku, SiItchdotio, SiNetlify, SiApachecordova, SiDocker, SiCplusplus } from 'react-icons/si';
import { GoBrowser } from 'react-icons/go';
import { CgSoftwareDownload } from 'react-icons/cg';
import { VscTerminalCmd } from 'react-icons/vsc';

import Footer from '../components/Footer.js';

export default function Works(){
  
  return (
    <>
      <Head>
        <title> Saroj Rai | Works </title>
        <meta name="description" content="Saroj Rai | Works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar path="/games"/>

      <Box
        minHeight="100vh"
        padding={{base: "4rem 2rem", md: "4rem 4rem", xl:"4rem 20rem"}}>      
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="4rem 0"
          minHeight="100vh">

          <Text fontSize="2xl" fontWeight="500"> Game Development </Text>          
          <Grid templateColumns={{sm: 'repeat(1, 1fr)', md:'repeat(2, 1fr)'}} gap="2rem 5rem">

            <Card
              imgSrc="assets/cozzle.png"
              alt="Cozzle Menu"
              title="Cozzle"
              desc="Duality Themed Puzzle Two characters are bounded to one control but in reverse. We will face interesting puzzles on the way."
              liveLink={
                <Link
                  target="_blank"
                  href="https://dioveath.itch.io/cozzle"
                  _hover={{cursor: "pointer"}}> <SiItchdotio size="28"/></Link>
              }
              gitLink="https://github.com/dioveath/gamejam2022-duality"
              techStack={<Flex gap="1rem">
                           <FaUnity size="28"/>
                           <SiCsharp size="28"/>
                         </Flex>}
            />

            <Card
              imgSrc="assets/sudoku_mania.png"
              alt="Sudoku Mania Home"
              title="Sudoku Mania"
              desc="Sudoku for everyone to solve, complete & compete with League like features."
              liveLink={
                <Link
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.charichagamestudio.sudokumania"> <FaGooglePlay size="28"/> </Link>
              }
              gitLink="https://github.com/dioveath/sudokumania"
              techStack={<Flex gap="1rem">
                           <FaUnity size="28"/>
                           <SiFirebase size="28"/>
                           <SiCsharp size="28"/>
                           <SiJavascript size="28"/>                           
                         </Flex>}
            />



            <Card
              imgSrc="assets/battle_tank.webp"
              alt="Battle Tank Classic 2018"
              title="Battle Tank Classic 2018"
              desc="Roll up your sleeves and SCREAM and annihilate, smash, shatter, blast, liquidate. Because there is no way, they're messing with you!"
              liveLink={
                <Link
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.charicha.tankbattleclassic2018">
                  <FaGooglePlay size="28"/> </Link>
              }
              gitLink="https://github.com/dioveath/ci-website-nextjs"
              techStack={<Flex gap="1rem">
                           <SiJavascript size="28"/>
                           <SiApachecordova size="28"/>
                         </Flex>}               
            />

            <Card
              imgSrc="assets/fly_with_me.png"
              alt="Fly with me"
              title="Fly with me"
              desc="You are flying in this world where nothing seems right!"
              liveLink={
                <Link
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.charicha.tankbattleclassic2018">
                  <GoBrowser size="28"/> </Link>
              }
              gitLink="https://github.com/dioveath/global-game-jam-2018"
              techStack={<Flex gap="1rem">
                           <SiJavascript size="28"/>
                         </Flex>}               
            />

            <Card
              imgSrc="assets/works/zombie_town.png"
              alt="Zombie Town"
              title="Zombie Town"
              desc="Apocalyptic top down shooter! Destroy as many zombies as you can to clean up zombie town."
              liveLink={
                <Link
                  target="_blank"
                  href="https://dioveath.itch.io/zombie-town">
                  <SiItchdotio size="28"/> </Link>
              }
              gitLink="https://github.com/dioveath/zombie-town"
              techStack={<Flex gap="1rem">
                           <FaUnity size="28"/>
                           <SiCsharp size="28"/>                           
                         </Flex>}
            />


            

          </Grid>        
        </Flex>
      </Box>
      <Footer/>
    </>
  );

}
