import type { FC, ReactNode } from 'react'
import { Container, Flex } from '@chakra-ui/react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

type BaseLayoutProps = {
  children: ReactNode
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <Header />

        <Container maxW="1200px" py={10}>
          <Flex
            justifyContent="space-between"
            flexDir={{ base: 'column', lg: 'row' }}
            gap="48px"
          >
            {children}
          </Flex>
        </Container>

        <Footer />
      </div>
    </>
  )
}

export default BaseLayout
