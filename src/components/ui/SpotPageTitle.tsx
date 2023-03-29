import type { FC, ReactNode } from 'react'
import { Box, Heading } from '@chakra-ui/react'

type SpotPageTitleProps = {
  title: ReactNode
}

const SpotPageTitle: FC<SpotPageTitleProps> = ({ title }) => {
  return (
    <Box mt={10}>
      <Heading
        as="h1"
        fontSize={{ base: '1.6rem', sm: '2rem', md: '2.5rem' }}
        lineHeight="1.4"
        fontWeight="bold"
      >
        {title}
      </Heading>
    </Box>
  )
}

export default SpotPageTitle
