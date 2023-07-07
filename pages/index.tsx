import Head from "next/head";
import { BsGithub, BsTwitter, BsLinkedin, BsYoutube } from "react-icons/bs";
import Navbar from "../components/Navbar.js";
import Card from "../components/Card.js";

import { FaUnity, FaNode, FaGooglePlay, FaInstagram } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiJavascript,
  SiCsharp,
  SiNextdotjs,
  SiHeroku,
  SiItchdotio,
  SiNetlify,
  SiApachecordova,
  SiDocker,

} from "react-icons/si";

import { VscAzure } from 'react-icons/vsc';

import {
  Box,
  Text,
  Flex,
  Wrap,
  Grid,
  Link,
  UnorderedList,
  ListItem,
  Image,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

import Footer from "../components/Footer.js";
import FreeQuoteModal from "../components/FreeQuoteModal";

export default function Home() {
  return (
    <>
      <Head>
        <title> Saroj Rai </title>
        <meta
          name="description"
          content="Saroj Rai | Game Developer | Full Stack Developer "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Box
        minHeight="100vh"
        padding={{ base: "4rem 2rem", md: "4rem 4rem", xl: "4rem 20rem" }}
      >
        <Box height="2rem"></Box>
        <Box
          padding={"1rem 2rem"}
          borderRadius="0.4rem"
          shadow="sm"
          bg={useColorModeValue("gray.200", "darkviolet")}
        >
          <Text fontSize="lg" textAlign="center">
            Game developer and Full stack developer. I love building and
            integrating wheels in systems.
          </Text>
        </Box>

        <Box height="2rem"></Box>

        <Flex justifyContent="space-between" alignItems={"center"}>
          <Box>
            <Text fontSize="3xl" fontWeight="600">
              Saroj Rai
            </Text>
            <Text fontSize="xl" fontWeight="400">
              Game Developer x Full Stack Developer
            </Text>
          </Box>
          <Image
            alt="Saroj Avatar"
            src="assets/profile.png"
            height="200px"
          />
        </Flex>

        <Box height="1rem" borderBottom="1px solid gray"></Box>
        <Box height="2rem"></Box>

        {/* <FreeQuoteModal /> */}
        <Flex justifyContent={"center"} alignItems={"center"}>
            <Link href={"mailto:raisaroj360@gmail.com?Subject=Hey%20Rai%2C%20Need%20a%20Quick%20Quote%20for%20My%20Project&body=Greetings%20Rai%2C%20%0A%0AMy%20name%20is%20_____________.%20I%20am%20from%20__________.%0AI%20am%20planning%20to%20build%20________%28website%2Fapp%2Fgame%29.%20My%20budget%20for%20the%20project%20is%20____________.%0AAnd%20it%20should%20be%20able%20to%2C%0A1.%20%0A2.%20%0A3.%20%0A%0AHopefully%2C%20if%20this%20requirement%20fits%20with%20your%20working%20rate%2C%20I%27d%20love%20to%20you%20to%20build%20my%20project.%0A%0AThanks%0A___________%0A"} > 
            <Button color={"white"} background={"#9400d3"} variant="outline" size="lg">
            Get a Free Quote on Your Next Project
            </Button>
            </Link>
        </Flex>
        

        <Box height="2rem"></Box>        
        <Box>
          <Text as="u" fontSize="xl" fontWeight="500">
            Intro
          </Text>
          <Box height="0.5rem"></Box>
          <Text fontSize="lg" letterSpacing="0.04rem">
            I am Game Developer and Full-stack Engineer. I have keen eyes for
            aesthetics, design ideas, system architecture. I love creating games
            and working with systems.
          </Text>
          <Box height="1rem"></Box>
          <Text>Other than my work, I love to,</Text>
          <Box height="1rem"></Box>
          <UnorderedList>
            <ListItem> Play Football </ListItem>
            <ListItem> Play Guitar </ListItem>
            <ListItem> Sketch Random dudes </ListItem>
            <ListItem>
              {" "}
              Play Video games at a competitive level, FIFA, PUBG Mobile{" "}
            </ListItem>
          </UnorderedList>
        </Box>

        <Box height="2rem"></Box>
        <Text fontSize="xl" fontWeight="500">
          {" "}
          Find me on{" "}
        </Text>
        <Box height="1rem"></Box>
        <Wrap spacing="4rem">
          <Link target="_blank" href="https://github.com/dioveath">
            <BsGithub size={30} />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/saroj-rai-11739a110/"
          >
            <BsLinkedin size={30} />
          </Link>
          <Link target="_blank" href="https://dioveath.itch.io">
            <SiItchdotio size={30} />
          </Link>
          <Link target="_blank" href="https://twitter.com/dioveath">
            <BsTwitter size={30} />
          </Link>
          <Link
            target="_blank"
            href="https://www.youtube.com/channel/UCoaAC-D62Vl9b2X2WMeUtgw"
          >
            <BsYoutube size={30} />
          </Link>
          <Link target="_blank" href="https://www.instagram.com/dioveath0/">
            <FaInstagram size={30} />
          </Link>
        </Wrap>

        <Box height="8rem"></Box>
        <Text fontSize="lg" fontWeight="500">
          {" "}
          Highlight Works{" "}
        </Text>
        <Box height="1rem"></Box>

        <Grid templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}>
          <Card
            imgSrc="assets/chc_gaming_landing.png"
            alt="Charicha Gaming Landing Page"
            title="Charicha Gaming"
            desc="Gaming community site, focused on Competitive scene. i.e. Tournaments, Leagues, Challenges, etc"
            liveLink={
              <Link
                target="_blank"
                href="https://chcgaming.azurewebsites.net/"
                _hover={{ cursor: "pointer" }}
              >
                <VscAzure size="28" />
              </Link>
            }
            gitLink="https://github.com/dioveath/chc-gaming"
            techStack={
              <Flex gap="1rem">
                <SiJavascript size="28" />
                <SiReact size="28" />
                <FaNode size="28" />
                <SiExpress size="28" />
                <SiMongodb size="28" />
                <SiDocker size="28" />
              </Flex>
            }
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
                _hover={{ cursor: "pointer" }}
              >
                {" "}
                <SiItchdotio size="28" />
              </Link>
            }
            gitLink="https://github.com/dioveath/gamejam2022-duality"
            techStack={
              <Flex gap="1rem">
                <FaUnity size="28" />
                <SiCsharp size="28" />
              </Flex>
            }
          />
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
