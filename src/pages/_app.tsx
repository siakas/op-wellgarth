import type { AppProps } from 'next/app'

import 'sanitize.css'
import GlobalStyle from '@/styles/global'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
