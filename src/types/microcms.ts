// MicroCMS の提供するデータの基本型を参照
import {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSQueries,
} from 'microcms-js-sdk'

// id, createdAt, updatedAt, publishedAt, revisedAt を継承
export type ContentBase = MicroCMSListContent

// スポット情報の型定義
export type Spot = {
  area: Area
  categories: Category[]
  content?: string
  description?: string
  eyecatch?: MicroCMSImage
  holiday?: string
  isStarred: boolean
  latLng?: string
  tel?: string
  time?: string
  title: string
  titleEn?: string
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
