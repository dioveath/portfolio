import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme.js';
import Fonts from '../config/fonts.js';

function MyApp({ Component, pageProps }) {
  return (<ChakraProvider theme={theme}>
            <Fonts/>
            <Component {...pageProps} />
          </ChakraProvider>);
}

export default MyApp;
