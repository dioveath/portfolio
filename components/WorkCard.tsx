import { Box, Heading, Text, Stack, Link, Tag, Image, useColorModeValue } from '@chakra-ui/react';
import { Work } from '../data/works';
import IconMap from '../utils/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

interface WorkCardProps {
  work: Work;
}

const WorkCard = ({ work }: WorkCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const color = useColorModeValue('gray.600', 'gray.300');
  const linkColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      as="article"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="sm"
      _hover={{ boxShadow: 'md' }}
    >
      <Image
        src={work.cover || '/placeholder-image.jpg'}
        alt={work.name}
        height="200px"
        width="100%"
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/400x200"
      />

      <Box p={6}>
        <Stack spacing={3}>
          <Box display="flex" alignItems="center" gap={3}>
            <Image
              src={work.avatar || '/placeholder-avatar.jpg'}
              alt={`${work.name} avatar`}
              boxSize="40px"
              borderRadius="full"
              fallbackSrc="https://via.placeholder.com/40"
              objectFit={"cover"}
            />
            <Heading as="h3" size="md">
              {work.name}
            </Heading>
          </Box>

          <Text color={color}>{work.description}</Text>

          <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
            {work.techStack.map((tech) => {
              const Icon = IconMap[tech.toLowerCase()];
              return (
                <Tag
                  key={tech}
                  size="md"
                  variant="subtle"
                  colorScheme="blue"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  {Icon && <Icon />}
                  {tech}
                </Tag>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={4} pt={2}>
            <Link
              href={work.liveLink}
              isExternal
              color={linkColor}
              fontWeight="semibold"
              _hover={{ textDecoration: 'none', color: 'blue.600' }}
            >
              Live Demo →
            </Link>
            {work.gitLink && (
              <Link
                href={work.gitLink}
                isExternal
                color={color}
                fontWeight="semibold"
                _hover={{ textDecoration: 'none', color: 'gray.700' }}
              >
                View Source →
              </Link>
            )}
          </Stack>
        </Stack>
      </Box>
    </MotionBox>
  );
};

export default WorkCard;
