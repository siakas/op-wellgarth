import { siteConfig } from '@@/site.config'
import { createClient } from 'microcms-js-sdk'

// API 取得用のクライアントを作成
export const client = createClient({
  apiKey: siteConfig.apiKey,
  serviceDomain: siteConfig.serviceDomain,
})
