import type {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'

// MicroCMS の提供するデータの基本型を参照
// id, createdAt, updatedAt, publishedAt, revisedAt を継承
export type ContentBase = MicroCMSListContent

// スポット情報の型定義
export type Spot = {
  title: string
  titleEn?: string
  isStarred: boolean
  content?: string
  eyecatch?: MicroCMSImage
  categories: Category[]
  area: Area
  holiday?: string
  time?: string
  tel?: string
  latLng?: string
  visited: boolean
} & ContentBase

// カテゴリの型定義
export type Category = {
  name: string
} & ContentBase

// エリアの型定義
export type Area = {
  name: string
} & ContentBase

// MicroCMS による API 取得クエリの型定義
export type Queries = MicroCMSQueries
