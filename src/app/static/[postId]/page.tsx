import { notFound } from 'next/navigation'

import parse from 'html-react-parser'

import { getBlogDetail, getBlogList } from '@/libs/microcms'

export const generateStaticParams = async () => {
  const { contents } = await getBlogList()

  const paths = contents.map((post) => {
    return {
      postId: post.id,
    }
  })

  return [...paths]
}

const StaticDetailPage = async ({
  params: { postId },
}: {
  params: { postId: string }
}) => {
  const post = await getBlogDetail(postId)

  // ページの生成された時間を取得
  const time = new Date().toLocaleString()

  if (post === null) {
    notFound()
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <h2>{time}</h2>
      {/* <div>{post.content}</div> */}
      {post.content !== undefined && (
        <div>{post.content !== undefined && parse(post.content)}</div>
      )}
    </div>
  )
}

export default StaticDetailPage
