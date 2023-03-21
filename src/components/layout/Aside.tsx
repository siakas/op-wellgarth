import type { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type AsideProps = {
  children: ReactNode
}

const Aside: FC<AsideProps> = ({ children }) => {
  return (
    <Box as="aside" w="300px">
      {children}
    </Box>
  )
}

export default Aside
