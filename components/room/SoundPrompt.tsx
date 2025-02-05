// SoundPrompt.tsx
import React from 'react';
import { Center, Button, Text, VStack, Box } from '@chakra-ui/react';
import * as THREE from 'three';

interface SoundPromptProps {
  onAnswer: (soundEnabled: boolean) => void;
}

const SoundPrompt: React.FC<SoundPromptProps> = ({ onAnswer }) => {
  // Resume AudioContext when user chooses sound on.
  const handleSoundOn = () => {
    const listener = new THREE.AudioListener();
    if (listener.context.state === 'suspended') {
      listener.context.resume();
    }
    onAnswer(true);
  };

  const handleSoundOff = () => {
    const listener = new THREE.AudioListener();
    if (listener.context.state === 'running') {
      listener.context.suspend();
    }
    onAnswer(false);
  };

  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg="rgba(0,0,0,0)"
      zIndex={1500}
    >
      <Box p={6} borderRadius="md" textAlign="center">
        <VStack spacing={4}></VStack>
      </Box>
    </Center>
  );
};

export default SoundPrompt;
