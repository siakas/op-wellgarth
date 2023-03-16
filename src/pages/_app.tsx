import type { AppProps } from 'next/app'
import Head from 'next/head'
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react'
import GlobalStyle from '@/styles/global'
import { siteConfig } from '@@/site.config'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />

      <Head>
        <title>{siteConfig.siteMeta.title}</title>
        <meta property="og:title" content={siteConfig.siteMeta.title} />
        <meta property="og:url" content={siteConfig.baseUrl} />
        <meta property="og:site" content={siteConfig.siteMeta.title} />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <ChakraProvider>
        <div className="wrapper">
          {/* ヘッダ */}
          <Flex
            as="header"
            align="center"
            justify="space-between"
            padding="1.5rem"
            borderBottomWidth="1px"
            borderColor="gray.200"
          >
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Your Logo
              </Text>
            </Box>
            <Spacer />
            <Flex align="center">
              <Box margin="0 1rem">
                <Text fontSize="lg">Home</Text>
              </Box>
              <Box margin="0 1rem">
                <Text fontSize="lg">About</Text>
              </Box>
              <Box margin="0 1rem">
                <Text fontSize="lg">Contact</Text>
              </Box>
            </Flex>
          </Flex>
          <Container>
            <Component {...pageProps} />
          </Container>
          {/* フッタ */}
          <Box as="footer" bg="gray.700" color="white">
            <Container maxW="1200px">フッタ</Container>
          </Box>
        </div>
      </ChakraProvider>
    </>
  )
}
