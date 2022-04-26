import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import { Flex } from '@chakra-ui/react';


export default function Works(){
  
  return (
    <>
      <Head>
        <title> Saroj Rai | Works </title>
        <meta name="description" content="Saroj Rai | Works" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar path="/works"/>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="4rem 0"
        minHeight="100vh">
        
      </Flex>
      
    </>
  );

}
