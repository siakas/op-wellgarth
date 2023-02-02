import Link from 'next/link'

import parse from 'html-react-parser'

import { client } from '@/libs/client'
import type { Blog } from '@/types/microcms'

type Props = {
  blog: Blog
}

export const getServerSideProps = async (ctx: any) => {
  const id = ctx.params?.id
  const idExceptArray = id instanceof Array ? id[0] : id
  const data = await client.get({
    endpoint: 'blogs',
    contentId: idExceptArray,
  })

  return {
    props: {
      blog: data,
    },
  }
}

const Spot = ({ blog }: Props) => {
  return (
    <>
      <div>
        <h1>{blog.title}</h1>

        {blog.eyecatch && (
          <div>
            <img src={blog.eyecatch.url} alt="" width={800} />
          </div>
        )}

        {blog.content !== undefined && <div>{parse(blog.content)}</div>}
      </div>
      <div>
        <Link href="/">一覧へ戻る</Link>
      </div>
    </>
  )
}

export default Spot
