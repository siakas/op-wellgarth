import Link from 'next/link'

import { map } from 'lodash-es'

import { client } from '@/libs/client'
import type { Blog } from '@/types/microcms'

type Props = {
  blogs: Blog[]
}

export const getServerSideProps = async () => {
  const data = await client.get({
    endpoint: 'blogs',
  })

  return {
    props: {
      blogs: data.contents,
    },
  }
}

const Home = ({ blogs }: Props) => {
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
    </>
  )
}

export default Home
