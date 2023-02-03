import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import parse from 'html-react-parser'
import { map } from 'lodash-es'

import { client } from '@/libs/client'
import type { Blog, BlogResponse } from '@/types/microcms'

type Props = {
  blog: Blog
}

// 静的生成のためのパスを指定
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get<BlogResponse>({
    endpoint: 'blogs',
    queries: {
      limit: 50,
    },
  })

  const paths = map(data.contents, (i) => `/spot/${i.slug}`)

  return {
    paths,
    fallback: false,
  }
}

// データをテンプレートに受け渡す部分の処理を記述
export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
  const data = await client.get<BlogResponse>({
    endpoint: 'blogs',
    queries: {
      filters: `slug[equals]${slug}`,
    },
  })

  return {
    props: {
      blog: data.contents[0],
    },
  }
}

const BlogId = ({ blog }: Props) => {
  return (
    <main>
      <h1>{blog.title}</h1>

      {blog.eyecatch && (
        <div>
          <img src={blog.eyecatch.url} alt="" width={600} />
        </div>
      )}

      {blog.content !== undefined && <div>{parse(blog.content)}</div>}

      <h2>カテゴリ</h2>
      <ul>
        {map(blog.categories, (category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>

      <h2>エリア</h2>
      <p>{blog.area.name}</p>

      <div>
        <Link href="/">一覧へ戻る</Link>
      </div>
    </main>
  )
}

export default BlogId
