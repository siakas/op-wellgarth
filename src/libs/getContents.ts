import { sortBy, uniqBy } from 'lodash-es'
import { client } from '@/libs/client'
import type { Area, Category, Queries, Spot } from '@/types/microcms'
import type { MicroCMSListResponse } from 'microcms-js-sdk'
import { siteConfig } from '@@/site.config'

// スポット一覧取得時の基本件数を設定
// siteConfig.defaultLimit の型が `string | number` となってしまうため、
// 条件分岐による型チェックをおこなっている
const limit: number =
  typeof siteConfig.defaultLimit === 'string'
    ? parseInt(siteConfig.defaultLimit, 10)
    : siteConfig.defaultLimit

// 全スポット一覧を取得
export const getAllSpots = async () => {
  const res = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 1000,
    },
    customRequestInit: {
      cache: 'force-cache',
    },
  })

  return res
}

// 特定の条件でフィルタリングしたスポット一覧を取得
export const getSpotsByFilter = async (
  limit: number,
  currentPage: number,
  spotFilter?: string
): Promise<{
  spots: MicroCMSListResponse<Spot>
  pager: number[]
}> => {
  const queries: Queries = {
    limit,
    filters: spotFilter,
    offset: (currentPage - 1) * limit,
  }

  const spots = await client.getList<Spot>({
    endpoint: 'blogs',
    queries,
    customRequestInit: {
      cache: 'force-cache',
    },
  })
  const pager = [...Array(Math.ceil(spots.totalCount / 10)).keys()]

  return { spots, pager }
}

// スポットと関連づけられているエリア一覧を取得
export const getLinkedAreas = async () => {
  // 全スポット記事を `spots` という名前で取得
  const { contents: spots } = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 1000,
    },
    customRequestInit: {
      cache: 'force-cache',
    },
  })

  // 取得した全スポット記事からエリア情報のみを抽出した配列を作成
  // スポット全記事からエリア情報のみを抽出
  const allAreas = spots.map((spot) => spot.area)
  // 重複するエリアを除去
  const uniqueAreas = uniqBy(allAreas, 'id')
  // id でソート
  const areas = sortBy(uniqueAreas, 'id')

  // MicroCMS のレスポンスに近い形で返却
  const res: { contents: Area[]; totalCount: number } = {
    contents: areas,
    totalCount: areas.length,
  }

  return res
}

// スポットと関連づけられているカテゴリ一覧を取得
export const getLinkedCategories = async () => {
  // 全スポット記事を `spots` という名前で取得
  const { contents: spots } = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 1000,
    },
    customRequestInit: {
      cache: 'force-cache',
    },
  })

  // 取得した全スポット記事からカテゴリ情報のみを抽出した配列を作成
  // スポット全記事からカテゴリ情報のみを抽出。カテゴリは複数個が配列で関連づけられているため、flatMap でフラット化する
  const allCategories = spots.flatMap((spot) => spot.categories)
  // 重複するカテゴリを除去
  const categories = uniqBy(allCategories, 'id')

  // MicroCMS のレスポンスに近い形で返却
  const res: { contents: Category[]; totalCount: number } = {
    contents: categories,
    totalCount: categories.length,
  }

  return res
}

// 最近更新されたスポット一覧の取得
export const getUpdatedSpots = async () => {
  const res = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: { limit: 6, orders: '-updatedAt' },
    customRequestInit: {
      cache: 'force-cache', // キャッシュを利用せずビルド時に最新のリソースを取得（SSG 向け）
    },
  })

  return res
}
