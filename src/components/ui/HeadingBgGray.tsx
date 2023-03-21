import type { HeadingProps } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { Heading } from '@chakra-ui/react'

type HeadingBgGrayProps = {
  children: ReactNode
} & HeadingProps

const HeadingBgGray: FC<HeadingBgGrayProps> = ({ children, ...props }) => {
  return (
    <Heading
      as="h2"
      size="md"
      bg="blackAlpha.200"
      mb="10px"
      p={3}
      borderRadius="5"
      {...props}
    >
      {children}
    </Heading>
  )
}

export default HeadingBgGray
