import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import GlobalStyle from '@/styles/global'
import BaseLayout from '@/components/layout/BaseLayout'
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
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ChakraProvider>
    </>
  )
}
