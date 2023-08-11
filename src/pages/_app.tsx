import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import GlobalStyle from '@/styles/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />

        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <ChakraProvider>
          <AnimatePresence
            onExitComplete={() => {
              window.scrollTo(0, 0)
            }}
          >
            <Component {...pageProps} />
          </AnimatePresence>
        </ChakraProvider>
      </RecoilRoot>
    </>
  )
}
