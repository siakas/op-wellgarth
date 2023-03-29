import type { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type AsideProps = {
  children: ReactNode
}

const Aside: FC<AsideProps> = ({ children }) => {
  return (
    <Box as="aside" w={{ base: '100%', lg: '300px' }} flexShrink="0">
      {children}
    </Box>
  )
}

export default Aside
