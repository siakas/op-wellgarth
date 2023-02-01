import type { AppProps } from 'next/app'

import 'sanitize.css'
import GlobalStyle from '@/styles/global'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
