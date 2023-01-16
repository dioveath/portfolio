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
import { VscAzure } from 'react-icons/vsc';
import { GoBrowser } from 'react-icons/go';
import { CgSoftwareDownload } from 'react-icons/cg';
import { VscTerminalCmd } from 'react-icons/vsc';
import { MdOutlinePrivacyTip } from 'react-icons/md';

import Footer from '../components/Footer.js';

export default function Works(){
  
  return (
    <>
      <Head>
        <title> Saroj Rai | Works </title>
        <meta name="description" content="Saroj Rai | Works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar path="/works"/>

      <Box
        minHeight="100vh"
        padding={{base: "4rem 2rem", md: "4rem 4rem", xl:"4rem 20rem"}}>      
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="4rem 0"
          minHeight="100vh">


          <Text fontSize="2xl" fontWeight="500"> Full Stack Development </Text>
          <Grid templateColumns={{sm: 'repeat(1, 1fr)', md:'repeat(2, 1fr)'}} gap="2rem 5rem">
            <Card
              imgSrc="assets/chc_gaming_landing.png"
              alt="Charicha Gaming Landing Page"
              title="Charicha Gaming"
              desc="Gaming community site, focused on Competitive scene. i.e. Tournaments, Leagues, Challenges, etc"
              liveLink={
                <Link
                  target="_blank"
                  href="https://chcgaming.azurewebsites.net/"
                  _hover={{cursor: "pointer"}}> <VscAzure size="28" /></Link>
              }
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
              imgSrc="assets/works/chc_finance.png"
              alt="Charicha Internal Application "
              title="Company Management Soft."
              desc="Internal Software to help manage employees, finance, etc.. of a Company."
              liveLink={
                <Link
                  href="#"
                  _hover={{cursor: "pointer"}}> <MdOutlinePrivacyTip size="28"/></Link>
              }
              gitLink="https://github.com/dioveath/chc-wallet"
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
              imgSrc="assets/works/chc_institute.png"
              alt="Charicha Institute Landing"
              title="Charicha Institute"
              desc="Charicha Institute Official Website. Students Profiles, Blogs system, etc."
              liveLink= {
                <Link
                  target="_blank"
                  href="https://charichainstitute.com.np">
                  <SiNetlify size="28"/> </Link>
              }
      
              gitLink="https://github.com/dioveath/ci-website-nextjs"
              techStack={<Flex gap="1rem">
                           <SiNextdotjs size="28"/>
                           <SiFirebase size="28"/>
                           <SiJavascript size="28"/>                           
                         </Flex>} 
            />

            <Card
              imgSrc="assets/works/adbslogo.png"
              alt="ADBS Converter"
              title="ADBS Converter"
              desc="Quick ADBS Date Converter Tool lets you quickly convert AD date to BS date."
              liveLink={
                <Link
                  target="_blank"
                  href="https://github.com/dioveath/ad-bs-date-converter">
                  <CgSoftwareDownload size="28"/> </Link>
              }
              gitLink="https://github.com/dioveath/ad-bs-date-converter"
              techStack={<Flex gap="1rem">
                           <SiCplusplus size="28"/>
                           <VscTerminalCmd size="28"/>
                         </Flex>}
            />
          </Grid>

        </Flex>
      </Box>
      <Footer/>
    </>
  );

}
