import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Flex, Grid, Box, Text } from '@chakra-ui/react';

import Footer from '../components/Footer';
import WorkCard from '../components/WorkCard';
import games from '../data/games_data';

export default function Works() {
  return (
    <>
      <Head>
        <title> Saroj Rai | Works </title>
        <meta name="description" content="Saroj Rai | Works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar path="/games" />

      <Box minHeight="100vh" padding={{ base: '8rem 2rem', md: '8rem 4rem', xl: '8rem 20rem' }}>
        <Text fontSize="2xl" fontWeight="500">
          Game Development
        </Text>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" padding="2rem 0" minHeight="100vh">
          <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap="2rem 5rem">
            {games.map((game, index) => (
              <WorkCard key={index} work={game} />
            ))}
          </Grid>
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
