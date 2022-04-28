import styles from '../styles/Home.module.css';
import { Link } from '@chakra-ui/react';

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <Link
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        color="whitealpha.50"
      >
        Copyright &copy; 2022 Saroj Rai. All Rights Reserved
        <span className={styles.logo}>
          {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
        </span>
      </Link>
    </footer>);
}
