import { client } from '@/lib/client'
import { Area, Category, Queries, Spot } from '@/types/microcms'
import { siteConfig } from '@@/site.config'
import { sortBy, uniqBy } from 'lodash-es'
import { MicroCMSListResponse } from 'microcms-js-sdk'

// スポット一覧取得時の基本件数を設定
// siteConfig.defaultLimit の型が `string | number` となってしまうため、
// 条件分岐による型チェックをおこなっている
const limit: number =
  typeof siteConfig.defaultLimit === 'string'
    ? parseInt(siteConfig.defaultLimit, 10)
    : siteConfig.defaultLimit

// 全スポット一覧を取得
export const getAllSpots = async () => {
  try {
    const res = await client.getList<Spot>({
      customRequestInit: {
        cache: 'no-store',
      },
      endpoint: 'spots',
      queries: {
        limit: 1000,
      },
    })
    return res
  } catch (error) {
    throw error
  }
}

// ID からスポット詳細を取得
export const getSpotById = async (spotId: string) => {
  try {
    const res = await client.getListDetail<Spot>({
      contentId: spotId,
      customRequestInit: {
        cache: 'no-store',
      },
      endpoint: 'spots',
      queries: {
        depth: 2,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}

// 検索クエリで絞り込んだスポット一覧を取得
export const getSpotsByQuery = async (query: string) => {
  try {
    const res = await client.getList<Spot>({
      endpoint: 'spots',
      queries: {
        limit: 100,
        q: query,
      },
    })

    return res
  } catch (error) {
    throw error
  }
}

// 特定の条件でフィルタリングしたスポット一覧を取得
export const getSpotsByFilter = async (
  limit: number,
  currentPage: number,
  spotFilter?: string,
): Promise<{
  pager: number[]
  spots: MicroCMSListResponse<Spot>
}> => {
  // クエリを定義
  const queries: Queries = {
    filters: spotFilter,
    limit,
    offset: (currentPage - 1) * limit,
  }

  // クエリに基づいたスポット一覧を取得
  const res = await client.getList<Spot>({
    customRequestInit: {
      cache: 'no-store',
    },
    endpoint: 'spots',
    queries,
  })

  // 該当するスポット全件から 10 件ごとに分割したページ番号を配列で取得
  const pager = [...Array(Math.ceil(res.totalCount / 10)).keys()]

  return { pager, spots: res }
}

// スポットと関連づけられているエリア一覧を取得
export const getActiveAreas = async () => {
  try {
    // 全スポット記事を `allSpots` という名前で取得
    const { contents: allSpots } = await client.getList<Spot>({
      customRequestInit: {
        cache: 'no-store',
      },
      endpoint: 'spots',
      queries: {
        limit: 1000,
      },
    })

    // 取得した全スポット記事からエリア情報のみを抽出した配列を作成する
    // スポット全記事からエリア情報のみを抽出
    const allAreas = allSpots.map((spot) => spot.area)
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
  } catch (error) {
    throw error
  }
}

// スポットと関連づけられているカテゴリ一覧を取得
export const getActiveCategories = async () => {
  try {
    // 全スポット記事を `allSpots` という名前で取得
    const { contents: allSpots } = await client.getList<Spot>({
      customRequestInit: {
        cache: 'no-store',
      },
      endpoint: 'spots',
      queries: {
        limit: 1000,
      },
    })

    // 取得した全スポット記事からカテゴリ情報のみを抽出した配列を作成する
    // スポット全記事からカテゴリ情報のみを抽出。カテゴリは配列データのため、flatMap でフラット化する
    const allCategories = allSpots.flatMap((spot) => spot.categories)
    // 重複するカテゴリを除去
    const categories = uniqBy(allCategories, 'id')

    // MicroCMS のレスポンスに近い形で返却
    const res: { contents: Category[]; totalCount: number } = {
      contents: categories,
      totalCount: categories.length,
    }

    return res
  } catch (error) {
    throw error
  }
}

// 最近更新されたスポット一覧の取得
export const getUpdatedSpots = async () => {
  try {
    const res = await client.getList<Spot>({
      customRequestInit: {
        cache: 'no-store',
      },
      endpoint: 'spots',
      queries: { limit: 6, orders: '-updatedAt' },
    })

    return res
  } catch (error) {
    throw error
  }
}
