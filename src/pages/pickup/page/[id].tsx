import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { getContents, getSpotsByFilter } from '@/libs'
import Aside from '@/components/layout/Aside'
import AsideArea from '@/components/layout/AsideArea'
import AsideCategory from '@/components/layout/AsideCategory'
import AsideLatestSpot from '@/components/layout/AsideLatestSpot'
import AsidePickup from '@/components/layout/AsidePickup'
import AsideSearch from '@/components/layout/AsideSearch'
import Main from '@/components/layout/Main'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import Pager from '@/components/ui/Pager'
import SpotsList from '@/components/ui/SpotsList'
import { siteConfig } from '@@/site.config'

// Props の型に InferGetStaticPropsType を指定
// getStaticProps で return された値をもとに、Page に渡される Props の型を類推してくれる
type PickupPageProps = InferGetStaticPropsType<typeof getStaticProps>

// スター付きスポットを取得するためのフィルタを定義
const spotFilter = 'isStarred[equals]true'

export const getStaticPaths: GetStaticPaths = async () => {
  const limit: number =
    typeof siteConfig.defaultLimit === 'string'
      ? parseInt(siteConfig.defaultLimit, 10)
      : siteConfig.defaultLimit

  const { pager } = await getSpotsByFilter(limit, 1, spotFilter)
  const paths = pager.map((page) => ({
    params: {
      id: (page + 1).toString(),
    },
  }))

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

  const { spots, pager, areas, categories, pickupSpots, latestSpots } =
    await getContents(page, spotFilter)

  return {
    props: {
      currentPage: page,
      spots,
      pager,
      areas,
      categories,
      pickupSpots,
      latestSpots,
    },
    revalidate: 60,
  }
}

const PickupPage: NextPage<PickupPageProps> = ({
  currentPage,
  spots,
  pager,
  areas,
  categories,
  pickupSpots,
  latestSpots,
}) => {
  return (
    <>
      <Main>
        <BreadcrumbNav />
        <SpotsList spots={spots} />

        <Pager currentPage={currentPage} pager={pager} />
      </Main>

      <Aside>
        <AsideSearch />
        <AsideLatestSpot latestSpots={latestSpots} />
        <AsideArea areas={areas} />
        <AsideCategory categories={categories} />
        <AsidePickup pickupSpots={pickupSpots} />
      </Aside>
    </>
  )
}

export default PickupPage
