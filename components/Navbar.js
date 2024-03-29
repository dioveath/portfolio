import Logo from './Logo.tsx';
import NextLink from 'next/link';
import {
  Container,
  Box,
  Text,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import ThemeToggleButton from './ThemeToggleButton.js';
import { IoLogoGithub } from 'react-icons/io5';

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href;
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900');
  return (
    <NextLink href={href} passHref scroll={false}>
      <Link
        p={2}
        bg={active ? 'teal.300' : undefined}
        color={active ? '#202023' : inactiveColor}
        target={target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const Navbar = props => {
  const { path } = props;
  const isHideout = path === '/enterBase';
  const bgValue = useColorModeValue('#ffffff40', '#20202380');


  if(isHideout) {
    return (
      <Box 
        position="fixed"
        as="nav"
        w="100%"
        zIndex={1}
        {...props}
        >
          <Link href="/" passHref>
            <Text fontFamily="NesFont, Consolas" fontSize="md" color="white" textAlign="left" m="2rem"> {"<"} Back to Business </Text>
          </Link>
        </Box>
    );
  }

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={ isHideout ? "transparent" : bgValue}
      color={isHideout ? 'white' : 'inherit'}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
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

        <Box flex={1} align="right">

          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>About</MenuItem>
                </NextLink>
                <NextLink href="/works" passHref>
                  <MenuItem as={Link}>Works</MenuItem>
                </NextLink>
                <NextLink href="/games" passHref>
                  <MenuItem as={Link}> Games </MenuItem>
                </NextLink>
                <NextLink href="https://bluecharicha.wordpress.com" passHref>
                  <MenuItem as={Link} target="_blank">Posts</MenuItem>
                </NextLink>
                <NextLink href="/hideout" passHref>
                  <MenuItem as={Link}> Hide Out </MenuItem>
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
