import Head from "next/head";
import Navbar from "../components/Navbar.js";
import Card from "../components/Card.js";
import { Flex, Grid, Box, Link, Text } from "@chakra-ui/react";
import { FaUnity, FaNode, FaGooglePlay } from "react-icons/fa";
import {
  SiReact,
  SiPrisma,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiJavascript,
  SiCsharp,
  SiHeroku,
  SiItchdotio,
  SiNetlify,
  SiNextdotjs,
  SiDocker,
  SiCplusplus,
  SiTypescript,
  SiGraphql,
  SiVercel,
  SiNativescript,
  SiAndroid,
  SiBluetooth,
  SiBlueprint,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { GoBrowser } from "react-icons/go";
import { CgSoftwareDownload } from "react-icons/cg";
import { VscTerminalCmd } from "react-icons/vsc";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GrGraphQl } from "react-icons/gr";

import Footer from "../components/Footer.js";
import { IoLogoGooglePlaystore } from "react-icons/io5";

export default function Works() {
  return (
    <>
      <Head>
        <title> Saroj Rai | Works </title>
        <meta name="description" content="Saroj Rai | Works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar path="/works" />

      <Box
        minHeight="100vh"
        padding={{ base: "8rem 2rem", md: "8rem 4rem", xl: "8rem 20rem" }}
      >
        <Text fontSize="2xl" fontWeight="500">
          {" "}
          Full Stack Development{" "}
        </Text>

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding="2rem 0"
          minHeight="100vh"
        >
          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap="2rem 5rem"
          >
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
              imgSrc="assets/works/oms_app.png"
              alt="OMS Android App Playstore"
              title="OMS Android App"
              desc="An Android app that can manage your order, notify new orders, print receipts, and more. It is a companion app for TastyIgniter."
              liveLink={
                <Link
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.anar.oms"
                  _hover={{ cursor: "pointer" }}
                >
                  <IoLogoGooglePlaystore size="28" />
                </Link>
              }
              gitLink="https://tastyigniter.com/marketplace/item/anar-ordermanager"
              techStack={
                <Flex gap="1rem">
                  <SiJavascript size="28" />
                  <SiReact size="28" />
                  <SiAndroid size="28" />
                  <SiBluetooth size="28" />
                </Flex>
              }
            />            
            <Card
              imgSrc="assets/works/prompters_dev.png"
              alt="prompters.dev Landing page"
              title="prompters.dev"
              desc="prompters.dev is a community with a diverse range of AI-powered tools &amp; our people share how to use those tools best."
              liveLink={
                <Link
                  target="_blank"
                  href="https://prompters.dev"
                  _hover={{ cursor: "pointer" }}
                >
                  <SiVercel size="28" />
                </Link>
              }
              gitLink="https://prompters.dev"
              techStack={
                <Flex gap="1rem">
                  <SiTypescript size="28" />
                  <SiReact size="28" />
                  <SiNextdotjs size="28" />
                  <SiMongodb size="28" />
                  <SiPrisma size="28" />
                  <SiGraphql size="28" />
                </Flex>
              }
            />
            <Card
              imgSrc="assets/works/futsal_house_land.png"
              alt="Futsal House Landing Page"
              title="Futsal House"
              desc="Futsal MatchMaking site, focused on solving match making problems with other players, teams, etc"
              liveLink={
                <Link
                  target="_blank"
                  href="https://futsalhouse.netlify.app"
                  _hover={{ cursor: "pointer" }}
                >
                  <SiNetlify size="28" />
                </Link>
              }
              gitLink="https://github.com/dioveath/futsal-house"
              techStack={
                <Flex gap="1rem">
                  <SiJavascript size="28" />
                  <SiReact size="28" />
                  <SiNextdotjs size="28" />
                  <GrGraphQl size="28" />
                  <SiPrisma size="28" />
                  <SiMongodb size="28" />
                </Flex>
              }
            />
            <Card
              imgSrc="assets/works/myukbuilder.png"
              alt="My UK Builder Landing Page"
              title="My UK Builder"
              desc="A beautiful construction company website, with a custom CMS to manage the content."
              liveLink={
                <Link
                  target="_blank"
                  href="https://www.myukbuilder.co.uk/"
                  _hover={{ cursor: "pointer" }}
                >
                  <VscAzure size="28" />
                </Link>
              }
              gitLink="https://www.myukbuilder.co.uk/"
              techStack={
                <Flex gap="1rem">
                  <SiTypescript size="28" />
                  <SiReact size="28" />
                  <SiMongodb size="28" />
                  <SiPrisma size="28" />
                  <SiGraphql size="28" />
                </Flex>
              }
            />            
            <Card
              imgSrc="assets/works/chc_finance.png"
              alt="Charicha Internal Application "
              title="Company Management Soft."
              desc="Internal Software to help manage employees, finance, etc.. of a Company."
              liveLink={
                <Link href="#" _hover={{ cursor: "pointer" }}>
                  {" "}
                  <MdOutlinePrivacyTip size="28" />
                </Link>
              }
              gitLink="https://github.com/dioveath/chc-wallet"
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
              imgSrc="assets/works/chc_institute.png"
              alt="Charicha Institute Landing"
              title="Charicha Institute"
              desc="Charicha Institute Official Website. Students Profiles, Blogs system, etc."
              liveLink={
                <Link target="_blank" href="https://charichainstitute.com.np">
                  <SiNetlify size="28" />{" "}
                </Link>
              }
              gitLink="https://github.com/dioveath/ci-website-nextjs"
              techStack={
                <Flex gap="1rem">
                  <SiNextdotjs size="28" />
                  <SiFirebase size="28" />
                  <SiJavascript size="28" />
                </Flex>
              }
            />

            <Card
              imgSrc="assets/works/adbslogo.png"
              alt="ADBS Converter"
              title="ADBS Converter"
              desc="Quick ADBS Date Converter Tool lets you quickly convert AD date to BS date."
              liveLink={
                <Link
                  target="_blank"
                  href="https://github.com/dioveath/ad-bs-date-converter"
                >
                  <CgSoftwareDownload size="28" />{" "}
                </Link>
              }
              gitLink="https://github.com/dioveath/ad-bs-date-converter"
              techStack={
                <Flex gap="1rem">
                  <SiCplusplus size="28" />
                  <VscTerminalCmd size="28" />
                </Flex>
              }
            />
          </Grid>
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
