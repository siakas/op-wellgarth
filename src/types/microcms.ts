import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

// MicroCMS の提供するデータの基本型を参照
// id, createdAt, updatedAt, publishedAt, revisedAt を継承
export type ContentBase = MicroCMSListContent

// スポット情報の型定義
export type Spot = {
  title: string
  content?: string
  eyecatch?: MicroCMSImage
  categories: Category[]
  area: Area
  holiday?: string
  time?: string
  visited: boolean
  isStarred: boolean
} & ContentBase

// カテゴリの型定義
export type Category = {
  name: string
} & ContentBase

// エリアの型定義
export type Area = {
  name: string
} & ContentBase
