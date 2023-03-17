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

// お気に入りスポット一覧を取得
export const getPickupSpots = async () => {
  const res = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 5,
      filters: 'isStarred[equals]true',
    },
  })

  return res
}

// 最新のスポット一覧を取得（最大 5 件）
export const getLatestSpots = async () => {
  const res = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 5,
    },
  })

  return res
}
