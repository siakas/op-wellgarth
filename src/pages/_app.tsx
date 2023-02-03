import type { AppProps } from 'next/app'
import Head from 'next/head'

import 'sanitize.css'
import GlobalStyle from '@/styles/global'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
