import type { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

type MainProps = {
  children: ReactNode
}

// ページ遷移アニメーションのプロパティを定義
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const Main: FC<MainProps> = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <motion.div
        key={router.asPath} // key プロパティに router.asPath を渡すことでページのパスが変わるたびにトランジションが実行される（同一ページコンポーネント間のダイナミックルーティングも対象となる）
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        transition={{
          duration: 0.35,
        }}
      >
        <Box as="main" maxW="820px" w="100%" pb={20} lineHeight="1.7">
          {children}
        </Box>
      </motion.div>
    </>
  )
}

export default Main
