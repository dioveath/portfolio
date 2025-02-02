import { Flex, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionFlex = motion(Flex);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Footer() {
  return (
    <footer
      style={{
        paddingTop: '2rem',
      }}
    >
      <Link href="https://raisaroj360.com.np">
        <MotionFlex direction={"column"} justifyContent="space-between" alignItems="center" {...fadeInUp}  >
          <span> Copyright &copy; 2022 Saroj Rai. All Rights Reserved</span>
          {/* <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span> */}
        </MotionFlex>
      </Link>
    </footer>
  );
}
