import type { Area, Category, Spot } from '@/types/microcms'
import { client } from '@/libs/client'

// スポット全記事取得
export const getAllSpots = async () => {
  const res = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 1000,
    },
  })

  return res
}

// エリア一覧を取得
export const getAreas = async () => {
  const res = await client.getList<Area>({
    endpoint: 'areas',
    queries: {
      limit: 1000,
    },
  })

  return res
}

// カテゴリ一覧を取得
export const getCategories = async () => {
  const res = await client.getList<Category>({
    endpoint: 'categories',
    queries: {
      limit: 1000,
    },
  })

  return res
}
