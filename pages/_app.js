import Script from 'next/script';
import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../config/theme.js';
import Fonts from '../config/fonts.js';

function MyApp({ Component, pageProps }) {
  return (<ChakraProvider theme={theme}>
            <Script
              id="adsense-id"
              async="true"
              strategy="afterInteractive"
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4040965046942345"
              crossorigin="anonymous"
              onError={(e) => { console.error('Script failed to load', e); }}/>
            <Fonts/>
            <Component {...pageProps} />
          </ChakraProvider>);
}

export default MyApp;
