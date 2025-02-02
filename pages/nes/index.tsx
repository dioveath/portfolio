import { useState } from 'react';
import NesEmulator from '../../components/room/NesEmulator';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';

const roms = ['/assets/nes/mario.nes', '/assets/nes/kunio-kun-soccer.nes'];

export default function NesTest() {
  const [rom, setRom] = useState('');
  const [sound, setSound] = useState(false);
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);

  const setSoundOption = (check: boolean) => {
    setSound(check);
    setReady(true);
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Do you want sound? </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>ROM</FormLabel>
              <Select onChange={(e) => setRom(e.target.value)}>
                {roms.map((rom) => (
                  <option key={rom} value={rom}>
                    {rom}
                  </option>
                ))}
              </Select>
            </FormControl>
            <ModalFooter>
              <Button colorScheme="green" onClick={() => setSoundOption(true)}>
                Yes
              </Button>
              <Button colorScheme="red" onClick={() => setSoundOption(false)}>
                No
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* {ready && <NesEmulator romUrl={rom} />} */}
    </>
  );
}
