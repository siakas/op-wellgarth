import type { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type MainProps = {
  children: ReactNode
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <Box as="main" maxW="820px" w="100%" pb={20} lineHeight="1.7">
      {children}
    </Box>
  )
}

export default Main
