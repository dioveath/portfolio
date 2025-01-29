import Head from 'next/head';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import { Box, Text, Flex, Wrap, UnorderedList, ListItem, Image, useColorModeValue, Grid } from '@chakra-ui/react';
import Footer from '../components/Footer.js';
import FreeQuoteModal from '../components/FreeQuoteModal';
import Link from 'next/link';
import works from '../data/work_data';
import WorkCard from '../components/WorkCard';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Saroj Rai | Full Stack Engineer & AI Developer</title>
        <meta
          name="description"
          content="Full Stack Engineer specializing in AI-powered solutions, SaaS platforms, and scalable systems. Expert in TypeScript, Python, and LLM technologies. Available for hire."
        />
        <meta
          name="keywords"
          content="Full Stack Engineer, Software Engineer, AI Developer, TypeScript, Python, LLM, Portfolio, Tech Stack, For Hire, Software Development, Web Development, AI Solutions"
        />
        <meta name="author" content="Saroj Rai" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph tags for social media */}
        <meta property="og:title" content="Saroj Rai | Full Stack Engineer & AI Developer" />
        <meta
          property="og:description"
          content="Full Stack Engineer specializing in AI-powered solutions, SaaS platforms, and scalable systems. Expert in TypeScript, Python, and LLM technologies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/profile.png" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Saroj Rai | Full Stack Engineer & AI Developer" />
        <meta
          name="twitter:description"
          content="Full Stack Engineer specializing in AI-powered solutions and scalable systems. Available for hire."
        />
        <meta name="twitter:image" content="/assets/profile.png" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://sarojrai.com" />
      </Head>

      <Navbar />

      <Box as="main" minHeight="100vh" padding={{ base: '4rem 2rem', md: '4rem 4rem', xl: '4rem 20rem' }}>
        <MotionBox {...fadeInUp}>
          <Box
            marginTop={'8'}
            padding={{
              base: '1rem',
              md: '1.5rem 2.5rem',
            }}
            borderRadius="lg"
            shadow="md"
            bg={useColorModeValue('red.500', 'red.800')}
            color="white"
            transition="all 0.3s ease"
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
          >
            <Text fontSize={{ base: 'md', md: 'lg' }} textAlign="center" lineHeight="tall">
              Full Stack Engineer specializing in AI-powered solutions and SaaS platforms
            </Text>
          </Box>
        </MotionBox>

        <Box height="1rem" />

        <MotionFlex justifyContent="space-between" alignItems="center" {...fadeInUp}>
          <Box>
            <MotionText
              fontSize="4xl"
              fontWeight="700"
              bgGradient="linear(to-r, red.400, red.700)"
              bgClip="text"
              {...fadeInUp}
            >
              Saroj Rai
            </MotionText>
            <MotionText fontSize="xl" fontWeight="500" color={useColorModeValue('gray.600', 'gray.300')} {...fadeInUp}>
              Full Stack Engineer
            </MotionText>
          </Box>
          <Image
            alt="Saroj Avatar"
            src="assets/profile.png"
            height={{
              base: '160px',
              md: '200px',
            }}
            borderRadius="full"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </MotionFlex>

        <Box height="1px" my="8" bgGradient="linear(to-r, transparent, gray.500, transparent)" />

        <MotionBox {...stagger}>
          {/* <FreeQuoteModal /> */}
          <MotionBox {...fadeInUp}>
            <Text fontSize={{ base: 'md', md: 'lg' }} letterSpacing="wide" mb="6" fontWeight={'normal'}>
              I build robust, scalable systems using modern tools (Typescript/Python/LLMs), merging technical expertise
              with AI innovation to deliver powerful solutions and real-world results.
            </Text>

            <Text fontWeight="500" mb="4">
              I&apos;ve:
            </Text>
            <UnorderedList spacing="0.5" stylePosition="inside">
              <ListItem>✔️ Shipped SaaS apps used by 1,000+ users</ListItem>
              <ListItem>
                ✔️ Designed enterprise SaaS solution for businessess that manages 100k+ requests per month
              </ListItem>
              <ListItem>✔️ Built AI-powered tools for process automation cutting operations time by 30%</ListItem>
            </UnorderedList>

            <Text fontWeight="500" mt="6" mb="4">
              Why tech leaders choose me:
            </Text>
            <UnorderedList spacing="0.5" stylePosition="inside">
              <ListItem>
                🚀 Entrepreneurial mindset: Launched 2 tech ventures while mastering full-stack development{' '}
                <Text as="span" fontSize="sm" color="gray.500">
                  (self-funded)
                </Text>
              </ListItem>
              <ListItem>🤖 AI fluency: Design LLM-enhanced apps and RAG systems, (LangChain/OpenAI/Pinecone)</ListItem>
              <ListItem>⚡ Rapid execution: Deliver MVP-to-scale solutions 40% faster than agency benchmarks</ListItem>
            </UnorderedList>
          </MotionBox>
        </MotionBox>

        <Box height="2rem" />

        <MotionBox {...fadeInUp}>
          <Text fontSize="xl" fontWeight="600" mb="4">
            Find me on
          </Text>
          <Wrap spacing="4rem">
            <Link href="https://github.com/dioveath" target="_blank">
              <Box
                as={BsGithub}
                size={30}
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-2px)', color: 'blue.400' }}
              />
            </Link>
            <Link href="https://www.linkedin.com/in/saroj-rai-11739a110/" target="_blank">
              <Box
                as={BsLinkedin}
                size={30}
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-2px)', color: 'blue.400' }}
              />
            </Link>
          </Wrap>
        </MotionBox>

        <Box height="4rem" />

        <MotionBox {...fadeInUp}>
          <Text fontSize="2xl" fontWeight="600" mb="6">
            Featured Works
          </Text>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            {works.slice(0, 2).map((work, index) => (
              <WorkCard key={index} work={work} />
            ))}
          </Grid>
        </MotionBox>
      </Box>

      <Footer />
    </>
  );
}
