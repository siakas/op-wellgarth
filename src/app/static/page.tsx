import Link from 'next/link'

import { getBlogList } from '@/libs/microcms'

const StaticPage = async () => {
  const { contents } = await getBlogList()

  // ページの生成された時間を取得
  const time = new Date().toLocaleString()

  if (contents === null || contents.length === 0) {
    return <h1>No contents</h1>
  }

  return (
    <div>
      <h1>{time}</h1>
      <ul>
        {contents.map((post) => (
          <li key={post.id}>
            <Link href={`/static/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StaticPage
