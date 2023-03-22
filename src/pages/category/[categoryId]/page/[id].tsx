import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { chain, times } from 'lodash-es'
import { getAllSpots, getContents } from '@/libs'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideLatestSpot from '@/components/layout/AsideLatestSpot'
import AsidePickup from '@/components/layout/AsidePickup'
import AsideSearch from '@/components/layout/AsideSearch'
import BaseLayout from '@/components/layout/BaseLayout'
import Main from '@/components/layout/Main'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import Pager from '@/components/ui/Pager'
import SpotsList from '@/components/ui/SpotsList'

// Props の型に InferGetStaticPropsType を指定
// getStaticProps で return された値をもとに、Page に渡される Props の型を類推してくれる
type CategoryPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => {
  const { contents: spots } = await getAllSpots()

  // // _.flatMap() を使って各スポットの categories の配列が持つオブジェクトを
  // // 個別の category プロパティとして設定したあらたなスポット一覧を作成（複数のカテゴリを持つスポットは同じ id で異なる category を持つスポットとして分解されている）
  // // map() や _.map() を使うとスポットごとに配列ができてしまうため、_.flatMap() を使用している
  // const categorySpotPairs = flatMap(spots, (spot) => {
  //   return spot.categories.map((category) => ({ ...spot, category }))
  // })

  // // 上記のスポットリストを category.id ごとにグループ化
  // const groupedByCategory = groupBy(categorySpotPairs, 'category.id')

  // // _.flatMap() で必要なページ数分の paths を生成
  // const paths = flatMap(groupedByCategory, (categorySpots, categoryId) => {
  //   // グループごとの配列を 10 件ごとに分割した時の数を取得
  //   const pages = Math.ceil(categorySpots.length / 10)

  //   // _.times() で pages の数だけ params オブジェクトを生成
  //   return times(pages, (page) => ({
  //     params: {
  //       id: (page + 1).toString(),
  //       categoryId,
  //     },
  //   }))
  // })

  // 上記のコードを lodash-es のメソッドチェーンによる記述に変更
  const paths = chain(spots)
    .flatMap((spot) =>
      spot.categories.map((category) => ({ ...spot, category }))
    )
    .groupBy('category.id')
    .flatMap((categorySpots, categoryId) => {
      const pages = Math.ceil(categorySpots.length / 10)
      return times(pages, (page) => ({
        params: {
          id: (page + 1).toString(),
          categoryId,
        },
      }))
    })
    .value()

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const pageId = context.params?.id
  const page: number = pageId !== undefined ? parseInt(pageId as string, 10) : 1
  const categoryId = context.params?.categoryId

  const spotFilter =
    categoryId !== undefined ? `categories[contains]${categoryId}` : undefined

  const { spots, pager, areas, categories, pickupSpots, latestSpots } =
    await getContents(page, spotFilter)

  // パンくずやページャーに渡す値として、選択されているカテゴリのオブジェクトを取得しておく
  const selectedCategory =
    categoryId !== undefined
      ? categories.find((category) => category.id === categoryId)
      : undefined

  return {
    props: {
      currentPage: page,
      spots,
      pager,
      areas,
      categories,
      pickupSpots,
      latestSpots,
      selectedCategory,
    },
    revalidate: 60,
  }
}

const CategoryPage: NextPage<CategoryPageProps> = ({
  currentPage,
  spots,
  pager,
  areas,
  categories,
  pickupSpots,
  latestSpots,
  selectedCategory,
}) => {
  return (
    <>
      <BaseLayout>
        <Main>
          <BreadcrumbNav category={selectedCategory} />
          <SpotsList spots={spots} />

          <Pager
            currentPage={currentPage}
            pager={pager}
            selectedCategory={selectedCategory}
          />
        </Main>

        <Aside>
          <AsideSearch />
          <AsideLatestSpot latestSpots={latestSpots} />
          <AsideArea areas={areas} />
          <AsideCategory categories={categories} />
          <AsidePickup pickupSpots={pickupSpots} />
        </Aside>
      </BaseLayout>
    </>
  )
}

export default CategoryPage
