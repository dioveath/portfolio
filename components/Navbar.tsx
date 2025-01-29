import Logo from './Logo';
import NextLink from 'next/link';
import {
  Container,
  Box,
  Text,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import ThemeToggleButton from './ThemeToggleButton.js';

type LinkItemProps = {
  href: string;
  path: string;
  target?: string;
  children: React.ReactNode;
};

const LinkItem = ({ href, path, target, children }: LinkItemProps) => {
  const active = path === href;
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900');
  return (
    <NextLink href={href} passHref scroll={false} target={target}>
      <Box p={2} bg={active ? 'red.500' : undefined} color={active ? 'white' : inactiveColor}>
        {children}
      </Box>
    </NextLink>
  );
};

const Navbar = (props) => {
  const { path } = props;
  const isHideout = path === '/enterBase';
  const bgValue = useColorModeValue('whiteAlpha.500', 'blackAlpha');
  const borderBottom = useColorModeValue('1px solid', '1px solid');
  const borderColor = useColorModeValue('gray.200', 'gray.800');

  if (isHideout) {
    return (
      <Box position="fixed" as="nav" w="100%" zIndex={1} {...props}>
        <NextLink href="/" passHref>
          <Text fontFamily="NesFont, Consolas" fontSize="md" color="white" textAlign="left" m="2rem">
            {'<'} Back to Business{' '}
          </Text>
        </NextLink>
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={isHideout ? 'transparent' : bgValue}
      color={isHideout ? 'white' : 'inherit'}
      css={{ backdropFilter: 'blur(10px)' }}
      shadow={isHideout ? 'none' : 'sm'}
      zIndex={1}
      borderBottom={borderBottom}
      borderColor={borderColor}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        flexWrap={'wrap'}
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/games" path={path}>
            Games
          </LinkItem>
          <LinkItem target="_blank" href="https://bluecharicha.wordpress.com" path={path}>
            Posts
          </LinkItem>
          <LinkItem href="/hideout" path={path}>
            Hide Out
          </LinkItem>
        </Stack>

        <Box>
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Options" />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem>About</MenuItem>
                </NextLink>
                <NextLink href="/works" passHref>
                  <MenuItem>Works</MenuItem>
                </NextLink>
                <NextLink href="/games" passHref>
                  <MenuItem> Games </MenuItem>
                </NextLink>
                <NextLink href="https://bluecharicha.wordpress.com" passHref target="_blank">
                  <MenuItem>Posts</MenuItem>
                </NextLink>
                <NextLink href="/hideout" passHref>
                  <MenuItem> Hide Out </MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
