// LoadingScreen.tsx
import React from 'react';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingScreen: React.FC = () => {
  return (
    <Center position="fixed" top="0" left="0" right="0" bottom="0" bg="gray.900" zIndex={2000}>
      <VStack spacing={4}>
        <Spinner size="xl" color="white" />
        <Text color="white" fontSize="xl">
          Loading...
        </Text>
      </VStack>
    </Center>
  );
};

export default LoadingScreen;