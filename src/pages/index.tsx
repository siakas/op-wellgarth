import Link from 'next/link'

import { map } from 'lodash-es'

import { client } from '@/libs/client'
import type { Area, Blog, Category } from '@/types/microcms'

type Props = {
  blogs: Blog[]
  categories: Category[]
  areas: Area[]
}

export const getStaticProps = async () => {
  const blog = await client.get({
    endpoint: 'blogs',
    // 一時的に全件取得するが、最終的にはスクロールローディングで順次取得するようにしたい
    queries: {
      limit: 50,
    },
  })
  const category = await client.get({
    endpoint: 'categories',
    queries: {
      limit: 50, // カテゴリは常に全件取得
    },
  })
  const area = await client.get({
    endpoint: 'areas',
    queries: {
      limit: 50, // エリアは常に全件取得
    },
  })

  return {
    props: {
      blogs: blog.contents,
      categories: category.contents,
      areas: area.contents,
    },
  }
}

const Home = ({ blogs, categories, areas }: Props) => {
  return (
    <>
      <h1>記事一覧</h1>
      <ul>
        {map(blogs, (post) => (
          <li key={post.id}>
            <Link href={`/spot/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <h1>カテゴリ一覧</h1>
      <ul>
        {map(categories, (category) => (
          <li key={category.id}>
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <h1>エリア一覧</h1>
      <ul>
        {map(areas, (area) => (
          <li key={area.id}>
            <Link href={`/area/${area.slug}`}>{area.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
