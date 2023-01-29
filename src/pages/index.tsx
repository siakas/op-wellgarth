import { client } from '@/lib/api'

import type { Category, Blog, Area } from '@/types/api/blog'

// microCMS へ API リクエスト
export const getStaticProps = async () => {
  try {
    const blog = await client.get({
      endpoint: 'blogs',
    })
    const categories = await client.get({
      endpoint: 'categories',
      queries: {
        fields: 'id,name,slug',
        limit: 30,
      },
    })
    const areas = await client.get({
      endpoint: 'areas',
      queries: {
        fields: 'id,name,slug',
        limit: 30,
      },
    })

    return {
      props: {
        blogs: blog.contents,
        categories: categories.contents,
        areas: areas.contents,
      },
    }
  } catch (err) {
    console.log('-- getPosts --')
    console.log(err)
  }
}

// Props の型
type Props = {
  blogs: Blog[]
  categories: Category[]
  areas: Area[]
}

const Home = ({ blogs, categories, areas }: Props) => {
  console.log(blogs)
  console.log(categories)
  console.log(areas)

  return (
    <main>
      <h1>京都グルメ</h1>
    </main>
  )
}

export default Home
