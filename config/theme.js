import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';
import { Figtree, Outfit } from 'next/font/google'


const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
  
};

const styles = {
  global: props => ({
    body: {
      bg: mode('gray.50', '#111111')(props),
      color: mode('black', 'white')(props),
    },
  }),
}

const borderRadius = {
  radii: {
    none: '0',
    sm: '0',
    base: '0',
    md: '0',
    lg: '0',
    xl: '0',
    '2xl': '0',
    '3xl': '0',
    full: '0',    
  }
}

const fonts = {
  heading: `${outfit.style.fontFamily}, ${figtree.style.fontFamily}, 'Raleway', 'IBM Plex Sans', , sans-serif`,
  body: `${outfit.style.fontFamily}, ${figtree.style.fontFamily}, 'Raleway', 'IBM Plex Sans', sans-serif`,
}


const theme = extendTheme({ config, styles, fonts, ...borderRadius });

export default theme;