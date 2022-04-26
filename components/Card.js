import { BsGithub } from 'react-icons/bs';
import { CgMediaLive } from 'react-icons/cg';
import {
  Stack,
  Image,
  Text,
  Flex,
  Link,
} from '@chakra-ui/react';


export default function Card({ imgSrc, alt, title, desc, liveLink, gitLink, ...props}){
  
  return (<Stack
            maxWidth="300px"
            overflow='hidden'
            padding="1rem"
          >
            <Image
              src={imgSrc}
              alt={alt}
              objectFit="cover"
              borderRadius="10px"
            />
            <Stack>
              <Text fontSize="xl" fontWeight="500"> {title} </Text>
              <Text> {desc} </Text>              
            </Stack>

            <Flex gap="1rem">
              <Link target="_blank" href={liveLink}>
                <CgMediaLive size="24"/>
              </Link>
              <Link target="_blank" href={gitLink}>
                <BsGithub size="24"/>
              </Link>
            </Flex>

          </Stack>);
}
