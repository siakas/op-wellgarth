import type { FC, ReactNode } from 'react'
import { Container, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

type BaseLayoutProps = {
  children: ReactNode
}

// ページ遷移アニメーションのプロパティを定義
const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <motion.div
        key={router.asPath}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeInOut}
      >
        <div className="wrapper">
          <Header />

          <Container maxW="1200px" py={10}>
            <Flex justifyContent="space-between">{children}</Flex>
          </Container>

          <Footer />
        </div>
      </motion.div>
    </>
  )
}

export default BaseLayout
