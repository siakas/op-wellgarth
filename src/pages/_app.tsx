import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
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
        <AnimatePresence>
          <Component {...pageProps} />
        </AnimatePresence>
      </ChakraProvider>
    </>
  )
}
