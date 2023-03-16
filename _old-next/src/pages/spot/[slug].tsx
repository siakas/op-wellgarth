import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import Link from 'next/link'

import parse from 'html-react-parser'
import { map } from 'lodash-es'

import { client } from '@/libs/client'
import type { BlogResponse } from '@/types/microcms'

// Props の型に InferGetStaticPropsType を指定
// getStaticProps で return された値をもとに、Page に渡される Props の型を類推してくれる
type Props = InferGetStaticPropsType<typeof getStaticProps>

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
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params?.slug

  // slug で記事を取得する場合は filter を利用する
  // また、id で記事指定するのとは違い、配列で返ってくる点に注意
  const data = await client.get<BlogResponse>({
    endpoint: 'blogs',
    queries: {
      filters: `slug[equals]${slug}`,
    },
  })

  return {
    props: {
      blog: data.contents[0], // データが配列で返ってくるので 1 件目のみを props として渡す
    },
  }
}

// ページコンポーネント
const BlogId: NextPage<Props> = ({ blog }) => {
  return (
    <main>
      <h1>{blog.title}</h1>

      {blog.eyecatch !== undefined && (
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
