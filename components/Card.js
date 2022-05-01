import { BsGithub } from 'react-icons/bs';
import {
  Stack,
  Image,
  Text,
  Flex,
  Link,
  Box
} from '@chakra-ui/react';


export default function Card({ imgSrc, alt, title, desc, liveLink, gitLink, techStack, ...props}){
  
  return (<Stack
            maxWidth="300px"
            overflow='hidden'
            padding="1rem"
          >
            <Image
              position="relative"
              src={imgSrc}
              alt={alt}
              height="200px"
              objectFit="cover"
              borderRadius="4px"
              transition="0.2s ease-in-out"
              _hover={{
                "transform": "scale(101%)"
              }}/>
            <Flex gap="1rem">
              { liveLink }
              <Link target="_blank" href={gitLink}>
                <BsGithub
                  size="28" color="#5555ff"/>
              </Link>
            </Flex>            
            
            <Stack>
              <Text fontSize="xl" fontWeight="500"> {title} </Text>
              <Text> {desc} </Text>              
            </Stack>

            <Box
              height="0.2rem"
              borderBottom="1px solid gray"
            ></Box>
            { techStack }
            <Box
              height="0.2rem"
              borderTop="1px solid gray"              
            ></Box>

          </Stack>);
}
