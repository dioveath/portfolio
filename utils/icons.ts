import React from 'react';
import { BsGithub, BsTwitter, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { FaUnity, FaNode, FaGooglePlay } from 'react-icons/fa';
import {
  SiAndroid,
  SiApachecordova,
  SiBlueprint,
  SiBluetooth,
  SiCelery,
  SiCplusplus,
  SiCsharp,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGraphql,
  SiHeroku,
  SiItchdotio,
  SiJavascript,
  SiMapbox,
  SiMongodb,
  SiNativescript,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVercel,
  SiWindows,
} from 'react-icons/si';

// mapping of icon name to icon co  [key: string]: React.ComponentType;
interface IconMapType {
  [key: string]: React.ComponentType;
}

const IconMap: IconMapType = {
  react: SiReact,
  next: SiNextdotjs,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  firebase: SiFirebase,
  javascript: SiJavascript,
  csharp: SiCsharp,
  heroku: SiHeroku,
  itch: SiItchdotio,
  netlify: SiNetlify,
  cordova: SiApachecordova,
  docker: SiDocker,
  'c++': SiCplusplus,
  typescript: SiTypescript,
  graphql: SiGraphql,
  vercel: SiVercel,
  nativescript: SiNativescript,
  android: SiAndroid,
  bluetooth: SiBluetooth,
  blueprint: SiBlueprint,
  unity: FaUnity,
  nodejs: FaNode,
  googleplay: FaGooglePlay,
  github: BsGithub,
  twitter: BsTwitter,
  linkedin: BsLinkedin,
  youtube: BsYoutube,
  python: SiPython,
  celery: SiCelery,
  mapbox: SiMapbox,
  supabase: SiSupabase,
  prisma: SiPrisma,
  windows: SiWindows,
};

export default IconMap;
