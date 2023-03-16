import type { FC, ReactNode } from 'react'
import { Heading } from '@chakra-ui/react'

type HeadingBgGrayProps = {
  children: ReactNode
}

const HeadingBgGray: FC<HeadingBgGrayProps> = ({ children }) => {
  return (
    <Heading
      as="h2"
      size="md"
      bg="blackAlpha.200"
      mb="10px"
      py={2}
      px={3}
      borderRadius="5"
    >
      {children}
    </Heading>
  )
}

export default HeadingBgGray
