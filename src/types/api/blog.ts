export type Blog = {
  id: string
  title: string
  content: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
  categories: Category[]
  area: Area[]
  holiday: string
  time: string
  visited: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

export type Category = {
  id: string
  name: string
  slug: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  revisedAt?: string
}

export type Area = {
  id: string
  name: string
  slug: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  revisedAt?: string
}
