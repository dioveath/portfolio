import { Work } from "./works";

const works: Work[] = [
  {
    name: "zeroface.ai",
    description: "Generate faceless content with AI magic. Transform your content creation journey with our AI-powered platform.",
    avatar: "assets/works/zeroface_logo.jpg",
    cover: "assets/works/zeroface_cover.png",
    techStack: [
      "next",
      "typescript",
      "python",
      "docker",
      "celery"      
    ],
    liveLink: "https://zeroface.co",
  },
  {
    name: "Futsal House",
    description: "Futsal House is the ultimate match making app for futsal players. Find players, create teams, and schedule games with ease.",
    avatar: "assets/works/futsal_house_logo.jpg",
    cover: "assets/works/futsal_house_cover.png",
    techStack: [ 
      "react",
      "mapbox",
      "supabase",
      "prisma",
      "vercel",
      "googleplay"
    ],
    liveLink: "https://thefutsalhouse.com",
  },
  {
    name: "Charicha Gaming",
    description: "Gaming community site, focused on Competitive scene. i.e. Tournaments, Leagues, Challenges, etc",
    avatar: "assets/works/chc_gaming_logo.png",
    cover: "assets/chc_gaming_landing.png",
    techStack: [
      "react",
      "javascript",
      "node",
      "express",
      "mongodb",
      "docker"
    ],
    liveLink: "https://charichagaming.com.np/",
    gitLink: "https://github.com/dioveath/chc-gaming"
  },
  {
    name: "OMS Android App",
    description: "An Android app that can manage your order, notify new orders, print receipts, and more. It is a companion app for TastyIgniter.",
    avatar: "assets/works/oms_logo.png",
    cover: "assets/works/oms_app.png",
    techStack: [
      "android",
      "bluetooth",
      "react",
      "googleplay",
    ],
    liveLink: "https://play.google.com/store/apps/details?id=com.anar.oms",
    gitLink: "https://tastyigniter.com/marketplace/item/anar-ordermanager"
  },
  {
    name: "prompters.dev",
    description: "prompters.dev is a community with a diverse range of AI-powered tools &amp; our people share how to use those tools best.",
    avatar: "assets/works/prompters_logo.jpg",
    cover: "assets/works/prompters_dev.png",
    techStack: [
      "typescript",
      "next",
      "prisma",
      "graphql"
    ],
    liveLink: "https://prompters.dev",
  },
  {
    name: "My UK Builder",
    description: "A beautiful construction company website, with a custom CMS to manage the content.",
    avatar: "assets/works/myukbuilder_logo.jpg",
    cover: "assets/works/myukbuilder.png",
    techStack: [
      "next",
      "typescript",
      "prisma"
    ],
    liveLink: "https://myukbuilder.com",
  },
  {
    name: "ADBS Converter",
    description: "ADBS Date Converter Tool lets you quickly convert AD date to BS date.",
    avatar: "assets/works/adbslogo.png",
    cover: "assets/works/adbslogo.png",
    techStack: [
      "c++",
      "windows"
    ],
    liveLink: "https://github.com/dioveath/ad-bs-date-converter",
    gitLink: "https://github.com/dioveath/ad-bs-date-converter"
  },
  {
    name: "Charicha Institute",
    description: "Charicha Institute is a learning platform for students to learn and grow.",
    avatar: "assets/works/charichainstitute_logo.jpg",
    cover: "assets/works/chc_institute.png",
    techStack: [
      "next",
      "typescript",
      "firebase"
    ],
    liveLink: "https://charichainstitute.com.np",
    gitLink: "https://github.com/dioveath/ci-website-nextjs"
  }

]

export default works;