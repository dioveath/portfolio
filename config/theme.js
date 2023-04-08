import '@fontsource/ibm-plex-sans';
import '@fontsource/raleway';
import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';


const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const styles = {
  global: props => ({
    body: {
      bg: mode('gray.50', 'gray.900')(props),
      color: mode('gray.800', 'white')(props),
    },
  }),
}

const fonts = {
  heading: `'Raleway', 'IBM Plex Sans', , sans-serif`,
  body: `'Raleway', 'IBM Plex Sans', sans-serif`,
}


const theme = extendTheme({ config, styles, fonts });

export default theme;
