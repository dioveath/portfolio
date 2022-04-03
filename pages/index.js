import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { BsGithub, BsLinkedin, BsYoutube} from 'react-icons/bs';
import { MdConstruction } from 'react-icons/md';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title> Saroj Rai </title>
        <meta name="description" content="Saroj Rai | Portfolio Website | Full Stack Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Saroj Rai
        </h1>
        <h1 style={{"color": "blue", "textDecoration": "underline"}}>
          Full Stack Developer
        </h1>
        <div style={{
          "display": "flex",
          "gap": "3rem",
          "alignItems": "center"
        }}>
          <a href="https://github.com/dioveath"><BsGithub size={30}/></a>
          <a href="https://www.linkedin.com/in/saroj-rai-11739a110/"><BsLinkedin size={30}/></a>
          <a href="https://www.youtube.com/channel/UCoaAC-D62Vl9b2X2WMeUtgw"><BsYoutube size={30}/></a>                    
        </div>        

        <div style={{
          "height": "20px"
        }}></div>

        <p style={{"fontSize": "18px"}}>
          Game developer turned Full stack developer. I love creating things and integrating wheels in systems. 
        </p>

        {/* <MdConstruction size={40}/> */}
        {/* <p> Website Under Construction </p> */}

        <div style={{
          "height": "30px"
        }}></div>

        <div className={styles.grid}>
          <a href="https://github.com/dioveath/chc-gaming" className={styles.card}>
            <h2>Charicha Gaming &rarr;</h2>
            <p> Gaming community site, focused on Competitive scene. i.e. Tournaments, Leagues, Challenges, etc </p>
          </a>

          <a href="https://github.com/dioveath/ci-website-nextjs" className={styles.card}>
            <h2>Charicha Institute &rarr;</h2>
            <p> Worked on the Charicha Institute online ecosystem, including an Android application, a dynamic site. </p>
          </a>

          <a
            href=""
            className={styles.card}
          >
            <h2>Game Jam 2022 &rarr;</h2>
            <p>Duality Themed Puzzle Two characters are bounded to one control but in reverse. We will face interesting puzzles on the way.</p>
          </a>

          <a
            href="https://github.com/dioveath/teengine-js"
            className={styles.card}
          >
            <h2>Teengine JS &rarr;</h2>
            <p>
              My JS Game engine/framework.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright &copy; All Rights Reserved
          <span className={styles.logo}>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </span>
        </a>
      </footer>
    </div>
  );
}
