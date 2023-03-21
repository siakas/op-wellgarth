import type { MicroCMSListResponse } from 'microcms-js-sdk'
import type { Area, Category, Queries, Spot } from '@/types/microcms'
import { chain } from 'lodash-es'
import { client } from '@/libs/client'
import { siteConfig } from '@@/site.config'

// スポット一覧取得時の基本件数を設定
// siteConfig.defaultLimit の型が `string | number` であるため、
// 条件分岐による型チェックをおこなっている
const limit: number =
  typeof siteConfig.defaultLimit === 'string'
    ? parseInt(siteConfig.defaultLimit, 10)
    : siteConfig.defaultLimit

// コンテンツ一式をまとめて取得
export const getContents = async (
  currentPage = 1,
  spotFilter?: string
): Promise<{
  spots: Spot[]
  totalCount: number
  pager: number[]
  areas: Area[]
  categories: Category[]
  pickupSpots: Spot[]
  latestSpots: Spot[]
}> => {
  const [{ spots, pager }, areas, categories, pickupSpots, latestSpots] =
    await Promise.all([
      getSpotsByFilter(limit, currentPage, spotFilter),
      getLinkedAreas(),
      getLinkedCategories(),
      getPickupSpots(),
      getLatestSpots(),
    ])

  return {
    spots: spots.contents,
    totalCount: spots.totalCount,
    pager,
    areas: areas.contents,
    categories: categories.contents,
    pickupSpots: pickupSpots.contents,
    latestSpots: latestSpots.contents,
  }
}

// 全スポット一覧を取得
export const getAllSpots = async () => {
  const res = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 1000,
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
  })

  const pager = [...Array(Math.ceil(spots.totalCount / 10)).keys()]

  return { spots, pager }
}

// 特定のスポット詳細を取得
export const getSpotById = async (spotId: string) => {
  const res = await client.getListDetail<Spot>({
    endpoint: 'blogs',
    contentId: spotId,
    queries: {
      depth: 2,
    },
  })

  return res
}

// 登録されているすべてのエリア一覧を取得
export const getAllAreas = async () => {
  const res = await client.getList<Area>({
    endpoint: 'areas',
    queries: {
      limit: 1000,
    },
  })

  return res
}

// スポットと関連付けられているエリア一覧を取得
export const getLinkedAreas = async () => {
  const { contents: spots } = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 1000,
    },
  })

  // スポット全記事からエリア情報のみを抽出した配列を作成
  const areas = chain(spots)
    .map((spot) => spot.area)
    .uniqBy('id') // 配列内で重複しているオブジェクトを指定したキーの値で比較して除去
    .sortBy('id') // 配列内のオブジェクトを指定したキーの値でソート
    .value() // lodash のチェーンメソッドでは最後に value() で値を返す必要がある

  // MicroCMS のレスポンスに近い形で返却
  const res: { contents: Area[]; totalCount: number } = {
    contents: areas,
    totalCount: areas.length,
  }

  return res
}

// 登録されているすべてのカテゴリ一覧を取得
export const getAllCategories = async () => {
  const res = await client.getList<Category>({
    endpoint: 'categories',
    queries: {
      limit: 1000,
    },
  })

  return res
}

// スポットと関連付けられているカテゴリ一覧を取得
export const getLinkedCategories = async () => {
  const { contents: spots } = await client.getList<Spot>({
    endpoint: 'blogs',
    queries: {
      limit: 1000,
    },
  })

  // スポット全記事からカテゴリ情報のみを抽出した配列を作成
  // 順番は特に重要ではないため、ソート処理はおこなわない
  const categories = chain(spots)
    .flatMap((spot) => spot.categories) // カテゴリは複数個が配列で関連付けられているため、flatMap でフラット化する
    .uniqBy('id')
    .value()

  // MicroCMS のレスポンスに近い形で返却
  const res: { contents: Category[]; totalCount: number } = {
    contents: categories,
    totalCount: categories.length,
  }

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
