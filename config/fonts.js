import { Global } from '@emotion/react';

const Fonts = () => {
  return <Global
  styles={
    `
    @font-face {
       font-family: NesFont;
       src: url(fonts/PressStart2P-vaV7.ttf)
    }
    `
  }/>;
};

export default Fonts;
