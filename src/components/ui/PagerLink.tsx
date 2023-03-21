import type { LinkProps } from '@chakra-ui/react'
import type { FC, ReactNode } from 'react'
import { Link } from '@chakra-ui/react'
import NextLink from 'next/link'

type PagerLinkProps = {
  children: ReactNode
} & LinkProps

const PagerLink: FC<PagerLinkProps> = ({ children, ...props }) => {
  return (
    <Link
      as={NextLink}
      w={10}
      h={10}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textDecoration="none"
      _hover={{ textDecoration: 'none', color: 'blue.500' }}
      {...props}
    >
      {children}
    </Link>
  )
}

export default PagerLink
