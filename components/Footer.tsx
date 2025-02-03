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
        padding: '1rem',
      }}
    >
      <Link href="https://raisaroj360.com.np">
        <MotionFlex direction={"column"} justifyContent="space-between" alignItems="center" {...fadeInUp}  >
          <span> Copyright &copy; 2022 Saroj Rai. All Rights Reserved</span>
        </MotionFlex>
      </Link>
    </footer>
  );
}
