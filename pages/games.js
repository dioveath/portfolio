import Head from 'next/head';
import Navbar from '../components/Navbar.js';
import { Flex } from '@chakra-ui/react';


export default function Games(){
  
  return (
    <>
      <Head>
        <title> Saroj Rai | Games </title>
        <meta name="description" content="Saroj Rai | Games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar path="/games"/>
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
