import type { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { siteConfig } from '@@/site.config'

type PageMetaProps = {
  pageTitle?: string
  pageDesc?: string
  pageImg?: string
}

const PageMeta: FC<PageMetaProps> = ({ pageTitle, pageDesc, pageImg }) => {
  // ページタイトル
  const title = pageTitle
    ? `${pageTitle} | ${siteConfig.siteMeta.title}`
    : siteConfig.siteMeta.title

  // ページの説明
  const description = pageDesc ?? siteConfig.siteMeta.description

  // ページ URL
  const router = useRouter()
  const url = `${siteConfig.baseUrl}${router.asPath}`

  // OGP 画像
  const img = pageImg ?? siteConfig.siteMeta.img
  const imgUrl = img.startsWith('https') ? img : `${siteConfig.baseUrl}${img}`

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <meta property="og:site_name" content={siteConfig.siteMeta.title} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imgUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default PageMeta
