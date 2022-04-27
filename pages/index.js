import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { BsGithub, BsTwitter, BsLinkedin, BsYoutube} from 'react-icons/bs';
import { MdConstruction } from 'react-icons/md';
import { CgMediaLive } from 'react-icons/cg';
import Navbar from '../components/Navbar.js';
import Card from '../components/Card.js';

import { FaUnity, FaNode, FaGooglePlay } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiJavascript, SiCsharp, SiNextdotjs, SiHeroku, SiItchdotio, SiNetlify, SiApachecordova, SiDocker } from 'react-icons/si';

import {
  Box,
  Text,
  Flex,
  Grid,
  GridItem,
  Link,
  UnorderedList,
  ListItem,
  Stack,
  Image,
  useColorModeValue
} from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title> Saroj Rai </title>
        <meta name="description" content="Saroj Rai | Portfolio Website | Full Stack Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>

      <Box
        minHeight="100vh"
        padding={{base: "4rem 2rem", md: "4rem 4rem", xl:"4rem 20rem"}}>

        <Box height="2rem"></Box>
        <Box
          padding={"1rem 2rem"}
          borderRadius="0.4rem"
          bg={useColorModeValue('gray.200', 'darkviolet')}>
          <Text fontSize="lg">
            Game developer and Full stack developer. I love building and integrating wheels in systems. 
          </Text>          
        </Box>

        <Box height="2rem"></Box>

        <Box>
          <Text fontSize="3xl" fontWeight="600"> Saroj Rai </Text>
          <Text fontSize="xl" fontWeight="400"> dioveath (Game Developer / Full Stack Developer) </Text>                  
        </Box>

        <Box height="1rem"></Box>
        <Box>
          <Text fontSize="xl" fontWeight="500"> Intro </Text>
          <Box height="0.5rem"></Box>          
          <Text
            fontSize="lg"
            letterSpacing="0.04rem">
            I am Game Developer and Full-stack Engineer. I have keen eyes for aesthetics, design ideas, as well as on the architecture of the system. I love creating games and working with systems.
          </Text>
          <Box height="1rem"></Box>          
          <Text>
            Other than my work, I love to,             
          </Text>
          <Box height="1rem"></Box>                    
          <UnorderedList>
            <ListItem> Play Guitar </ListItem>
            <ListItem> Draw sketches </ListItem>
            <ListItem> Play Football </ListItem>
            <ListItem> Play Video games at a competitive level, FIFA, PUBG Mobile </ListItem>
          </UnorderedList>
          
        </Box>

        <Box height="2rem"></Box>
        <Text fontSize="xl" fontWeight="500"> Find me on </Text>
        <Box height="1rem"></Box>
        <Flex gap="4rem">
          <Link target="_blank" href="https://github.com/dioveath"><BsGithub size={30}/></Link>
          <Link target="_blank" href="https://www.linkedin.com/in/saroj-rai-11739a110/"><BsLinkedin size={30}/></Link>
          <Link target="_blank" href="https://dioveath.itch.io"><SiItchdotio size={30}/></Link>          
          <Link target="_blank" href="https://twitter.com/dioveath"><BsTwitter size={30}/></Link>          
          <Link target="_blank" href="https://www.youtube.com/channel/UCoaAC-D62Vl9b2X2WMeUtgw"><BsYoutube size={30}/></Link>
        </Flex>

        <Box height="8rem"></Box>        
        <Text fontSize="lg" fontWeight="500"> Highlight Works </Text>
        <Box height="1rem"></Box>                

        <Grid templateColumns={{sm: 'repeat(1, 1fr)', md:'repeat(2, 1fr)'}}>

          <Card
            imgSrc="assets/chc_gaming_landing.png"
            alt="Charicha Gaming Landing Page"
            title="Charicha Gaming"
            desc="Gaming community site, focused on Competitive scene. i.e. Tournaments, Leagues, Challenges, etc"
            liveLink={
              <Link
                target="_blank"
                href="https://chc-gaming.herokuapp.com/"
                _hover={{cursor: "pointer"}}> <SiHeroku size="28"/></Link>                          }
            gitLink="https://github.com/dioveath/chc-gaming"
            techStack={<Flex gap="1rem">
                                 <SiJavascript size="28"/>
                                 <SiReact size="28"/>
                                 <FaNode size="28"/>
                                 <SiExpress size="28"/>
                         <SiMongodb size="28"/>
                         <SiDocker size="28"/>
                               </Flex>}                          
          />

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

        </Grid>
      </Box>

      <footer className={styles.footer}>
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          color="whitealpha.50"
        >
          Copyright &copy; 2022 Saroj Rai. All Rights Reserved
          <span className={styles.logo}>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </span>
        </Link>
      </footer>
    </>
  );
}
