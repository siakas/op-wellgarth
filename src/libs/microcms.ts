import { createClient } from 'microcms-js-sdk'

import type { Blog, BlogResponse } from '@/types/microcms'
import type { MicroCMSQueries } from 'microcms-js-sdk'

// API 取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN ?? '',
  apiKey: process.env.API_KEY ?? '',
})

// ブログ一覧を取得
export const getBlogList = async (queries?: MicroCMSQueries) => {
  const listData = await client.get<BlogResponse>({
    endpoint: 'blogs',
    queries,
  })

  // データの取得が目視しやすいように明示的に遅延効果を追加
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return listData
}

// ブログの詳細を取得
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const detailData = await client.get<Blog>({
    endpoint: 'blogs',
    contentId,
    queries,
  })

  // データの取得が目視しやすいように明示的に遅延効果を追加
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return detailData
}
