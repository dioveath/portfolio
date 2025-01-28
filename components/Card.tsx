import { BsGithub } from 'react-icons/bs';
import { Stack, Image, Text, Flex, Link, Box, useColorModeValue } from '@chakra-ui/react';

export default function Card({ imgSrc, alt, title, desc, liveLink, gitLink, techStack }) {
  return (
    <Stack
      width={{ base: '300px', md: '320px', lg: '350px' }}
      overflow="hidden"
      padding="1.2rem 1rem"
      border={'1px #1A1C20'}
      borderRadius={'10px'}
      background={useColorModeValue('white', '#1A1C20')}
      _hover={{
        transform: 'scale(105%)',
        filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
      }}
      cursor="pointer"
      transition={'all 0.2s ease-in-out'}
    >
      <Image
        position="relative"
        src={imgSrc}
        alt={alt}
        height="200px"
        objectFit="cover"
        borderRadius="4px"
        transition="0.2s ease-in-out"
      />
      <Flex gap="1rem">
        {liveLink}
        <Link target="_blank" href={gitLink}>
          <BsGithub size="28" color="#5555ff" />
        </Link>
      </Flex>
      <Stack>
        <Text fontSize="xl" fontWeight="500">
          {' '}
          {title}{' '}
        </Text>
        <Text> {desc} </Text>
      </Stack>
      <Box height="0.2rem" borderBottom="1px solid gray"></Box>
      {techStack}
      <Box height="0.2rem" borderTop="1px solid gray"></Box>
    </Stack>
  );
}
