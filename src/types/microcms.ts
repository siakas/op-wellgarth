import type { MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk'

// ブログの型定義
export type Blog = {
  id: string
  title: string
  content?: any
  holiday?: string
  time?: string
  visited: boolean
  eyecatch?: MicroCMSImage
  categories: Category[]
  area: Area
} & MicroCMSDate

// カテゴリの型定義
export type Category = {
  id: string
  name: string
  slug: string
} & MicroCMSDate

// エリアの型定義
export type Area = {
  id: string
  name: string
  slug: string
} & MicroCMSDate

// レスポンスデータの型定義（ブログ）
export type BlogResponse = {
  totalCount: number
  offset: number
  limit: number
  contents: Blog[]
}

// レスポンスデータの型定義（カテゴリ）
export type CategoryResponse = {
  totalCount: number
  offset: number
  limit: number
  contents: Category[]
}

// レスポンスデータの型定義（エリア）
export type AreaResponse = {
  totalCount: number
  offset: number
  limit: number
  contents: Area[]
}
