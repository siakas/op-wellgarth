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
import PageMeta from '@/components/layout/PageMeta'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import Pager from '@/components/ui/Pager'
import SpotsList from '@/components/ui/SpotsList'

// Props の型に InferGetStaticPropsType を指定
// getStaticProps で return された値をもとに、Page に渡される Props の型を類推してくれる
type AreaPageProps = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticPaths: GetStaticPaths = async () => {
  const { contents: spots } = await getAllSpots()

  // // area.id ごとに全スポット一覧をグループ化
  // const groupedByArea = groupBy(spots, 'area.id')

  // // エリアでグループ化したスポット一覧ごとに params を生成し、
  // // _.flatMap() でフラット化した配列として paths に返却する
  // const paths = flatMap(groupedByArea, (areaSpots, areaId) => {
  //   // グループごとの配列を 10 件ごとに分割した時の数を取得
  //   const pages = Math.ceil(areaSpots.length / 10)

  //   // _.times() で pages の数だけ params オブジェクトを生成
  //   return times(pages, (page) => ({
  //     params: {
  //       id: (page + 1).toString(),
  //       areaId,
  //     },
  //   }))
  // })

  // 上記のコードを lodash-es のメソッドチェーンによる記述に変更
  const paths = chain(spots)
    .groupBy('area.id')
    .flatMap((areaSpots, areaId) => {
      const pages = Math.ceil(areaSpots.length / 10)
      return times(pages, (page) => ({
        params: {
          id: (page + 1).toString(),
          areaId,
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
  const areaId = context.params?.areaId

  const spotFilter = areaId !== undefined ? `area[equals]${areaId}` : undefined

  const { spots, pager, areas, categories, pickupSpots, latestSpots } =
    await getContents(page, spotFilter)

  // パンくずやページャーに渡す値として、選択されているエリアのオブジェクトを取得しておく
  const selectedArea =
    areaId !== undefined ? areas.find((area) => area.id === areaId) : undefined

  return {
    props: {
      currentPage: page,
      spots,
      pager,
      areas,
      categories,
      pickupSpots,
      latestSpots,
      selectedArea,
    },
    revalidate: 60,
  }
}

const AreaPage: NextPage<AreaPageProps> = ({
  currentPage,
  spots,
  pager,
  areas,
  categories,
  pickupSpots,
  latestSpots,
  selectedArea,
}) => {
  return (
    <>
      <BaseLayout>
        <PageMeta pageTitle={`${selectedArea.name}周辺のスポット`} />

        <Main>
          <BreadcrumbNav area={selectedArea} />
          <SpotsList spots={spots} />

          <Pager
            currentPage={currentPage}
            pager={pager}
            selectedArea={selectedArea}
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

export default AreaPage
